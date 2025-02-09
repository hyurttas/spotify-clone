import {twMerge} from "tailwind-merge";
import React from "react";

export default function Box({children, className}: { children: React.ReactNode, className?: string }) {
    return (
        <div className={twMerge(`
        bg-[#121212]
        w-full      
        min-h-[5rem]
        h-fit      
        flex
        rounded-xl
        items-center
        justify-between
        overflow-hidden
        
        ${className}
        `)}>
            {children}
        </div>
    )
}
