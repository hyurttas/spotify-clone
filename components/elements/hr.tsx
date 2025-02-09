import {twMerge} from "tailwind-merge";

export default function Hr({className = ''}:{className?:string}) {
    return(
        <div className={
            twMerge(`
            h-[1px]
            bg-[#303030]
            my-4
            w-full
            `,className)
        }>

        </div>
    )
}