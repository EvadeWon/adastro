"use client"
import { cinzel } from "@/app/fonts"
import { LogOut, Menu, ShoppingCart, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
const Navbar = () => {
    const [user, setUser] = useState<null>(null);
    const [showLogout, setShowLogout] = useState<boolean>(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        fetch("/api/auth/me")
            .then(res => res.json())
            .then(data => setUser(data.user))
            .catch(() => setUser(null));
    }, []);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setShowLogout(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const pathName = usePathname();
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            setUser(null);
            setShowLogout(false);
            router.push("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    type navLinksType = {
        id: number,
        name: string,
        url: string
    }
    const navLinks: navLinksType[] = [
        { id: 1, name: "Home", url: "/" },
        { id: 2, name: "Dashboard", url: "/my-courses" },
        { id: 3, name: "Contact", url: "/contact" }
    ]
    return (
        <nav className="flex justify-between items-center px-10 py-4 shadow-md">
            <Link href={"/"} className="flex items-center">
                <Image src="/logo_v2.jpeg" alt="Logo" width={46} height={46} className="rounded-lg mix-blend-screen" />
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
                {user ? (
                    <>
                        <Link href="/cart">
                            <ShoppingCart className="cursor-pointer" />
                        </Link>
                        <div className="relative" ref={profileMenuRef}>
                            <Avatar
                                className="cursor-pointer hover:ring-2 hover:ring-[#d75525c9] transition-all"
                                onClick={() => setShowLogout(!showLogout)}
                            >
                                <AvatarFallback
                                    alt="Avatar"
                                    className="bg-[#d75525c9] text-grayscale">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            {/* Logout Button */}
                            {showLogout && (
                                <div className="absolute right-0 mt-2 z-50">
                                    <Button
                                        onClick={handleLogout}
                                        className="bg-orange-600 hover:bg-red-600 text-white rounded-lg flex items-center gap-2 shadow-lg cursor-pointer"
                                    >
                                        <LogOut size={14} />
                                        Logout
                                    </Button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Link href="/login">
                            <ShoppingCart className="cursor-pointer" />
                        </Link>
                        <Button onClick={() => router.push("/login")} className="cursor-pointer rounded-2xl bg-transparent hover:bg-transparent hover:text-[#d75525c9]">Login</Button>
                        <Button onClick={() => router.push("/signup")} className="bg-[#efebeb] text-black hover:bg-[#ffffff] cursor-pointer rounded-2xl text-sm">Get Started</Button>
                    </>
                )}
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
                            className="bg-[#d75525c9] hover:bg-[#bb481ec9] rounded-xl cursor-pointer shadow-md" style={{ boxShadow: "0 0 4px #d75525c9" }}
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