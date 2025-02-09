import {twMerge} from "tailwind-merge";


export default function Main({children, className}: { children: React.ReactNode, className?: string }) {
    return (
        <main className={twMerge(
            `
            overflow-auto
            bg-[#121212] 
            h-full 
            w-full 
            rounded-xl
            hov
            `, className
        )}>
            {children}
        </main>
    );
}
