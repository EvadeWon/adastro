"use client";

import { cinzel } from "@/app/fonts";
import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const { data: session } = useSession();
    const user = session?.user;

    const pathName = usePathname();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();

    const navLinks = [
        { id: 1, name: "Home", url: "/" },
        { id: 2, name: "Dashboard", url: "/my-courses" },
        { id: 3, name: "Contact", url: "/contact" },
    ];

    return (
        <nav className="flex justify-between items-center px-10 py-4 shadow-md">
            <Link href={"/"} className="flex items-center">
                <Image
                    src="/logo_v2.jpeg"
                    alt="Logo"
                    width={46}
                    height={46}
                    className="rounded-lg mix-blend-screen"
                />
                <span className={`font-bold text-xl ${cinzel.className}`}>
                    AdAstro
                </span>
            </Link>

            {/* Desktop Links */}
            <div className="border-b border-l border-r border-white/15 sm:flex hidden sm:gap-4 md:gap-6 text-xs text-white/70 bg-gradient-to-b from-[#171212] to-[#100B0B] px-6 py-2 rounded-sm tracking-wide">
                {navLinks.map((item) => {
                    const isActive = pathName === item.url;
                    return (
                        <Link
                            key={item.id}
                            href={item.url}
                            className={`hover:text-[#d75525c9] transition-colors duration-300 cursor-pointer ${isActive ? "text-white" : "text-white/50"
                                }`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            {/* Desktop Auth */}
            <div className="hidden sm:flex gap-3 items-center">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="cursor-pointer hover:ring-2 hover:ring-[#d75525c9] transition-all">
                                <AvatarImage
                                    src={user.image || ""}
                                    alt="Profile"
                                />
                                <AvatarFallback className="bg-[#d75525c9] text-white">
                                    {user.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            className="w-56 bg-[#1a1515] border border-white/10"
                        >
                            <DropdownMenuLabel className="text-white">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-white/60">
                                        {user.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator className="bg-white/10" />

                            <DropdownMenuItem
                                onClick={() => router.push("/my-courses")}
                                className="cursor-pointer text-white hover:bg-white/10"
                            >
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                <span>Dashboard</span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className="bg-white/10" />

                            <DropdownMenuItem
                                onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                                className="cursor-pointer text-red-400 hover:bg-red-500/10"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <>
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

            {/* Mobile toggle */}
            <div className="sm:hidden">
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <>
                    <div
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40"
                    />

                    <div className="fixed top-0 right-0 h-full w-full bg-[#100d0d] z-50 px-6 py-2 flex flex-col gap-6">
                        <div className="flex justify-end">
                            <button onClick={() => setIsOpen(false)}>
                                <X />
                            </button>
                        </div>

                        {user ? (
                            <>
                                <Button
                                    onClick={() => {
                                        setIsOpen(false);
                                        router.push("/my-courses");
                                    }}
                                    className="bg-[#d75525c9] rounded-xl"
                                >
                                    Dashboard
                                </Button>

                                <Button
                                    onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                                    className="bg-red-500 text-white rounded-xl"
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
                                    className="bg-[#d75525c9] rounded-xl"
                                >
                                    Login
                                </Button>

                                <Button
                                    onClick={() => {
                                        setIsOpen(false);
                                        router.push("/signup");
                                    }}
                                    className="bg-white text-black rounded-xl"
                                >
                                    Signup
                                </Button>
                            </>
                        )}
                    </div>
                </>
            )}
        </nav>
    );
};

export default Navbar;
