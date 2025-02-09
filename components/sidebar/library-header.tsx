import {BiLibrary} from "react-icons/bi";

export default function Lheader() {
    return (
        <div className={`
                            flex
                            justify-between
                            items-center
                            w-full
                        `}>
            <div className={'flex gap-3 pl-5 md:pl-0'}>
                <BiLibrary className={'text-zinc-300'} size={26}/>
                <h1 className={'text-zinc-400 tracking-tight font-semibold hidden md:block'}>
                    Your Library
                </h1>
            </div>
            <span className={`
                                text-4xl
                                font-thin
                                hidden md:block
                            `}>
                                +
                            </span>
        </div>
    )
}
