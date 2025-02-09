import {HiHome} from "react-icons/hi";
import {BiSearch} from "react-icons/bi";
import { IconType } from "react-icons";
import Link from "next/link";

interface BoxItemProps {
    icon: IconType;
    label: string;
    active: boolean;
    href: string;
}

export default function BoxItem({ icon: Icon, label, active, href }: BoxItemProps) {
    return (
        <Link href={href} className={`flex transition items-center justify-center md:justify-normal md:gap-3  h-full w-full`}>
            <Icon className={`${active && '!text-zinc-300'} text-zinc-400`} size={26}/>
            <p className={`${active && '!text-white'} hidden md:block font-medium text-zinc-400`}>
                {label}
            </p>
        </Link>
    );
}
