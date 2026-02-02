import Footer from "@/components/Footer";

const Refundlayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative min-h-screen text-[#e8e6e6]" style={{ backgroundImage: "url('/background.png')", }}>
            {children}
            <Footer />
        </div>
    )
}

export default Refundlayout;