"use client";

import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";
import { motion } from "framer-motion";

export default function ServiceSection() {
    return (
        <section className="relative py-24 px-6 bg-black/50 text-white">
            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto mb-6">
                <h2 className="text-4xl md:text-5xl font-semibold mb-4">
                    What We Deliver
                </h2>
                <p className="text-white/60 text-sm md:text-base">
                    Full-spectrum performance marketing across all major platforms with
                    data-driven strategies and creative excellence.
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
                {services.map((service) => {
                    const Icon = service.icon;
                    return (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 50, scale: 0.8 }}
                            whileInView={{ opacity: 1, y: 0, scale: 0.9 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="bg-linear-to-b from-[#171212] to-[#100B0B] rounded-xl p-6 border border-white/10 hover:scale-[1.02] cursor-pointer transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                                <Icon className="w-6 h-6 text-white" />
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-semibold mb-3">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-white/60 text-xs mb-6">
                                {service.description}
                            </p>

                            {/* Points */}
                            <ul className="space-y-3 mb-8">
                                {service.points.map((point, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                                        <span className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center text-xs">
                                            ✓
                                        </span>
                                        {point}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Button
                                variant="ghost"
                                className="
                  w-full border bg-white text-black/95
                  transition-all duration-300
                "
                            >
                                {service.cta} →
                            </Button>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
