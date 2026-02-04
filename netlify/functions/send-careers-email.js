const Busboy = require('busboy');
const nodemailer = require('nodemailer');

const MAIL_TO = process.env.MAIL_TO || 'hr@adimatechnologies.com';

function parseMultipartForm(event) {
  return new Promise((resolve, reject) => {
    const fields = {};
    const body = event.isBase64Encoded
      ? Buffer.from(event.body, 'base64')
      : Buffer.from(event.body || '', 'utf8');

    const busboy = Busboy({
      headers: {
        'content-type': event.headers['content-type'] || event.headers['Content-Type'] || '',
      },
    });

    const filePromises = [];

    busboy.on('file', (fieldname, fileStream, info) => {
      const { filename, mimeType } = info;
      const chunks = [];
      const fileDone = new Promise((res, rej) => {
        fileStream.on('data', (chunk) => chunks.push(chunk));
        fileStream.on('end', () => {
          fields[fieldname] = {
            filename: filename || 'resume',
            contentType: mimeType || 'application/octet-stream',
            content: Buffer.concat(chunks),
          };
          res();
        });
        fileStream.on('error', rej);
      });
      filePromises.push(fileDone);
    });

    busboy.on('field', (fieldName, value) => {
      fields[fieldName] = value;
    });

    busboy.on('finish', () => {
      Promise.all(filePromises)
        .then(() => resolve(fields))
        .catch(reject);
    });
    busboy.on('error', reject);
    busboy.write(body);
    busboy.end();
  });
}

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const requiredEnv = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
  const missing = requiredEnv.filter((key) => !process.env[key]);
  if (missing.length) {
    console.error('Missing env:', missing.join(', '));
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Server misconfiguration: SMTP not set. Add SMTP_HOST, SMTP_USER, SMTP_PASS in Netlify env.',
      }),
    };
  }

  let fields;
  try {
    fields = await parseMultipartForm(event);
  } catch (err) {
    console.error('Parse error:', err);
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid form data' }),
    };
  }

  const firstName = fields.firstName || '';
  const lastName = fields.lastName || '';
  const email = fields.email || '';
  const phone = fields.phone || '';
  const linkedin = fields.linkedin || '';
  const role = fields.role || '';
  const resume = fields.resume;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const subject = `Career Application - ${role || 'General'} - ${firstName} ${lastName}`;
  const text = [
    `First Name: ${firstName}`,
    `Last Name: ${lastName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `LinkedIn: ${linkedin || 'Not provided'}`,
    `Applied Role: ${role}`,
  ].join('\n');

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: MAIL_TO,
    subject,
    text,
    attachments: resume
      ? [
          {
            filename: resume.filename || 'resume.pdf',
            content: resume.content,
            contentType: resume.contentType,
          },
        ]
      : [],
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true, message: 'Application sent successfully.' }),
    };
  } catch (err) {
    console.error('Send mail error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: err.message || 'Failed to send application. Please try again or email hr@adimatechnologies.com.',
      }),
    };
  }
};
