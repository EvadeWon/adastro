"use client";

import { Button } from "@/components/ui/button";
import courses from "@/lib/courses";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {

    // 🔹 Abhi dummy data
    const purchasedCourses: string[] = [];

    const myCourses = courses.filter(course =>
        purchasedCourses.includes(course.id)
    );

    return (
        <section className="relative min-h-screen px-6 py-8 text-[#e8e6e6]" style={{ backgroundImage: "url('/background.png')", }}>

            {/* 🔴 EMPTY STATE */}
            {myCourses.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                    <h1 className="text-4xl font-semibold mb-2">
                        No Courses Purchased yet
                    </h1>
                    <p className="text-gray-400 max-w-md mb-6">
                        You haven’t purchased any courses yet. Start learning by enrolling in a course that matches your goals.
                    </p>

                    <Link href="/courses">
                        <Button className="bg-[#d75525c9] hover:bg-[#bb481ec9]">
                            Browse Courses
                        </Button>
                    </Link>
                </div>
            ) : (

                /* 🟢 PURCHASED COURSES */
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                    {myCourses.map((course) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-gradient-to-b from-[#171212] to-[#100B0B] rounded-xl p-6 border border-white/10"
                        >
                            <Image
                                src={course.image}
                                alt={course.title}
                                width={400}
                                height={400}
                                className="w-full h-[180px] object-cover rounded-lg mb-3"
                            />

                            <h1 className="text-xl font-semibold mb-2">
                                {course.title}
                            </h1>

                            <div className="flex gap-3 mt-4">
                                <Link href={`/my-courses/${course.id}`}>
                                    <Button className="bg-green-600 hover:bg-green-700">
                                        Go to Course
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    );
}
