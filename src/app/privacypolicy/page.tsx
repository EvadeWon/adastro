"use client";

const PrivacyPolicyPage = () => {
    return (
        <section
            className="relative min-h-screen text-[#e8e6e6]"
            style={{ backgroundImage: "url('/background.png')" }}
        >
            <div className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
                {/* Header */}
                <div
                    className="mb-10 text-center shadow-sm p-15 rounded-lg"
                    style={{ boxShadow: "0 0 20px #d75525c9" }}
                >
                    <h1 className="text-3xl font-bold tracking-tight md:text-5xl opacity-70 uppercase">
                        Privacy Policy
                    </h1>
                    <p className="mt-2 text-sm opacity-70">
                        Adastro • Last Updated: January 2026
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-8 text-sm leading-relaxed md:text-base">
                    <p className="text-sm opacity-70">
                        This Privacy Policy explains how <strong>AdAstro</strong>
                        (“Company”, “we”, “our”, “us”) collects, uses, shares, and protects
                        your personal information when you access our website, services, or
                        digital platforms.
                    </p>

                    <p className="text-sm opacity-70">
                        By using our website or services, you consent to the practices
                        described in this policy.
                    </p>

                    <div>
                        <h2 className="section-title">1. Information We Collect</h2>

                        <h3 className="font-medium opacity-80 mt-3">1.1 Personal Information</h3>
                        <ul className="list-disc space-y-2 pl-5 opacity-70 text-sm">
                            <li>Name</li>
                            <li>Email address</li>
                            <li>Phone number</li>
                            <li>Business details</li>
                            <li>Billing and invoice information</li>
                            <li>Social media handles or login IDs (if required)</li>
                        </ul>

                        <h3 className="font-medium opacity-80 mt-4">1.2 Technical Information</h3>
                        <ul className="list-disc space-y-2 pl-5 opacity-70 text-sm">
                            <li>IP address</li>
                            <li>Browser type and version</li>
                            <li>Device type & operating system</li>
                            <li>Pages viewed and time spent</li>
                            <li>Cookies and tracking data</li>
                        </ul>

                        <h3 className="font-medium opacity-80 mt-4">1.3 Service-Related Information</h3>
                        <ul className="list-disc space-y-2 pl-5 opacity-70 text-sm">
                            <li>Brand assets (logos, images, guidelines)</li>
                            <li>Ads manager access (Meta / Google)</li>
                            <li>Hosting, website, or server credentials</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="section-title">2. How We Use Your Information</h2>
                        <ul className="list-disc space-y-2 pl-5 opacity-70 text-sm">
                            <li>Provide and improve our services</li>
                            <li>Communicate regarding updates, support, or discussions</li>
                            <li>Process payments and invoices</li>
                            <li>Develop marketing and advertising strategies</li>
                            <li>Analyze website traffic and performance</li>
                            <li>Comply with legal requirements</li>
                        </ul>
                        <p className="text-sm opacity-70 mt-2">
                            We do <strong>not sell</strong> your personal information.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">3. How We Share Your Information</h2>

                        <p className="text-sm opacity-70">
                            <strong>3.1 Internal Teams:</strong> For design, marketing,
                            development, and project execution.
                        </p>

                        <p className="text-sm opacity-70 mt-2">
                            <strong>3.2 Trusted Third Parties:</strong>
                        </p>
                        <ul className="list-disc space-y-2 pl-5 opacity-70 text-sm">
                            <li>Hosting providers</li>
                            <li>Payment gateways</li>
                            <li>Google & Meta advertising platforms</li>
                            <li>Analytics tools</li>
                            <li>CRM systems</li>
                        </ul>

                        <p className="text-sm opacity-70 mt-2">
                            These partners operate under strict confidentiality and
                            data-security agreements.
                        </p>

                        <p className="text-sm opacity-70 mt-2">
                            <strong>3.3 Legal Compliance:</strong> We may disclose data if
                            required by law, government authorities, or court orders.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">4. Data Security</h2>
                        <p className="text-sm opacity-70">
                            We implement strong security practices including encryption,
                            secured access, limited permissions, and monitoring.
                        </p>
                        <p className="text-sm opacity-70 mt-2">
                            However, no digital transmission is completely secure. We are not
                            responsible for breaches caused by third-party platforms or
                            cyberattacks.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">5. Cookies & Tracking Technologies</h2>
                        <p className="text-sm opacity-70">
                            We use cookies to improve user experience, personalize content,
                            and analyze performance. Disabling cookies may affect some
                            features.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">6. Retention of Information</h2>
                        <p className="text-sm opacity-70">
                            We retain information as required for project execution, account
                            activity, and legal or taxation obligations. Data deletion may be
                            requested unless restricted by law.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">7. Your Rights</h2>
                        <ul className="list-disc space-y-2 pl-5 opacity-70 text-sm">
                            <li>Access your personal data</li>
                            <li>Request corrections or updates</li>
                            <li>Request deletion</li>
                            <li>Understand data usage</li>
                            <li>Withdraw consent</li>
                        </ul>
                        <p className="text-sm opacity-70 mt-2">
                            Email: <strong>info@cloudydata.in</strong>
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">8. Third-Party Links</h2>
                        <p className="text-sm opacity-70">
                            We are not responsible for privacy practices or content of
                            third-party websites linked on our platform.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">9. Children’s Privacy</h2>
                        <p className="text-sm opacity-70">
                            Our services are not intended for individuals under 16 years of
                            age.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">10. Credentials & Sensitive Data</h2>
                        <p className="text-sm opacity-70">
                            Client credentials are stored securely, accessed only by
                            authorized personnel, and used strictly for service execution.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">11. International Data Transfers</h2>
                        <p className="text-sm opacity-70">
                            Data may be stored on Indian servers. By using our services, you
                            consent to this transfer.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">12. Changes to This Policy</h2>
                        <p className="text-sm opacity-70">
                            This policy may be updated periodically. Continued usage implies
                            acceptance of updated terms.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">13. Contact Information</h2>
                        <p className="text-sm opacity-70">
                            📩 info@cloudydata.in <br />
                            📞 9217711173 <br />
                            📍 Sector-14, Gurgaon,India
                        </p>
                    </div>
                </div>
            </div>

            {/* Global helper */}
            <style jsx global>{`
                .section-title {
                    font-size: 1.125rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                }
            `}</style>
        </section>
    );
};

export default PrivacyPolicyPage;
