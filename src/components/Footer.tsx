import { manrope } from "@/app/fonts"
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
        <footer className="bg-[#111] text-[#e8e6e6] pt-12 md:pt-16 px-6 md:px-12 lg:px-24 pb-6" style={{
                    boxShadow: "0 0 20px #d75525c9",
                    backgroundImage: "url('/background.png')"
                }}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:justify-between">

                {/* Logo & Description */}
                <div className="flex flex-col gap-6 md:w-1/4">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/logo_v2.jpeg" alt="Logo" width={40} height={40} className="rounded-lg" />
                        <span className={`font-bold text-2xl md:text-3xl ${manrope.className}`}>AdAstro</span>
                    </Link>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl md:text-2xl font-semibold text-white/90">Reach the Right Audience</h2>
                        <p className="text-sm md:text-base text-white/70">Driving Digital Growth with AdAstro</p>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col gap-4 md:w-1/5">
                    <h2 className="text-lg md:text-xl font-bold">Quick Links</h2>
                    <div className="flex flex-col gap-2">
                        <Link href="/" className="text-white/70 text-sm md:text-base hover:text-[#d75525c9] transition-colors duration-200">Home</Link>
                        <Link href="/contact" className="text-white/70 text-sm md:text-base hover:text-[#d75525c9] transition-colors duration-200">Contact Us</Link>
                        <Link href="/blogs" className="text-white/70 text-sm md:text-base hover:text-[#d75525c9] transition-colors duration-200">Blogs</Link>
                    </div>
                </div>

                {/* Services */}
                <div className="flex flex-col gap-4 md:w-1/5">
                    <h2 className="text-lg md:text-xl font-bold">Services</h2>
                    <div className="flex flex-col gap-2">
                        <Link href="https://api.whatsapp.com/send/?phone=919217711163&text=Hi%2C+interested+in+Meta+%26+Google+Ads&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer"
                            className="text-white/70 text-sm md:text-base hover:text-[#d75525c9] transition-colors duration-200">Meta & Google Ads</Link>
                        <Link href="https://api.whatsapp.com/send/?phone=919217711163&text=Hi%2C+interested+in+LinkedIn+Ads&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer"
                            className="text-white/70 text-sm md:text-base hover:text-[#d75525c9] transition-colors duration-200">LinkedIn Ads</Link>
                        <Link href="https://api.whatsapp.com/send/?phone=919217711163&text=Hi%2C+interested+in+X+Ads&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer"
                            className="text-white/70 text-sm md:text-base hover:text-[#d75525c9] transition-colors duration-200">X (Twitter) Ads</Link>
                    </div>
                </div>

                {/* Contact & Social */}
                <div className="flex flex-col gap-4 md:w-1/4">
                    <h2 className="text-lg md:text-xl font-bold">Contact Info</h2>
                    <div className="flex flex-col gap-1">
                        <Link href="mailto:info@cloudydata.in" className="text-white/70 text-sm md:text-base font-semibold">info@cloudydata.in</Link>
                        <Link href="tel:+919217711173" className="text-white/70 text-sm md:text-base font-semibold">+91 92177 11173</Link>
                        <span className="text-white/70 text-sm md:text-base font-semibold">Sector-14, Gurgaon, India</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-lg md:text-xl font-bold">Social Media</h2>
                        <div className="flex gap-4">
                            {socialMedia.map((s) => {
                                const Icon = s.icon
                                return (
                                    <Link key={s.id} href={s.url} target="_blank" rel="noopener noreferrer"
                                        className="p-2 rounded-xl bg-transparent hover:scale-110 hover:shadow-[0_0_20px_#d75525c9] transition-transform duration-300"
                                        style={{ boxShadow: "0 0 10px #d75525c9" }}
                                    >
                                        <Icon size={28} color="#d75525c9" />
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>

            {/* Footer Bottom */}
            <div className="mt-12 border-t border-white/20 pt-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 md:gap-0">
                <p className="text-white/60 text-sm md:text-base">©2026 Ajaynova Analytics & AI PVT LTD. All Rights Reserved.</p>
                <div className="flex gap-4 flex-wrap justify-center md:justify-start">
                    <Link href="/terms-and-conditions" className="text-sm md:text-base text-white/60 hover:text-[#d75525c9] transition-colors duration-200">Terms of Service</Link>
                    <Link href="/privacypolicy" className="text-sm md:text-base text-white/60 hover:text-[#d75525c9] transition-colors duration-200">Privacy Policy</Link>
                    <Link href="/refundpolicy" className="text-sm md:text-base text-white/60 hover:text-[#d75525c9] transition-colors duration-200">Refund Policy</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
