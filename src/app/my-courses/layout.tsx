import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

const layout = ({children}:{children:React.ReactNode}) => {
    return (
        <div className="relative min-h-screen text-[#e8e6e6]" style={{ backgroundImage: "url('/background.png')", }}>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default layout