"use client"
import { cinzel } from "@/app/fonts"
import { LayoutDashboard, LogOut, Menu, ShoppingCart, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
type UserType = {
    name: string;
    email: string;
    picture?: string;
    image?: string;
}
const Navbar = () => {
    const [user, setUser] = useState<UserType | null>(null);
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
                            <ShoppingCart className="cursor-pointer hover:text-[#d75525c9] transition-colors" />
                        </Link>

                        {/* Profile Dropdown Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer hover:ring-2 hover:ring-[#d75525c9] transition-all">
                                    <AvatarImage src={user?.image || user?.picture} alt="Profile" />
                                    <AvatarFallback className="bg-[#d75525c9] text-white">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                className="w-56 bg-[#1a1515] border border-white/10"
                            >
                                <DropdownMenuLabel className="text-white">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium">{user.name}</p>
                                        <p className="text-xs text-white/60">{user.email}</p>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator className="bg-white/10" />

                                <DropdownMenuItem
                                    onClick={() => router.push("/my-courses")}
                                    className="cursor-pointer text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
                                >
                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                    <span>Dashboard</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator className="bg-white/10" />

                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="cursor-pointer text-red-400 hover:bg-red-500/10 hover:text-red-400 focus:bg-red-500/10 focus:text-red-400"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                ) : (
                    <>
                        <Link href="/login">
                            <ShoppingCart className="cursor-pointer hover:text-[#d75525c9] transition-colors" />
                        </Link>
                        <Button
                            onClick={() => router.push("/login")}
                            className="cursor-pointer rounded-2xl bg-transparent hover:bg-transparent hover:text-[#d75525c9]"
                        >
                            Login
                        </Button>
                        <Button
                            onClick={() => router.push("/signup")}
                            className="bg-[#efebeb] text-black hover:bg-[#ffffff] cursor-pointer rounded-2xl text-sm"
                        >
                            Get Started
                        </Button>
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
                        {user ? (
                            <>
                                <Button
                                    onClick={() => {
                                        setIsOpen(false);
                                        router.push("/my-courses");
                                    }}
                                    className="bg-[#d75525c9] hover:bg-[#bb481ec9] rounded-xl cursor-pointer"
                                >
                                    Dashboard
                                </Button>

                                <Button
                                    onClick={async () => {
                                        await handleLogout();
                                        setIsOpen(false);
                                    }}
                                    className="bg-red-500 hover:bg-red-600 text-white rounded-xl cursor-pointer"
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    onClick={() => {
                                        setIsOpen(false);
                                        router.push("/login");
                                    }}
                                    className="bg-[#d75525c9] hover:bg-[#bb481ec9] rounded-xl cursor-pointer"
                                >
                                    Login
                                </Button>

                                <Button
                                    onClick={() => {
                                        setIsOpen(false);
                                        router.push("/signup");
                                    }}
                                    className="bg-white hover:bg-[#f3ecec] text-black rounded-xl cursor-pointer"
                                >
                                    Signup
                                </Button>
                            </>
                        )}
                    </div>
                </>
            )}

        </nav>
    )
}



export default Navbar