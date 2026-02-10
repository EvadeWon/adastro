"use client";
import axios from "axios";

const CheckoutPage = () => {
    const handlePayment = async () => {
        // 1. Create order
        const { data: order } = await axios.post("/api/payment/create-order", {
            amount: 499,
        });

        // 2. Open Razorpay
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // IMPORTANT
            amount: order.amount,
            currency: order.currency,
            name: "Your Company",
            description: "Course Purchase",
            order_id: order.id,
            handler: async function (response: any) {
                await axios.post("/api/payment/verify", {
                    ...response,
                    courseId: "123",
                });
            },
            theme: {
                color: "#000000",
            },
        };

        const rzp = new (window as any).Razorpay(options);
        console.log(options);
        rzp.open();
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <button
                onClick={handlePayment}
                className="bg-black text-white px-6 py-3 rounded"
            >
                Pay Now
            </button>
        </div>
    );
};

export default CheckoutPage;
