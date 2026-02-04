export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0B0C10] pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <h1 className="font-display font-bold text-4xl text-[#F7F8FB] mb-8">Terms & Conditions</h1>
        <div className="prose prose-invert max-w-none text-[#A6A9B1] space-y-6">
          <p>Last updated: February 2026.</p>
          <p>Welcome to Adima Technologies Pvt Ltd. By using our websites and services, you agree to these terms. Please read them carefully.</p>
          <h2 className="text-[#F7F8FB] text-xl font-semibold mt-8">1. Use of Services</h2>
          <p>You agree to use our products and websites only for lawful purposes and in accordance with these terms.</p>
          <h2 className="text-[#F7F8FB] text-xl font-semibold mt-8">2. Intellectual Property</h2>
          <p>All content, trademarks, and materials on our platforms are owned by Adima Technologies Pvt Ltd or our licensors.</p>
          <h2 className="text-[#F7F8FB] text-xl font-semibold mt-8">3. Limitation of Liability</h2>
          <p>We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>
          <h2 className="text-[#F7F8FB] text-xl font-semibold mt-8">4. Contact</h2>
          <p>For questions about these terms, contact us at <a href="mailto:info@adimatechnologies.com" className="text-[#2D6BFF] hover:underline">info@adimatechnologies.com</a>.</p>
        </div>
      </div>
    </main>
  );
}
