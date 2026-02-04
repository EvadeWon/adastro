"use client"
import BrandsTicker from "@/components/BrandsTicker"
import CoursesSection from "@/components/Courses"
import Header from "@/components/Header"
import ServiceSection from "@/components/Services"
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
      <div ref={serviceRef}>
        <ServiceSection />
      </div>
      <div ref={courseRef}>
        <CoursesSection />
      </div>
    </>
  )
}

export default Home