"use client";

import courses from "@/lib/courses";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IoMdContacts } from "react-icons/io";
import { Button } from "./ui/button";

export default function CoursesSection() {
    return (
        <section
            className="min-h-screen bg-black/70 text-white px-2 py-8 max-w-6xl mx-auto"
        >
            <h2 className="text-3xl md:text-4xl uppercase font-bold text-center mb-4">
                Our Courses
            </h2>
            <p className="text-gray-300 text-center mb-8 text-sm">Choose from our hand-picked selection of top-rated courses</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-1 max-w-5xl mx-auto cursor-pointer">
                {courses.map((course) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        whileInView={{ opacity: 1, y: 0, scale: 0.9 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="bg-linear-to-b from-[#171212] to-[#100B0B] rounded-xl p-6 border border-white/10 hover:scale-[1.02] transition"
                    >
                        <Image src={course.image} alt={course.title} width={400} height={400} className="w-full h-40 sm:h-45 md:h-50 object-cover rounded-lg mb-2" />
                        <h1 className="text-xl font-semibold mb-2">{course.title}</h1>
                        <p className="text-gray-300 font-normal">{course.description}</p>
                        <div className="flex gap-4 mt-2">
                            <div className="flex items-center gap-1">
                                <Star className="text-yellow-400 fill-yellow-300" />
                                <span>{course.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <IoMdContacts />
                                {course.students}
                            </div>
                        </div>
                        <div className="flex gap-3 items-center mt-2">
                            <h1 className="font-semibold text-2xl">₹{course.price}</h1>
                            <h1 className="line-through text-gray-300 text-lg">₹{course.originalPrice}</h1>
                        </div>
                        <div className="flex gap-3 mt-4">
                            <Link href={`/courses/${course.id}`}>
                                <Button className="cursor-pointer bg-[#d75525c9] hover:bg-[#bb481ec9] text-white/90">Enroll Now</Button>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
