"use client";

const RefundPolicyPage = () => {
    return (
        <section
            className="relative min-h-screen text-[#e8e6e6]"
            style={{ backgroundImage: "url('/background.png')" }}
        >
            <div className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
                <div
                    className="mb-10 text-center shadow-sm p-15 rounded-lg"
                    style={{ boxShadow: "0 0 20px #d75525c9" }}
                >
                    <h1 className="text-3xl font-bold tracking-tight md:text-5xl opacity-70 uppercase">
                        Refund Policy
                    </h1>
                    <p className="mt-2 text-sm opacity-70">
                        AdAstro • Last Updated: January 2026
                    </p>
                </div>

                <div className="space-y-8 text-sm leading-relaxed md:text-base">
                    <div>
                        <h2 className="section-title">1. Digital Product Nature</h2>
                        <p className="text-sm opacity-70">
                            All products and services offered on AdAstro are delivered
                            in digital format. Once a purchase is completed, users
                            receive immediate access to the course materials, videos,
                            or resources. Due to the non-tangible and non-returnable
                            nature of digital products, they cannot be returned once
                            accessed.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">2. No Refund Policy</h2>
                        <p className="text-sm opacity-70">
                            We maintain a strict no-refund policy. Once a purchase is
                            successfully completed and access to the product or
                            service is granted, the order is considered final and
                            non-refundable. We do not offer partial refunds, exchanges,
                            or cancellations after the transaction has been processed.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">3. User Acknowledgment</h2>
                        <p className="text-sm opacity-70">
                            By making a purchase on our platform, you confirm that you
                            have reviewed the product details, pricing, and features.
                            You also agree to this refund policy and understand that
                            refunds will not be issued once access to the digital
                            content has been provided.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">4. Technical Issues</h2>
                        <p className="text-sm opacity-70">
                            In rare cases, if a payment is deducted but access is not
                            granted due to a technical error, users may contact our
                            support team. After verification, we will either restore
                            access to the purchased product or resolve the issue
                            accordingly.
                        </p>
                    </div>

                    <div>
                        <h2 className="section-title">5. Support Contact</h2>
                        <p className="text-sm opacity-70">
                            For any payment-related concerns, please contact our
                            support team with your order details. We aim to respond
                            within 48 business hours.
                        </p>
                    </div>
                </div>
            </div>

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

export default RefundPolicyPage;
