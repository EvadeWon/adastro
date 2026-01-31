type coursesType = {
    id: number,
    title: string,
    description: string,
    price: number,
    originalPrice: number,
    rating: number,
    students: number,
    duration:string,
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
        duration: "40 hours",
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
    {
        id: 2,
        title: "Digital Marketing with AI",
        description: "Learn modern digital marketing using AI tools to automate ads, content, and growth strategies.",
        price: 3499,
        originalPrice: 6999,
        rating: 4.9,
        students: 12350,
        duration: "35 hours",
        level: "Intermediate",
        instructor: "Dr. Rajesh Kumar",
        image: "/course_2.jpg",
        highlights: [
            "Python fundamentals to advanced",
            "Data analysis with Pandas & NumPy",
            "Machine Learning algorithms",
            "Deep Learning with TensorFlow",
            "Real industry projects"
        ],
        curriculum: [
            "Python Programming Basics",
            "Data Analysis & Visualization",
            "Machine Learning Fundamentals",
            "Deep Learning & Neural Networks",
            "Natural Language Processing",
            "Computer Vision Projects"
        ]
    },
];

export default courses;