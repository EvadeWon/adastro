import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"
const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
            <div className="relative min-h-svh flex flex-col gap-4 items-center justify-center" style={{backgroundImage: "url('/authBackground.png')",}}>
                <Link href="/" className="flex items-center gap-2 font-medium mt-6">
                <Image className="rounded-lg" src="/logo_v2.jpeg" width={30} height={30} alt="Logo"/>
                    <span className="text-white text-lg">AdAstro</span>
                </Link>
                <div className="max-w-sm w-full">{children}</div>
            </div>
    )
}

export default AuthLayout