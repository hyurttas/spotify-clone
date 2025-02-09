'use client'
import Main from "@/components/main/main";
import PHeader from "@/components/playlist/playlist-header";
import PNavbar from "@/components/playlist/header-navbar";
import TitleInfo from "@/components/playlist/list-title";
import Hr from "@/components/elements/hr";
import {useRef, useState} from "react";
import {extractMainColors} from "@/components/coloe";
import genres from "@/components/genre";
import ListItem from "@/components/playlist/list-item";
import {useRouter} from "next/navigation";

export default function Page() {
    const imageRef = useRef<HTMLImageElement>(null);
    const [colors, setColors] = useState<string[]>([]);
    const router = useRouter()
    const handleImageLoad = () => {
        if (imageRef.current) {
            const mainColors = extractMainColors(imageRef.current);
            setColors(mainColors);
        }
    };

    function getMidColor(color1: string,) {
        // Remove 'rgb()' or 'rgba()' and split into numbers
        const parseColor = (color: string) => {
            return color
                .replace('rgb(', '')
                .replace('rgba(', '')
                .replace(')', '')
                .split(',')
                .map(num => parseInt(num.trim()));
        };

        const [r1, g1, b1] = parseColor(color1);
        const [r2, g2, b2] = parseColor('rgba(18, 18, 18, 1)');

        // Calculate middle values
        const midR = Math.round((r1 + r2) / 2);
        const midG = Math.round((g1 + g2) / 2);
        const midB = Math.round((b1 + b2) / 2);

        return `rgb(${midR}, ${midG}, ${midB})`;
    }

    const playlistLength = genres
    const bg = colors[1] || 'rgba(255,255,255,.5)';
    const bg2 = getMidColor(bg)
    console.log(bg)
    return (
        <Main style={{background: `linear-gradient(180deg, ${bg} 2%, ${bg2} 20%,rgba(18, 18, 18, 1) 50%)`}}>
            <button
                onClick={router.back}
                className={`
                absolute
                top-6
                left-6
                bg-[rgba(255,255,255,.2)]
                rounded-full
                w-8
                h-8
                flex
                items-center
                justify-center
                
            `}>
                <p className={`text-xl font-thin`}>{'<'}</p>
            </button>
            <div className={`pt-8 px-4`}>
                <PHeader
                    imageRef={imageRef}
                    onImageLoad={handleImageLoad}
                />
                <PNavbar/>
                <TitleInfo/>
                <Hr className={'mt-3 hidden sm:block'}/>
                <div className={`flex flex-col sm:px-1 gap-1`}>
                    {playlistLength.map((e, index) => (
                        <ListItem key={index} listNumber={index}/>
                    ))}
                </div>
            </div>
        </Main>
    );
}