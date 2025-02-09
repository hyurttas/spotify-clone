import Link from "next/link";

const Button = ({isDark, label, href}: { isDark: boolean, label: string, href: string }) => {
    return (
        <button className={`
        px-7
        rounded-full 
        h-[2.8rem]
        font-semibold 
        text-[15px]
        capitalize 
        ${isDark ? 'bg-none text-zinc-300 hover:text-white ' : 'bg-white text-black hover:scale-110 hover:opacity-90 '}`}>
            <Link href={href}>
                {label}
            </Link>
        </button>
    )
}

export default Button
