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
                        Adastro • Last Updated: January 2026
                    </p>
                </div>
                <div className="space-y-8 text-sm leading-relaxed md:text-base">
                    <div>
                        <h2 className="section-title">No Refund Policy</h2>
                        <p className="text-sm opacity-70">
                            We follow a <strong>strict no-refund policy</strong>.
                            Once a product or service is <strong>purchased</strong>,
                            the order is considered <strong>final</strong> and
                            <strong> non-refundable</strong> under all circumstances.
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
