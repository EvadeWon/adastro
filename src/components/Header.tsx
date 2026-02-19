"use client";
import { manrope } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
const logoVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.3,
        mixBlendMode:"screen"
    },
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};


const containerVariants: Variants = {
    hidden: {

    },
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
    serviceRef: React.RefObject<HTMLDivElement | null>
}
export default function Header({ courseRef,serviceRef }: HeaderProps) {
    const scrollToCourses = () => {
        courseRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const scrollToServices=()=>{
        serviceRef.current?.scrollIntoView({behavior:"smooth"})
    }

    return (
        <div
            className={`relative flex items-center justify-center p-10`}
            style={{ minHeight: "calc(100vh - 4rem)" }}
        >
            <motion.div
                className="flex flex-col max-w-7xl items-center gap-4 text-center"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.4 }}
            >
                <motion.div variants={logoVariants}>
                    <Image
                        src={"/logo_v2.jpeg"}
                        alt="Logo"
                        width={120}
                        height={120}
                        color="white"
                        className="rounded-lg mix-blend-screen"
                    />
                </motion.div>
                <motion.h1
                    variants={itemVariants}
                    className={`text-[#E8602E] text-sm sm:xl md:text-[18px] uppercase ${manrope}`}
                >
                    Learn. Earn. Perform
                </motion.h1>
                <motion.h1
                    variants={itemVariants}
                    className={`text-[#ffffff] text-xl sm:3xl md:text-5xl font-semibold uppercase ${manrope}`}
                >
                    Don't wait for tomorrow.Boost your Business Today!
                </motion.h1>

                <motion.div variants={itemVariants} className="flex flex-col gap-4 md:flex-row md:gap-4">
                    <Button
                        onClick={scrollToCourses}
                        className="bg-[#d75525c9] hover:bg-[#cf623adc] text-white/90 cursor-pointer transition-all duration-300 shadow-md"
                        style={{boxShadow: "0 0 4px #d75525c9"}}
                    >
                        Explore Courses
                    </Button>
                    <Button
                        onClick={scrollToServices}
                        className="font-semibold text-white/90 cursor-pointer bg-transparent border hover:text-black/90 hover:bg-white transition-all duration-300 px-10"
                    >
                        Services
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
}
