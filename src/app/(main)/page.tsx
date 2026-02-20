"use client"
import BrandsTicker from "@/components/BrandsTicker"
import CoursesSection from "@/components/Courses"
import Header from "@/components/Header"
import RevenueChart from "@/components/RevenueChart"
import ServiceSection from "@/components/Services"
import Testimonials from "@/components/Testimonials"
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
      <div className="p-10 sm:p-30 h-[35vh] md:h-screen">
        <h2 className="text-xl md:text-4xl font-bold mb-2 text-center opacity-80">
          Unlocking Our Monthly Revenue Milestones
        </h2>
        <div className="p-2 md:p-30 rounded-xl shadow-lg">
          <RevenueChart />
        </div>
      </div>
      <div ref={serviceRef}>
        <ServiceSection />
      </div>
      <div ref={courseRef}>
        <CoursesSection />
      </div>
      <Testimonials />

    </>
  )
}

export default Home