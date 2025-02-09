import Link from "next/link";
import {IconType} from "react-icons";

export default function LButtons(
    {children, href, icon: Icon, className}: {
        children?: React.ReactNode,
        href?: string,
        icon: IconType,
        className?: string
    }
) {
    return (
        <Link href={href || '#'} className={`
            w-full
            text-sm
            text-zinc-100
            md:text-[16px]
            tracking-tight
            py-[11px]
            px-8
            border
            border-zinc-500
            hover:border-white
            transition
            rounded-full
            flex
            justify-between
            gap-6
            font-semibold
            flex-shrink-0
        `}>
            <p className={'capitalize text-md '}>

                <Icon size={22} className={`text-blue-700`}/>
            </p>
            <p className={'capitalize text-md '}>{children}</p>
            <p></p>
        </Link>
    )
}