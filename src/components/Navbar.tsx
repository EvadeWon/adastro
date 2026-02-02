"use client"
import { Menu, ShoppingCart, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "./ui/button"
import { cinzel } from "@/app/fonts"
const Navbar = () => {
    const [isLogin, setIslogin] = useState(false);
    const pathName = usePathname();
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const router = useRouter();
    type navLinksType = {
        id: number,
        name: string,
        url: string
    }
    const navLinks: navLinksType[] = [
        { id: 1, name: "Home", url: "/" },
        { id: 2, name: "Courses", url: "/courses" },
        { id: 3, name: "Contact", url: "/contact" }
    ]
    return (
        <nav className="flex justify-between items-center px-10 py-4 shadow-md">
            <Link href={"/"} className="flex items-center gap-1">
                <Image src="/logo.jpeg" alt="Logo" width={35} height={35} className="rounded-lg" />
                <span className={`font-bold text-xl ${cinzel.className}`}>AdAstro</span>
            </Link>
            <div className="border-b border-l border-r  border-white/15 sm:flex hidden sm:gap-4 md:gap-6 text-xs text-white/70 bg-gradient-to-b from-[#171212] to-[#100B0B] px-6 py-2 rounded-sm tracking-wide">
                {navLinks.map((item) => {
                    const isActive = pathName === item.url;
                    return (
                        <Link className={`hover:text-[#d75525c9] transition-colors duration-300 ${isActive ? "text-white" : "text-white/50"}`} key={item.id} href={item.url}>{item.name}</Link>
                    )

                })}
            </div>
            <div className="hidden sm:flex gap-3 items-center">
                {isLogin ? (
                    <Link href="/cart">
                        <ShoppingCart className="cursor-pointer" />
                    </Link>
                ) : (
                    <Link href="/login">
                        <ShoppingCart className="cursor-pointer" />
                    </Link>
                )}
                <Button onClick={() => router.push("/login")} className="cursor-pointer rounded-2xl bg-transparent hover:bg-transparent hover:text-[#d75525c9]">Login</Button>
                <Button onClick={() => router.push("/signup")} className="bg-[#efebeb] text-black hover:bg-[#ffffff] cursor-pointer rounded-2xl text-sm">Get Started</Button>
            </div>
            <div className="sm:hidden">
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>
            {/* Mobile Menu */}
            {isOpen && (
                <>
                    {/* Overlay */}
                    <div
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40"
                    />

                    {/* Sidebar */}
                    <div className="
            fixed top-0 right-0 h-full w-[100%] bg-[#100d0d] z-50
            px-6 py-2 flex flex-col gap-6
            transition-transform duration-300
        ">
                        {/* Close Button */}
                        <div className="flex justify-end">
                            <button onClick={() => setIsOpen(false)}>
                                <X />
                            </button>
                        </div>

                        {/* Links */}
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="text-sm text-white"
                        >
                            Home
                        </Link>

                        <Link
                            href="/courses"
                            onClick={() => setIsOpen(false)}
                            className="text-sm text-white"
                        >
                            Courses
                        </Link>

                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="text-sm text-white"
                        >
                            Contact
                        </Link>

                        <hr className="border-white/20 my-2" />

                        {/* Auth Buttons */}
                        <Button
                            onClick={() => {
                                setIsOpen(false)
                                router.push("/login")
                            }}
                            className="bg-[#d75525c9] hover:bg-[#bb481ec9] rounded-xl cursor-pointer border-b border-r border-l"
                        >
                            Login
                        </Button>

                        <Button
                            onClick={() => {
                                setIsOpen(false)
                                router.push("/signup")
                            }}
                            className="bg-white hover:bg-[#f3ecec] text-black rounded-xl cursor-pointer"
                        >
                            Signup
                        </Button>
                    </div>
                </>
            )}

        </nav>
    )
}



export default Navbar