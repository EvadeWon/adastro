"use client"
import BrandsTicker from "@/components/BrandsTicker"
import CoursesSection from "@/components/Courses"
import Header from "@/components/Header"
import { useRef } from "react"

const Home = () => {
  const courseRef = useRef<HTMLDivElement | null>(null)
  return (
    <>
      <Header courseRef={courseRef} />
      <BrandsTicker />
      <div ref={courseRef}>
        <CoursesSection />
      </div>

    </>
  )
}

export default Home