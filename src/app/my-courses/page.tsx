"use client";

import { useEffect, useState } from "react";
import courses from "@/lib/courses";
import Link from "next/link";
import Image from "next/image";

type Purchase = {
    courseId: string;
};

export default function MyCourses() {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/my-courses")
            .then((res) => res.json())
            .then((data) => {
                setPurchases(data.purchases || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
                Loading your courses...
            </div>
        );
    }

    const purchasedCourses = courses.filter((course) =>
    purchases.some((p) => String(p.courseId) === String(course.id))
);

    if (purchasedCourses.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl md:text-4xl font-bold text-center">You have not bought any course yet!</h1>
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
                      <Image alt="Course" src={"/course_1.webp"} width={600} height={600} className="object-cover mb-2"/>
                        <h2 className="text-2xl font-semibold mb-2">
                            {course.title}
                        </h2>

                        <p className="text-gray-400 mb-4">
                            {course.description}
                        </p>

                        <Link
                            href={`#`}
                            className="inline-block bg-[#d75525] px-6 py-2 rounded-lg text-white font-semibold"
                        >
                            Start Course
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
