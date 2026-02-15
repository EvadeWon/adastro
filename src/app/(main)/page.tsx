"use client"
import BrandsTicker from "@/components/BrandsTicker"
import CoursesSection from "@/components/Courses"
import Header from "@/components/Header"
import RevenueChart from "@/components/RevenueChart"
import ServiceSection from "@/components/Services"
import Image from "next/image"
import { useRef } from "react"

const Home = () => {
  const courseRef = useRef<HTMLDivElement | null>(null)
  const serviceRef = useRef<HTMLDivElement | null>(null)
  return (
    <>
      <Header courseRef={courseRef} serviceRef={serviceRef} />
      <div className="border-t border-b border-[#571e0ac9]">
        <BrandsTicker />
      </div>
      <div className="p-10 sm:p-30 min-h-screen">
        <h2 className="text-xl md:text-3xl font-bold mb-6 text-center uppercase">
          Monthly Revenue Growth
        </h2>
        <div className="p-2 md:p-10 rounded-xl shadow-lg">
          <RevenueChart />
        </div>
      </div>
      <div ref={serviceRef}>
        <ServiceSection />
      </div>
      <div ref={courseRef}>
        <CoursesSection />
      </div>
      <div>
        <h1 className="opacity-70 font-bold text-center text-4xl uppercase mb-10 mt-6">
          testimonials
        </h1>
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-16 px-6">
          <Image
            className="rounded-lg border border-amber-500 shadow-lg w-full md:w-auto md:max-w-[700px] h-auto"
            src={"/Testimonial_1.png"}
            alt="Testimonial_1"
            width={700}
            height={300}
          />
          <Image
            className="rounded-lg border border-amber-500 shadow-lg w-full md:w-auto md:max-w-[700px] h-auto"
            src={"/Testimonial_2.jpeg"}
            alt="Testimonial_2"
            width={700}
            height={300}
          />
        </div>
      </div>

    </>
  )
}

export default Home