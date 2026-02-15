"use client";

import { Button } from "@/components/ui/button";
import courses from "@/lib/courses";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Purchase = {
    courseId: string;
    status: string;
};

export default function MyCourses() {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const res = await fetch("/api/my-courses");

                if (!res.ok) throw new Error("Not authorized");

                const data = await res.json();

                // Only keep PAID purchases
                const paidPurchases =
                    data.purchases?.filter(
                        (p: Purchase) => p.status === "PAID"
                    ) || [];

                setPurchases(paidPurchases);
            } catch (error) {
                console.error("Fetch purchases error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchases();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
                Loading your courses...
            </div>
        );
    }

    const purchasedCourses = courses.filter((course) =>
        purchases.some(
            (p) => String(p.courseId) === String(course.id)
        )
    );

    if (purchasedCourses.length === 0) {
        return (
            <div className="min-h-screen flex flex-col gap-4 items-center justify-center">
                <h1 className="text-2xl md:text-4xl font-bold text-center">
                    You have not bought any course yet!
                </h1>

                <Link href="/courses">
                    <Button className="bg-[#d75525c9] hover:bg-[#cf623adc] text-white/90 cursor-pointer transition-all duration-300 shadow-md">
                        Browse Courses
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-10">
            <h1 className="text-4xl font-bold mb-10 text-center">
                My Courses
            </h1>

            <div className="grid md:grid-cols-3 gap-8">
                {purchasedCourses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-zinc-900 p-6 rounded-xl shadow-lg"
                    >
                        <Image
                            alt="Course"
                            src={"/course_1.webp"}
                            width={600}
                            height={600}
                            className="object-cover mb-2"
                        />

                        <h2 className="text-2xl font-semibold mb-2">
                            {course.title}
                        </h2>

                        <p className="text-gray-400 mb-4">
                            {course.description}
                        </p>
                        <Link
                            href="https://api.whatsapp.com/send/?phone=919217711163&text=Hi%2C+interested+in+Meta+%26+Google+Ads+with+ROAS+optimization.+Please+share+details&type=phone_number&app_absent=0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-green-600 px-6 py-3 rounded-lg text-white font-semibold hover:bg-green-700"
                        >
                            Join WhatsApp
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
