import { cinzel } from "@/app/fonts"
import { Facebook, Instagram, Linkedin, LucideIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

function Footer() {
    type socialMediaType = {
        id: number,
        icon: LucideIcon,
        url: string
    }
    const socialMedia: socialMediaType[] = [
        { id: 1, icon: Instagram, url: "" },
        { id: 2, icon: Facebook, url: "" },
        { id: 3, icon: Linkedin, url: "" },
    ]
    return (
        <div className="p-8">
            <div className="w-full max-w-6xl relative min-h-[90vh] text-[#e8e6e6] flex items-start pt-20 justify-between px-30 shadow-md rounded-lg" style={{ backgroundImage: "url('/background.png')", boxShadow: "0 0 20px #d75525c9" }}>
                <div className="flex gap-20">
                    <div className="flex flex-col gap-6">
                        <Link href={"/"} className="flex items-center gap-1">
                            <Image src="/logo.jpeg" alt="Logo" width={35} height={35} className="rounded-lg" />
                            <span className={`font-bold text-2xl ${cinzel.className}`}>AdAstro</span>
                        </Link>
                        <div className="flex flex-col gap-4">
                            <h1 className="text-xl font-semibold text-white/90">Reach the Right Audience</h1>
                            <p className="opacity-60 text-sm">Driving Digital Growth with Aastro</p>
                        </div>

                    </div>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-lg font-bold">Quick Links</h1>
                        <div className="flex flex-col gap-2">
                            <Link href={"/"} className="text-white/70 text-xs hover:text-[#d75525c9] transition-all duration-200 ease-in-out">Home</Link>
                            <Link href={"/"} className="text-white/70 text-xs hover:text-[#d75525c9] transition-all duration-200 ease-in-out">About Us</Link>
                            <Link href={"/contact"} className="text-white/70 text-xs hover:text-[#d75525c9] transition-all duration-200 ease-in-out">Contact Us</Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-lg font-bold">Contact Info</h1>
                    <div className="flex flex-col gap-2">
                        <span className="text-white/70 text-xs font-semibold">info@cloudydata.in</span>
                        <span className="text-white/70 text-xs font-semibold">+919217711173</span>
                        <span className="text-white/70 text-xs font-semibold">Sector-14, Gurgaon,India</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-lg font-bold">Social Media</h1>
                        <span className="flex gap-4">
                            {socialMedia.map((s) => {
                                const Icon = s.icon
                                return (
                                    <Link className="bg-transparent p-2 rounded-xl transition-all duration-200 ease-in-out hover:shadow-[0_0_20px_#d75525c9] hover:scale-110" style={{ boxShadow: "0 0 10px #d75525c9" }} key={s.id} href={s.url}>
                                        <Icon size={30} color="#d75525c9" className="text-[#d75525c9] transition-transform duration-300"/>
                                    </Link>
                                )
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Footer