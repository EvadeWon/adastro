// app/my-courses/page.tsx
"use client";

import courses from "@/lib/courses";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Purchase = {
    courseId: string;
};

export default function MyCourses() {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();
    const router = useRouter();

    // ✅ Agar UNAUTHENTICATED hai to login pe bhejo
    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login"); // replace use karo
        }
    }, [status, router]); // session nahi, status use karo

    // ✅ Fetch purchases only when authenticated
    useEffect(() => {
        if (status === "authenticated") {
            fetch("/api/my-courses")
                .then((res) => res.json())
                .then((data) => {
                    setPurchases(data.purchases || []);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [status]);

    // ✅ Loading state - jab tak session load ho raha hai
    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
                Loading...
            </div>
        );
    }

    // ✅ Unauthenticated - show nothing (redirect happening)
    if (status === "unauthenticated") {
        return null;
    }

    // ✅ Authenticated but data loading
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
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl md:text-4xl font-bold text-center">
                    You have not bought any course yet!
                </h1>
                <p className="text-gray-400">Welcome, {session?.user?.name}</p>
                <Link
                    href="/"
                    className="bg-[#d75525] px-6 py-3 rounded-lg text-white font-semibold"
                >
                    Browse Courses
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-10">
            <div className="mb-4">
                <p className="text-sm text-gray-400">
                    Logged in as: {session?.user?.email}
                </p>
            </div>

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
                            src={course.image || "/course_1.webp"}
                            width={600}
                            height={600}
                            className="object-cover mb-2 rounded-lg"
                        />
                        <h2 className="text-2xl font-semibold mb-2">
                            {course.title}
                        </h2>

                        <p className="text-gray-400 mb-4">
                            {course.description}
                        </p>

                        <Link
                            href={`/courses/${course.id}`}
                            className="inline-block bg-[#d75525] px-6 py-2 rounded-lg text-white font-semibold hover:bg-[#bb481e]"
                        >
                            Start Course
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}