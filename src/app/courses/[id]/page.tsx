"use client";

import BrandsTicker from "@/components/BrandsTicker";
import CheckoutDrawer from "@/components/checkoutDrawer";
import { useAuth } from "@/hooks/useAuth";
import courses from "@/lib/courses";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// ─── types ───────────────────────────────────────────────────────────────────
interface Course {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    instructor?: string;
    rating?: number;
    students?: number;
    totalHours?: number;
    totalVideos?: number;
}

const WHY_INVEST = [
    { icon: "🎥", title: "45+ Dedicated Videos", desc: "Covering everything from basics to advanced strategies." },
    { icon: "⏱️", title: "7+ Hours of Content", desc: "No fluff — just pure actionable value every minute." },
    { icon: "♾️", title: "Lifetime Access", desc: "No deadlines, no pressure — learn at your own pace." },
    { icon: "🔄", title: "Always Updated", desc: "The only course that keeps getting updated with new strategies." },
];

const COURSE_FEATURES = [
    { icon: "🎬", title: "45+ Dedicated Videos & 7+ Hours", desc: "Learn how to start from scratch, master the strategies, and scale like a pro." },
    { icon: "🛒", title: "Scale Your E-Commerce Business", desc: "Actionable strategies to increase your website sales with proven ad frameworks." },
    { icon: "🎯", title: "Generate Quality Leads", desc: "All strategies to generate quality leads at low cost for service businesses." },
    { icon: "🔄", title: 'Create "Working" Funnels', desc: "A full marketing funnel — not just an ads funnel — for better conversions." },
    { icon: "💰", title: "Strategies That Made ₹1 Cr+", desc: "Proven strategies, implementation guides, and what will keep working ahead." },
    { icon: "📊", title: "Practical Case Studies", desc: "Real-life case studies across industries for actionable insights." },
];

const FREEBIES = [
    { icon: "📖", title: "Free E-Book", desc: "Ultimate guide to creating scroll-stopping ad creatives." },
    { icon: "🎯", title: "Targeting Guide Cheatsheet", desc: "Nail your audience every single time." },
    { icon: "🤖", title: "Ready-to-Use AI Prompts", desc: "Make ad creation and management easier than ever." },
    { icon: "🛠️", title: "Free Tools", desc: "Exclusive tools that simplify ad management." },
    { icon: "♾️", title: "Lifetime Access", desc: "No deadlines, no pressure — learn at your own pace." },
    { icon: "🚀", title: "Early Access to Future Courses", desc: "Exclusive discounts on all upcoming courses." },
];

const WHO_FOR = [
    { icon: "👨‍💼", desc: "Business Owners who want to grow sales without relying on agencies." },
    { icon: "📈", desc: "Digital Marketers ready to take their ad game to the next level." },
    { icon: "💼", desc: "Freelancers looking to offer high-ticket ad-management services." },
    { icon: "📚", desc: "Learners & Enthusiasts who want to stay ahead of the curve." },
];

const LEARN_TOPICS = [
    { num: "01", title: "Secret Strategies", desc: "Powerful marketing tricks that top experts rarely share." },
    { num: "02", title: "AI-Powered Campaigns", desc: "Use AI tools to automate tasks and boost results." },
    { num: "03", title: "High-Converting Funnels", desc: "Smart funnels that turn visitors into customers." },
    { num: "04", title: "Budget Optimisation", desc: "Stretch every rupee and increase ROI." },
    { num: "05", title: "Real-Life Case Studies", desc: "Learn from campaigns that delivered amazing results." },
    { num: "06", title: "Tracking Performance", desc: "Master tracking with iOS and platform changes." },
    { num: "07", title: "Scaling Campaigns", desc: "Increase reach without losing performance." },
    { num: "08", title: "Audience Targeting", desc: "Find the most likely converters without wasting budget." },
    { num: "09", title: "Ad Creatives", desc: "Stop-the-scroll visuals and copy that convert." },
    { num: "10", title: "Rising Costs", desc: "Keep ROI high as ad costs climb." },
];

const COACH = {
    name: "Jyotish Jha",
    subtitle: "India's Digital Marketing Tutor",
    bio: "Jyotish has coached over 2,000 students and helped scale multiple businesses from scratch to ₹1 crore per month in revenue. Her dream is to empower people to explore the massive potential of the online world - practical, relatable, and a little fun.",
    stats: [
        { val: "200+", label: "Instagram" },
        { val: "200k+", label: "LinkedIn" },
        { val: "8+", label: "Yrs Exp" },
        { val: "5000+", label: "Students" },
    ],
};

const FAQS = [
    { q: "How will I get access after paying?", a: "Visit the platform → Menu → Login → Continue with Google (use your purchase email) → Menu → Dashboard → Click your course." },
    { q: "Can I access the course lifetime?", a: "Yes! Once purchased you get lifetime access with no deadlines — learn at your own pace." },
    { q: "How will I get the freebies?", a: "All freebies are shared directly to the email you used during purchase." },
    { q: "How do I contact customer service?", a: "Email us at team@marketian.io — we are available all the time." },
    { q: "Is this a live or pre-recorded course?", a: "The course is pre-recorded, but industry updates are added frequently." },
    { q: "Is this course beginner friendly?", a: "100% YES! Every step is covered in a detailed video guide — even if you've never run ads before." },
    { q: "Can I start with zero experience?", a: "Most students start with zero experience, so absolutely yes." },
    { q: "Does this course guarantee results?", a: "The course teaches the skill in depth. However, results depend on how you apply what you learn." },
    { q: "Is there a money-back guarantee?", a: "No refunds are available. You receive immediate access to premium content upon enrolment. Please review all details before purchasing." },
];

// ─── small reusable components ───────────────────────────────────────────────
function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span
            className="inline-block px-4 py-6 rounded-2xl text-xs font-bold tracking-widest uppercase text-white "
            style={{ backgroundColor: "rgba(255, 255, 255, 0.125)" }}
        >
            {children}
        </span>
    );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
    return <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 leading-tight">{children}</h2>;
}

// gold accent used repeatedly
const Gold = ({ children }: { children: React.ReactNode }) => (
    <span style={{ color: "#FACC15" }}>{children}</span>
);

// card shell
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={`rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 ${className}`}
            style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
        >
            {children}
        </div>
    );
}

// icon + title + desc card
function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
    return (
        <Card>
            <div className="flex gap-4">
                <span className="text-2xl shrink-0">{icon}</span>
                <div>
                    <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                </div>
            </div>
        </Card>
    );
}

// numbered curriculum card
function LearnCard({ num, title, desc }: { num: string; title: string; desc: string }) {
    return (
        <Card className="group hover:border-blue-500">
            <div className="flex items-start justify-between mb-3">
                <span
                    className="text-3xl font-extrabold"
                    style={{
                        background: "linear-gradient(135deg,#3b82f6,#FACC15)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    {num}
                </span>
                {/* arrow appears on hover */}
                <div
                    className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "#1877F2" }}
                >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={3}>
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
            <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
        </Card>
    );
}

// FAQ accordion item
function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ borderBottom: "1px solid #2a2a2a" }}>
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-start justify-between py-5 px-1 text-left group"
            >
                <span className="text-white font-semibold text-sm pr-4 group-hover:text-yellow-300 transition-colors">{q}</span>
                <span
                    className="shrink-0 text-xl text-gray-500 transition-transform duration-300"
                    style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                    +
                </span>
            </button>
            <div
                className="overflow-hidden transition-all duration-400"
                style={{
                    maxHeight: open ? "200px" : "0px",
                    transition: "max-height 0.4s cubic-bezier(.22,1,.36,1)",
                }}
            >
                <p className="text-gray-400 text-sm leading-relaxed px-1 pb-5">{a}</p>
            </div>
        </div>
    );
}

// ─── reveal-on-scroll wrapper ────────────────────────────────────────────────
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        // check immediately (for above-the-fold)
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                }
            },
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: 0,
                transform: "translateY(28px)",
                transition: "opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)",
            }}
        >
            {children}
        </div>
    );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function CourseDetailPage() {
    const router = useRouter()
    const params = useParams();
    const course = courses.find((c: Course) => c.id === Number(params.id));
    if (!course) notFound();

    const [open, setOpen] = useState(false);
    const { user, loading, isAuthenticated } = useAuth();

    const handleEnrollClick = () => {
        if (loading) return; // Wait for auth check to complete

        if (isAuthenticated) {
            // User is logged in, open checkout drawer
            setOpen(true);
        } else {
            // User not logged in, redirect to login page
            router.push("/login");
        }
    };
    const handleProceed = async () => {
    try {
        const res = await fetch("/api/payment/create-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: course.price,
            }),
        });

        const order = await res.json();

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Evade Won",
            description: course.title,
            order_id: order.id,

            handler: async function (response: any) {
                // verify payment
                const verifyRes = await fetch(
                    "/api/payment/verify",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            ...response,
                            courseId: course.id,
                        }),
                    }
                );

                const data = await verifyRes.json();

                if (data.success) {
                    router.push("/my-courses");
                } else {
                    alert("Payment verification failed");
                }
            },

            theme: {
                color: "#d75525",
            },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    } catch (err) {
        console.error("Payment error:", err);
    }
};
    // glowing CTA shared style
    const ctaBtnStyle: React.CSSProperties = {
        background: "linear-gradient(135deg,#FACC15,#FDE047)",
        boxShadow: "0 0 18px 4px rgba(250,204,21,0.5)",
        animation: "glowPulse 2s ease-in-out infinite",
    };

    return (
        <>
            {/* ── injected keyframes ── */}
            <style>{`
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 14px 3px rgba(250,204,21,.45); }
          50%     { box-shadow: 0 0 30px 8px rgba(250,204,21,.7);  }
        }
        @keyframes marquee {
          0%   { transform: translateX(0);    }
          100% { transform: translateX(-50%); }
        }
      `}</style>

            <main className="min-h-screen" style={{ background: "#0f0f0f", color: "#f3f4f6" }}>

                {/* ════════ HERO ════════ */}
                <header
                    className="relative overflow-hidden"
                    style={{ background: "linear-gradient(180deg,#0a0f1e 0%,#0f0f0f 100%)" }}
                >
                    {/* ambient glow blobs */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute rounded-full" style={{ top: -120, left: -80, width: 500, height: 500, background: "#1877F2", opacity: 0.2, filter: "blur(100px)" }} />
                        <div className="absolute rounded-full" style={{ top: 60, right: -100, width: 400, height: 400, background: "#8B5CF6", opacity: 0.15, filter: "blur(90px)" }} />
                        <div className="absolute rounded-full" style={{ bottom: -60, left: "30%", width: 300, height: 300, background: "#FACC15", opacity: 0.1, filter: "blur(80px)" }} />
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto px-5 pt-16 pb-20 text-center">
                        <Badge>Become A Pro in
                            <span className="text-yellow-500 font-bold"> Facebook & Instagram ADS </span> in few months💸</Badge>

                        <h1 className="mt-8 text-5xl sm:text-6xl font-extrabold leading-tight text-white">
                            {course.title.includes("Facebook") || course.title.includes("Meta") ? (
                                <>
                                    Become A Pro in<br />
                                    <span
                                        style={{
                                            background: "linear-gradient(135deg,#1877F2,#a78bfa)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            backgroundClip: "text",
                                        }}
                                    >
                                        Facebook &amp; Instagram ADS
                                    </span>
                                    <span className="text-3xl sm:text-4xl text-gray-300 font-semibold mt-2 block">
                                        in just a few months 💸
                                    </span>
                                </>
                            ) : (
                                <>{course.title}</>
                            )}
                        </h1>

                        <p className="mt-4 text-xl font-bold text-white">
                            The Only <Gold>PERFORMANCE MARKETING COURSE</Gold> You Will Ever Need
                        </p>
                        <Image className="mx-auto rounded-full shadow-lg mt-6" style={{ boxShadow: "0 0 100px #d75525c9", }} alt="banner" src={"/banner_v1.jpg"} width={400} height={200} />
                        {/* stars + student count*/}
                        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap z-10">
                            <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4].map((i) => (
                                    <svg key={i} viewBox="0 0 20 20" className="w-5 h-5">
                                        <path d="M10 1l2.39 4.85L18 6.6l-4 3.9 1 5.5L10 13.27 5 16l1-5.5-4-3.9 5.61-.75z" fill="#FACC15" />
                                    </svg>
                                ))}
                                {/* half star */}
                                <svg viewBox="0 0 20 20" className="w-5 h-5">
                                    <defs>
                                        <clipPath id="halfClip"><rect x="0" y="0" width="10" height="20" /></clipPath>
                                    </defs>
                                    <path d="M10 1l2.39 4.85L18 6.6l-4 3.9 1 5.5L10 13.27 5 16l1-5.5-4-3.9 5.61-.75z" fill="#374151" />
                                    <path d="M10 1l2.39 4.85L18 6.6l-4 3.9 1 5.5L10 13.27 5 16l1-5.5-4-3.9 5.61-.75z" fill="#FACC15" clipPath="url(#halfClip)" />
                                </svg>
                            </div>
                            <span className="text-gray-400 text-sm">
                                <strong className="text-white">4.5</strong> from <strong className="text-white">5,000+</strong> students
                            </span>
                        </div>

                        {/* ── CTA button (opens drawer) ── */}
                        <div className="mt-10">
                            <button
                                disabled={loading}
                                onClick={handleEnrollClick}
                                className="rounded-full font-bold text-gray-900 text-lg px-10 py-4 transition-transform duration-300 hover:scale-105 active:scale-95"
                                style={ctaBtnStyle}
                            >
                                {loading ? "Loading..." : `ENROLL NOW – ₹${course.price.toLocaleString()}`}
                            </button>
                        </div>

                        {/* coach mini-card */}
                        <div className="mt-12 flex items-center justify-center gap-4">
                            <div
                                className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white"
                                style={{ background: "linear-gradient(135deg,#1877F2,#8B5CF6)" }}
                            >
                                DT
                            </div>
                            <div className="text-left">
                                <p className="text-white font-bold text-sm">{COACH.name}</p>
                                <p className="text-gray-400 text-xs">{COACH.subtitle} · 5,000+ students trained</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ════════ WHY INVEST ════════ */}
                <Reveal>
                    <section className="max-w-4xl mx-auto px-5 py-20">
                        <Badge>Why This Course?</Badge>
                        <SectionHeading>
                            Why You Should <Gold>Invest</Gold> In This Course?
                        </SectionHeading>
                        <div className="mt-8 grid sm:grid-cols-2 gap-4">
                            {WHY_INVEST.map((item, i) => (
                                <FeatureCard key={i} {...item} />
                            ))}
                        </div>
                        <div className="mt-8 text-center">
                            <button
                                onClick={handleEnrollClick}
                                disabled={loading}
                                className="rounded-full font-bold text-gray-900 text-base px-7 py-3 transition-transform duration-300 hover:scale-105 active:scale-95"
                                style={ctaBtnStyle}
                            >
                                {loading ? "Loading..." : `EARLY ACCESS AT JUST ₹${course.price.toLocaleString()}`}
                            </button>
                        </div>
                    </section>
                </Reveal>

                {/* ════════ BRAND MARQUEE ════════ */}
                <div style={{ borderTop: "1px solid #2a2a2a", borderBottom: "1px solid #2a2a2a", background: "#111" }}>
                    <BrandsTicker />
                </div>

                {/* ════════ COURSE CONTENTS ════════ */}
                <Reveal>
                    <section className="max-w-4xl mx-auto px-5 py-20">
                        <Badge>Course Contents</Badge>
                        <SectionHeading>
                            What You Will Get <Gold>Inside</Gold> The Course?
                        </SectionHeading>
                        <div className="mt-8 space-y-4">
                            {COURSE_FEATURES.map((f, i) => (
                                <FeatureCard key={i} {...f} />
                            ))}
                        </div>
                    </section>
                </Reveal>

                {/* ════════ FREEBIES ════════ */}
                <Reveal>
                    <section className="max-w-4xl mx-auto px-5 py-16">
                        <div
                            className="rounded-3xl p-8 sm:p-10"
                            style={{ background: "linear-gradient(135deg,#141e33,#1a1a2e)", border: "1px solid #2a3a5e" }}
                        >
                            <Badge>Exclusive Freebies</Badge>
                            <SectionHeading>
                                What <Gold>Else</Gold> Do You Get With This Course?
                            </SectionHeading>
                            <div className="mt-6 grid sm:grid-cols-2 gap-4">
                                {FREEBIES.map((item, i) => (
                                    <FeatureCard key={i} {...item} />
                                ))}
                            </div>
                        </div>
                    </section>
                </Reveal>

                {/* ════════ STUDENTS MARQUEE ════════ */}
                <div style={{ borderTop: "1px solid #2a2a2a", borderBottom: "1px solid #2a2a2a", background: "#111" }}>
                    <p className="text-center text-gray-500 text-xs tracking-widest uppercase pt-4">
                        5,000+ 🤝 Students Already Upskilling
                    </p>
                    <BrandsTicker />
                </div>

                {/* ════════ WHO IS THIS FOR ════════ */}
                <Reveal>
                    <section className="max-w-4xl mx-auto px-5 py-20">
                        <Badge>Ideal For</Badge>
                        <SectionHeading>
                            Who Is This Course <Gold>For?</Gold>
                        </SectionHeading>
                        <div className="mt-8 grid sm:grid-cols-2 gap-4">
                            {WHO_FOR.map((item, i) => (
                                <Card key={i}>
                                    <div className="flex gap-3">
                                        <span className="text-xl shrink-0">{item.icon}</span>
                                        <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                        <div className="mt-8 text-center">
                            <button
                                onClick={handleEnrollClick}
                                disabled={loading}
                                className="rounded-full font-bold text-gray-900 text-base px-7 py-3 transition-transform duration-300 hover:scale-105 active:scale-95"
                                style={ctaBtnStyle}
                            >
                                {loading ? "Loading..." : `JOIN NOW FOR ₹${course.price.toLocaleString()}`}
                            </button>
                        </div>
                    </section>
                </Reveal>

                {/* ════════ WHAT YOU WILL LEARN (curriculum) ════════ */}
                <Reveal>
                    <section className="max-w-5xl mx-auto px-5 py-20">
                        <div className="text-center">
                            <Badge>Curriculum</Badge>
                            <SectionHeading>
                                What You Will Learn In <Gold>9+ Hour</Gold> Course?
                            </SectionHeading>
                            <p className="mt-2 text-gray-400 text-sm">
                                Here is what you will learn in just <strong className="text-white">9 Hours</strong>
                            </p>
                        </div>
                        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {LEARN_TOPICS.map((t, i) => (
                                <LearnCard key={i} {...t} />
                            ))}
                        </div>
                        <div className="mt-10 text-center">
                            <button
                                onClick={handleEnrollClick}
                                disabled={loading}
                                className="rounded-full font-bold text-gray-900 text-base px-7 py-3 transition-transform duration-300 hover:scale-105 active:scale-95"
                                style={ctaBtnStyle}
                            >
                                {loading ? "Loading..." : `JOIN NOW AT ₹${course.price.toLocaleString()}`}
                            </button>
                        </div>
                    </section>
                </Reveal>

                {/* ════════ MEET YOUR COACH ════════ */}
                <Reveal>
                    <section className="max-w-4xl mx-auto px-5 py-20">
                        <div
                            className="rounded-3xl overflow-hidden flex flex-col sm:flex-row"
                            style={{ background: "linear-gradient(135deg,#0f172a,#1e1b4b)", border: "1px solid #2e2b5e" }}
                        >
                            {/* gradient avatar side */}
                            <div
                                className="sm:w-2/5 flex items-center justify-center p-8"
                                style={{ background: "linear-gradient(135deg,#1877F2,#8B5CF6)", minHeight: 260 }}
                            >
                                <div
                                    className="w-44 h-44 rounded-full flex items-center justify-center"
                                    style={{ border: "4px solid rgba(255,255,255,0.2)" }}
                                >
                                    <span className="text-7xl font-extrabold text-white">DT</span>
                                </div>
                            </div>

                            {/* info side */}
                            <div className="sm:w-3/5 p-8 flex flex-col justify-center">
                                <Badge>Meet Your Coach</Badge>
                                <h2 className="text-2xl font-extrabold text-white mt-4">{COACH.name}</h2>
                                <p className="text-gray-400 text-xs mt-1 mb-4">{COACH.subtitle}</p>

                                <div className="flex flex-wrap gap-3 mb-5">
                                    {COACH.stats.map((s, i) => (
                                        <div key={i} className="rounded-lg px-3 py-2 text-center" style={{ background: "#1a1a2e" }}>
                                            <p
                                                className="text-lg font-extrabold"
                                                style={{
                                                    background: "linear-gradient(135deg,#3b82f6,#FACC15)",
                                                    WebkitBackgroundClip: "text",
                                                    WebkitTextFillColor: "transparent",
                                                    backgroundClip: "text",
                                                }}
                                            >
                                                {s.val}
                                            </p>
                                            <p className="text-gray-500 text-xs">{s.label}</p>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-gray-400 text-xs leading-relaxed">{COACH.bio}</p>
                            </div>
                        </div>
                    </section>
                </Reveal>

                {/* ════════ BIG CTA BANNER ════════ */}
                <Reveal>
                    <section className="max-w-4xl mx-auto px-5 py-16">
                        <div
                            className="rounded-3xl p-10 text-center relative overflow-hidden"
                            style={{ background: "linear-gradient(135deg,#1877F2,#6366f1)" }}
                        >
                            {/* decorative circles */}
                            <div className="absolute rounded-full" style={{ top: -40, right: -40, width: 160, height: 160, background: "rgba(255,255,255,0.2)" }} />
                            <div className="absolute rounded-full" style={{ bottom: -30, left: -30, width: 120, height: 120, background: "rgba(250,204,21,0.15)" }} />

                            <h2 className="relative z-10 text-3xl sm:text-4xl font-extrabold text-white">
                                So, What Are You <Gold>Waiting For?</Gold>
                            </h2>
                            <p className="relative z-10 text-white/80 text-sm mt-3 max-w-xl mx-auto">
                                Enrol today and unlock exclusive access to in-depth strategies plus real case studies on how to implement them.
                            </p>
                            <div className="relative z-10 mt-6">
                                <button
                                    onClick={handleEnrollClick}
                                    disabled={loading}
                                    className="rounded-full font-bold text-gray-900 text-lg px-10 py-4 transition-transform duration-300 hover:scale-105 active:scale-95"
                                    style={ctaBtnStyle}
                                >
                                    {loading ? "Loading..." : `JOIN NOW AT ₹${course.price.toLocaleString()}`}
                                </button>
                            </div>
                        </div>
                    </section>
                </Reveal>

                {/* ════════ FAQ ════════ */}
                <Reveal>
                    <section className="max-w-3xl mx-auto px-5 py-20" id="faq">
                        <div className="text-center">
                            <Badge>FAQ</Badge>
                            <SectionHeading>
                                Frequently Asked <Gold>Questions</Gold>
                            </SectionHeading>
                        </div>
                        <div
                            className="mt-10 rounded-2xl overflow-hidden"
                            style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
                        >
                            {FAQS.map((f, i) => (
                                <FAQItem key={i} {...f} />
                            ))}
                        </div>
                    </section>
                </Reveal>

                {/* ════════ DISCLAIMER ════════ */}
                <footer className="mt-8 px-5 py-10" style={{ borderTop: "1px solid #2a2a2a", background: "#0a0a0a" }}>
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">⚠️ Disclaimer</h3>
                        <p className="text-gray-600 text-xs leading-relaxed">
                            This course teaches you essential skills for running successful ad campaigns, but success is not guaranteed.
                            Results depend on factors like your ad creatives, business nature, strategies, efforts, and consistency.
                            Your success will ultimately depend on how well you apply what you learn.
                        </p>
                        <p className="text-gray-600 text-xs leading-relaxed mt-2">
                            We are not associated with Meta, Facebook, Instagram, or any of their affiliates in any way.
                            This course is independently created for educational purposes.
                        </p>
                    </div>
                </footer>
            </main>

            {isAuthenticated && (
                <CheckoutDrawer open={open} onClose={() => setOpen(false)} course={course} />
            )}
        </>
    );
}