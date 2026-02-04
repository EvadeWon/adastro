import { Linkedin, LucideIcon, Target, Twitter } from "lucide-react";

type servicesType={
    id:number,
    title:string,
    icon:LucideIcon,
    description:string,
    points:string[],
    cta:string
}
export const services:servicesType[] = [
    {
        id: 1,
        title: "Meta & Google Ads",
        icon: Target,
        description:
            "Performance marketing with precision targeting. Meta Ads, Google Ads, and ROAS optimization that delivers measurable results.",
        points: [
            "Meta Ads",
            "Google Ads",
            "ROAS Optimization",
            "Conversion Tracking",
        ],
        cta: "Get a Free Audit",
    },
    {
        id: 2,
        title: "LinkedIn Ads",
        icon: Linkedin,
        description:
            "B2B lead generation at scale. Target decision-makers with precision campaigns that drive qualified leads and conversions.",
        points: [
            "B2B Targeting",
            "Lead Gen Forms",
            "Account-Based Marketing",
            "Retargeting",
        ],
        cta: "Start B2B Campaign",
    },
    {
        id: 3,
        title: "X (Twitter) Ads",
        icon: Twitter,
        description:
            "Real-time engagement and brand awareness. Tap into conversations and trends to amplify your brand’s voice.",
        points: [
            "Trend Amplification",
            "Follower Campaigns",
            "Video Ads",
            "Promoted Posts",
        ],
        cta: "Amplify Your Brand",
    },
];