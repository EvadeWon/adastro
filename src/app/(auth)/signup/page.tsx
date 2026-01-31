import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
    return (
        <Card className="">
            <CardHeader>
                <CardDescription >
                    Login with your Google Email Account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    <Button className="w-full mb-2 border-[#4E4948] border bg-gradient-to-b from-[#171212] to-[#100B0B] text-grey-400 cursor-pointer">
                        <FaGoogle />
                        <span>Continue with Google</span>
                    </Button>
                    <div className="flex items-center w-full mb-2">
                        <div className="flex-1 h-px bg-border" />
                        <span className="px-3 text-sm text-white">
                            Or Continue With
                        </span>
                        <div className="flex-1 h-px bg-border" />
                    </div>
                </div>
                <form>
                    <div className="flex flex-col gap-4 text-white">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="name"
                                placeholder="Name"
                                className="placeholder:text-white/70"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                className="placeholder:text-white/70"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Password" className="placeholder:text-white/70" required />
                        </div>
                        <Button type="submit" className="w-full bg-[#d75525c9] hover:bg-[#bb481ec9] text-white/90 cursor-pointer">Signup</Button>
                        <p className="font-semibold">Have an Account ? <Link className="text-[#d75525c9]" href={"/login"}>Login</Link></p>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
