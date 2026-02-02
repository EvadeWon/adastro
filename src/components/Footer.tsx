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
        { id: 1, icon: Instagram, url: "https://www.instagram.com/adastro.in/" },
        { id: 2, icon: Facebook, url: "https://www.facebook.com/people/AdAstro-Social-Media-Agency/61587013396248/" },
        { id: 3, icon: Linkedin, url: "https://www.linkedin.com/company/adastro-pm/" },
    ]
    return (
        <div className="p-4 md:p-8">
            <div className="w-full max-w-6xl mx-auto relative min-h-auto md:min-h-[90vh] text-[#e8e6e6] flex flex-col md:flex-row gap-12 md:justify-between pt-12 md:pt-20 px-6 md:px-20 shadow-md rounded-lg"
                style={{
                    backgroundImage: "url('/background.png')",
                    boxShadow: "0 0 10px #d75525c9",
                }}>
                <div className="flex flex-col md:flex-row gap-12 md:gap-20">
                    <div className="flex flex-col gap-6">
                        <Link href={"/"} className="flex items-center gap-1">
                            <Image src="/logo.jpeg" alt="Logo" width={35} height={35} className="rounded-lg" />
                            <span className={`font-bold text-2xl ${cinzel.className}`}>Adastro</span>
                        </Link>
                        <div className="flex flex-col gap-4">
                            <h1 className="text-xl font-semibold text-white/90">Reach the Right Audience</h1>
                            <p className="opacity-60 text-xs">Driving Digital Growth with Aastro</p>
                        </div>

                    </div>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-lg font-bold">Quick Links</h1>
                        <div className="flex flex-col gap-3">
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
                    <div className="flex gap-4 flex-col md:justify-start justify-start">
                        <h1 className="text-lg font-bold">Social Media</h1>
                        <span className="flex gap-4">
                            {socialMedia.map((s) => {
                                const Icon = s.icon
                                return (
                                    <Link target="_blank"
                                        rel="noopener noreferrer" className="bg-transparent p-2 rounded-xl transition-all duration-200 ease-in-out hover:shadow-[0_0_20px_#d75525c9] hover:scale-110" style={{ boxShadow: "0 0 10px #d75525c9" }} key={s.id} href={s.url}>
                                        <Icon size={24} color="#d75525c9" className="text-[#d75525c9] transition-transform duration-300" />
                                    </Link>
                                )
                            })}
                        </span>
                    </div>
                </div>
                <div className="w-full mt-12 md:absolute md:bottom-8 md:left-0 px-4 md:px-10">
                    <hr className="border-white/20 mb-3" />
                    <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center md:justify-between text-center md:text-left">
                        <p className="text-white/60 text-xs">
                            ©2025 Adastro. All Rights Reserved.
                        </p>
                        <div className="flex gap-4">
                            <Link href="/terms-and-conditions" className="opacity-60 hover:opacity-100 text-xs hover:text-[#d75525c9] transition-all duration-200 ease-in-out">Terms of Service</Link>
                            <Link href="/privacypolicy" className="opacity-60 hover:opacity-100 text-xs hover:text-[#d75525c9] transition-all duration-200 ease-in-out">Privacy Policy</Link>
                            <Link href="/refundpolicy" className="opacity-60 hover:opacity-100 text-xs hover:text-[#d75525c9] transition-all duration-200 ease-in-out">Refund Policy</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Footer