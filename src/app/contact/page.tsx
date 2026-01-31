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
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { useState } from "react";

export default function Login() {
    const { toast } = useToast();
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
        "Digital Marketing With AI"
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

            if (!res.ok) {
                throw new Error("Failed to send message");
            }

            toast({
                title: "Message Sent Successfully!",
                description: "We'll get back to you within 24 hours.",
            });

            setFormData({
                name: "",
                email: "",
                phone: "",
                serviceType: "",
                message: "",
            });
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Send Us A Message</CardTitle>
                    <CardDescription >
                        Fill out the form below and we will get back to you as soon as possible. All inquiries are treated with complete confidentiality.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-4 text-white">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name*</Label>
                                <Input
                                    id="name"
                                    type="name"
                                    placeholder="Name"
                                    className="placeholder:text-white/70"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email*</Label>
                                <Input
                                    id="email"
                                    type="email"
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
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="serviceType" className="text-sm font-medium text-white">
                                        Enquiry About *
                                    </label>
                                    <Select
                                        value={formData.serviceType}
                                        onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Enquiry Topic" />
                                        </SelectTrigger>
                                        <SelectContent position="popper"
                                            sideOffset={8}
                                            className="bg-white shadow-lg border rounded-md">
                                            {services.map((service) => (
                                                <SelectItem className="hover:bg-[#bb481ec9] hover:cursor-pointer" key={service} value={service}>
                                                    {service}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
