import Navbar from "@/components/Navbar"

const layout = ({ children }) => {
    return (
        <div className="relative min-h-screen text-[#e8e6e6]" style={{ backgroundImage: "url('/background.png')", }}>
            <Navbar />
            {children}
        </div>
    )
}

export default layout