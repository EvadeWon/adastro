import { buttonVariants } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"
const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
            <div className="relative min-h-svh flex flex-col gap-4 items-center justify-center" style={{backgroundImage: "url('/authBackground.png')",}}>
                <Link href="/" className="flex items-center gap-2 font-medium">
                <Image className="rounded-lg" src="/logo.jpeg" width={30} height={30} alt="Logo"/>
                    <span className="text-white text-lg">AdAstro</span>
                </Link>
                <div className="max-w-sm w-full">{children}</div>
            </div>
    )
}

export default AuthLayout