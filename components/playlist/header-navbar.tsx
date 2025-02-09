import Button from "@/components/elements/button";
import {FaPlay} from "react-icons/fa";
import {TfiMenuAlt} from "react-icons/tfi";

export default function PNavbar(){
    return(
        <div className={`
            flex
            w-full
            justify-between
            items-center
            mt-9
        `}>
            <Button  className={`
                w-[3.1rem]
                h-[3.1rem]
                rounded-full
                flex
                items-center
                justify-center
                hover:scale-105
            `}>
                <FaPlay className="text-black" size={17} />
            </Button>
            <div className={'flex items-center gap-2'}>
                <p className={'text-zinc-400 text-sm font-light'}>List</p>
                <TfiMenuAlt/>
            </div>
        </div>
    )
}
