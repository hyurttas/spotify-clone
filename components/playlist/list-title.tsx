import {LuClock3} from "react-icons/lu";

export default function TitleInfo(){
    return(
        <div className={`
            flex
            justify-between
            items-center
            mt-5
            px-5
        `}>
            <div className={'flex items-center gap-3'}>
                <p className={`
                    text-zinc-400
                    font-light
                    text-[17px]
                `}>#</p>
                <p className={`
                    text-zinc-400
                    font-light
                    text-[15px]
                `}>Title</p>
            </div>

            <LuClock3/>
        </div>
    )
}
