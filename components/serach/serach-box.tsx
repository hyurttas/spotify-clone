'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

export default function SBox() {
    const [color, setColor] = useState("#FFFFFF"); // Default color

    useEffect(() => {
        const generateColor = () => {
            let color = "#";
            const hexValues = "0123456789ABCDEF";
            for (let i = 0; i < 6; i++) {
                color += hexValues[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        setColor(generateColor());
    }, []);

    const boxClassName = twMerge(`
    w-[48%]
    lg:w-[32%]
    xl:[w-24%]
    h-[9rem]
    rounded-xl
    relative
    overflow-hidden
  `);

    return (
        <Link href={'#'} className={`${boxClassName}`} style={{ backgroundColor: color }}>
            <h5 className={`
          absolute
          top-5
          left-5
          text-[15px]
          font-semibold
        `}>
                Music
            </h5>
            <div className={'absolute right-[-50px] top-[30px] origin-top-left rotate-[25deg]'}>
                <div className={'relative w-[7rem] h-[7rem]'}>
                    <Image alt={'cover'} fill src={'/img/model.jpg'} className={`object-cover bg-center`}/>
                </div>
            </div>
        </Link>
    );
}
