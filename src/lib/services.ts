import { Linkedin, LucideIcon, Target, Twitter } from "lucide-react";

type servicesType = {
    id: number,
    title: string,
    icon: LucideIcon,
    description: string,
    points: string[],
    cta: string
}
export const services: servicesType[] = [
    {
        id: 1,
        title: "Meta Ads",
        icon: Target,
        description:
            "Performance marketing with precision targeting on Facebook and Instagram.",
        points: [
            "Audience Targeting",
            "ROAS Optimization",
            "Conversion Tracking",
            "Retargeting",
        ],
        cta: "Get a Free Audit",
    },
    {
        id: 2,
        title: "Google Ads",
        icon: Target,
        description:
            "High-intent traffic through Search, Display, and YouTube advertising.",
        points: [
            "Search Ads",
            "Display Ads",
            "YouTube Ads",
            "Conversion Tracking",
        ],
        cta: "Get a Free Audit",
    },

    {
        id: 3,
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
        id: 4,
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