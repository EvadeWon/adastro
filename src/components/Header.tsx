"use client";
import { manrope } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
const logoVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.3,
    },
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 15,
        },
    },
};


const containerVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 60,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

type HeaderProps = {
    courseRef: React.RefObject<HTMLDivElement | null>
}
export default function Header({ courseRef }: HeaderProps) {
    const scrollToCourses = () => {
        courseRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div
            className={`relative flex items-center justify-center p-10`}
            style={{ minHeight: "calc(100vh - 4rem)" }}
        >
            <motion.div
                className="flex flex-col max-w-3xl items-center gap-4 text-center"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.4 }}
            >
                <motion.div variants={logoVariants}>
                    <Image
                        src={"/logo.jpeg"}
                        alt="Logo"
                        width={50}
                        height={50}
                        className="rounded-lg"
                    />
                </motion.div>
                <motion.h1
                    variants={itemVariants}
                    className={`text-[#E8602E] text-sm sm:xl md:text-[18px] uppercase ${manrope}`}
                >
                    Learn. Build. Evolve
                </motion.h1>
                <motion.h1
                    variants={itemVariants}
                    className={`text-[#ffffff] text-xl sm:3xl md:text-4xl font-semibold ${manrope}`}
                >
                    Master Digital Marketing & Performance Marketing Powered by AI
                </motion.h1>
                <motion.p
                    variants={itemVariants}
                    className="text-white tracking-wide text-xs md:px-45 text-center"
                >

                    Learn how modern brands scale using data, ads, automation, and AI tools.
                    Our industry-ready courses are designed to help you launch campaigns, optimize results, and drive real revenue, not just certificates.
                </motion.p>

                <motion.div variants={itemVariants}>
                    <Button
                        onClick={scrollToCourses}
                        className="bg-[#d75525c9] hover:bg-[#bb481ec9] text-white/90 border-b border-l border-r cursor-pointer"
                    >
                        Explore Courses
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
}
