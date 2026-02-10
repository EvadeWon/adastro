"use client";

const CheckoutPage = () => {
    const handlePayment = async () => {
        // 1. Create order
        // const { data: order } = await axios.post("/api/payment/create-order", {
        //     amount: 499,
        // });

        // 2. Open Razorpay
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // IMPORTANT
            "amount": "50000", // Amount is in currency subunits. 
            "currency": "INR",
            "name": "Acme Corp", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": "order_9A33XWu170gUtm", // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
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
