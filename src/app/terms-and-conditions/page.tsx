"use client"
const TermsAndConditionsPage = () => {
    return (
        <section className="relative min-h-screen text-[#e8e6e6]" style={{ backgroundImage: "url('/background.png')", }} >
            <div className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
                <div className="mb-10 text-center shadow-sm p-15 rounded-lg" style={{boxShadow: "0 0 20px #d75525c9",}}>
                    <h1 className="text-3xl font-bold tracking-tight md:text-5xl opacity-70 uppercase">
                        Terms & Conditions
                    </h1>
                    <p className="mt-2 text-sm opacity-70">
                        AdAstro • Last Updated: January 2026
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-8 text-sm leading-relaxed md:text-base">
                    <p className="text-sm opacity-70">
                        Welcome to <strong>AdAtro</strong> (“Company”,
                        “we”, “our”, “us”). By accessing or using our website, services, or
                        digital platforms, you agree to be bound by the following Terms &
                        Conditions. If you do not agree, please stop using our services
                        immediately.
                    </p>

                    <div>
                        <h2 className="section-title">1. Acceptance of Terms</h2>
                        <p className="text-sm opacity-70">
                            By accessing or using any part of the AdAstro  website or services,
                            you acknowledge that you have read, understood, and agreed to
                            comply with these Terms & Conditions.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">2. Payment Terms</h2>
                        <ul className="list-disc space-y-2 pl-5 opacity-70 text-sm">
                            <li>All payments must be made in advance unless otherwise stated.</li>
                            <li>Prices exclude taxes unless explicitly mentioned.</li>
                            <li>Delayed payments may lead to paused or terminated services.</li>
                            <li>Monthly invoices must be cleared before the due date.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="section-title">3. Service Delivery & Timelines</h2>
                        <ul className="list-disc space-y-2 pl-5 opacity-70 text-sm">
                            <li>Timelines depend on project scope and client responsiveness.</li>
                            <li>Delays in feedback extend delivery timelines.</li>
                            <li>
                                We are not responsible for delays caused by third-party tools or
                                platforms.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="section-title">4. Revisions & Modifications</h2>
                        <ul className="list-disc space-y-2 pl-5 opacity-70 text-sm">
                            <li>Each package includes a limited number of revisions.</li>
                            <li>Extra revisions are chargeable.</li>
                            <li>Major changes after approval are billed separately.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="section-title">5. Intellectual Property Rights</h2>
                        <ul className="list-disc space-y-2 pl-5 opacity-70 text-sm">
                            <li>All assets remain company property until full payment.</li>
                            <li>Ownership transfers after complete payment.</li>
                            <li>Source files require separate purchase unless included.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="section-title">6. Client Responsibilities</h2>
                        <p className="text-sm opacity-70">
                            Clients must provide accurate credentials, content, and branding
                            assets. Adastro is not responsible for issues caused by incorrect
                            or incomplete information.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">7. No Guarantees on Performance</h2>
                        <p className="text-sm opacity-70">
                            We do not guarantee sales, leads, ROAS, or follower growth.
                            Performance depends on market conditions, competition, budget, and
                            product quality.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">8. Termination of Services</h2>
                        <p className="text-sm opacity-70">
                            Services may be terminated if payments are overdue, terms are
                            violated, or unethical behavior occurs. All payments are
                            non-refundable.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">9. Refund Policy</h2>
                        <p className="text-sm opacity-70">
                            We follow a strict no-refund policy. Once work has started, no
                            refunds will be issued under any circumstances.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">10. Confidentiality</h2>
                        <p className="text-sm opacity-70">
                            Both parties agree to maintain confidentiality of credentials,
                            business data, and sensitive information.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">11. Use of Work in Portfolio</h2>
                        <p className="text-sm opacity-70">
                            Adastro may showcase completed work in portfolios and case
                            studies. Clients may opt-out before project commencement.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">12. Third-Party Tools & Platforms</h2>
                        <p className="text-sm opacity-70">
                            We are not responsible for failures or issues caused by third-party
                            platforms such as hosting providers or ad networks.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">13. Dispute Resolution</h2>
                        <p className="text-sm opacity-70">
                            Disputes will be resolved via arbitration under Indian law.
                            Jurisdiction: <strong>Gurugram, Haryana</strong>.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">14. Updates to Terms</h2>
                        <p className="text-sm opacity-70">
                            Adastro reserves the right to update these Terms at any time.
                            Continued usage implies acceptance of revised terms.
                        </p>
                    </div>
                </div>
            </div>

            {/* Tailwind helper */}
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

export default TermsAndConditionsPage;
