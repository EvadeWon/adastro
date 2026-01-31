"use client";

import Image from "next/image";

const brands = [
    { id: 1, logoImg: "/brands/amazon.png" },
    { id: 2, logoImg: "/brands/cloudydata.png" },
    { id: 3, logoImg: "/brands/starEducation.png" },
    { id: 4, logoImg: "/brands/kidsCoding.png" },
];

export default function BrandsTicker() {
    return (
        <div className="relative w-full overflow-hidden bg-black/70 py-30">

            <div className="flex animate-marquee">
                {brands.map((logo) => (
                    <div
                        key={`first-${logo.id}`}
                        className="mx-8 flex items-center justify-center"
                    >
                        <Image
                            src={logo.logoImg}
                            alt="Brand logo"
                            width={160}
                            height={70}
                            className="h-auto w-auto max-w-7xl object-contain"
                        />
                    </div>
                ))}
                {brands.map((logo) => (
                    <div
                        key={`second-${logo.id}`}
                        className="mx-8 flex items-center justify-center"
                    >
                        <Image
                            src={logo.logoImg}
                            alt="Brand logo"
                            width={160}
                            height={70}
                            className="h-auto w-auto max-w-7xl object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
