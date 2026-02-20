"use client"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
export default function Login() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        message: "",
    });
    const services = [
        "Performance Marketing",
    ];
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed");

            toast.success("message sent ",{description: " We will contact you soon"},
            );

        } catch (err) {
            toast("Error",{description: "Try again later"});
        } finally {
            setIsSubmitting(false);
            setFormData({
                name: "",
                email: "",
                phone: "",
                serviceType: "",
                message: "",
            });
        }
    };

    return (
        <>
            <Card className="mb-20 mt-10">
                <CardHeader>
                    <CardTitle>Send Us A Message</CardTitle>
                    <CardDescription >
                        Fill out the form below and we will get back to you as soon as possible. All inquiries are treated with complete confidentiality.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4 text-white">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name*</Label>
                                <Input
                                    id="name"
                                    type="name"
                                    placeholder="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="placeholder:text-white/70"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email*</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="placeholder:text-white/70"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium text-white">
                                        Phone Number *
                                    </label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Your phone number"
                                        required
                                    />
                                </div><br />
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium text-white">
                                        Write your queries
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Type your message"
                                        required
                                        className="pr-20 pb-10 pt-5"
                                    />
                                </div>
                            </div>
                            <Button type="submit" size="lg" className="w-full text-white cursor-pointer bg-[#bb481ec9] hover:bg-[#bb481ec9]" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    "Sending..."
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        Send Message
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}
