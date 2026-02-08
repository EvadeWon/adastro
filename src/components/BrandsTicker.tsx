"use client";

import Image from "next/image";

const brands = [
    { id: 1, logoImg: "/brands/microsoft.png" },
    { id: 2, logoImg: "/brands/cloudydata.png" },
    { id: 3, logoImg: "/brands/starEducation.png" },
    { id: 4, logoImg: "/brands/kidsCoding.png" },
    { id: 5, logoImg: "/brands/lassiking.png" },
];

const items = [...brands, ...brands];


export default function BrandsTicker() {
    return (
        <div className="overflow-hidden py-6" style={{background: "transparent"}}>
            <p className="text-center text-gray-500 text-xs tracking-widest uppercase pb-8">Brands We Have Worked With</p>
            <div
                className="flex w-max animate-marquee"
            >
                {items.map((logo, i) => (
                    <div
                        key={i}
                        className="mx-10 flex items-center justify-center"
                    >
                        <Image
                            src={logo.logoImg}
                            alt="Brand logo"
                            width={140}
                            height={70}
                            className="object-contain transition-all duration-300 rounded-xl md:rounded-2xl"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
