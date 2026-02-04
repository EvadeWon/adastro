export type coursesType = {
    id: number,
    title: string,
    description: string,
    price: number,
    originalPrice: number,
    rating: number,
    students: number,
    level:string
    instructor:string
    image:string
    highlights:string[],
    curriculum:string[]
}

const courses:coursesType[] = [
    {
        id: 1,
        title: "Performance Marketing",
        description: "Learn performance marketing focused on ROI-driven ads, tracking, and scaling campaigns.",
        price: 2999,
        originalPrice: 5999,
        rating: 4.8,
        students: 15420,
        level: "Beginner to Advanced",
        instructor: "Priya Sharma",
        image: "/course_1.webp",
        highlights: [
            "Build 10+ real-world projects",
            "Learn modern JavaScript (ES6+)",
            "Master React and Node.js",
            "Get job-ready portfolio",
            "Lifetime access to course content"
        ],
        curriculum: [
            "HTML5 & CSS3 Fundamentals",
            "JavaScript Mastery",
            "React Development",
            "Backend with Node.js",
            "Database Management",
            "Deployment & DevOps"
        ]
    },
];

export default courses;