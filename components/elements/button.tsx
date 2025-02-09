import {twMerge} from "tailwind-merge";

export default function Button({className,children}:{className?:string,children?:React.ReactNode}) {
    return (
        <button className={twMerge(
            `
            rounded-full
            bg-[#1ed760]
            py-3
            text-black
            w-full
            font-bold
            text-md
            tracking-tight
        `,className
        )}>
            {children}
        </button>
    )
}
