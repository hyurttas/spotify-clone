import Recplaylist from "@/components/main/recommended/recommended";

export default function RecContainer({title}:{title:string}){
    return(
        <div className={`
            w-full
            h-full
            mt-16
            pl-2
            
        `}>
            <h1 className={`
                text-[26px]
                pl-2
                font-semibold
                text-zinc-100
            `}>{title}</h1>
            <div className={`
            w-full
            flex
            overflow-auto
            gap-1
        `}>
                <Recplaylist/>
                <Recplaylist/>
                <Recplaylist/>
                <Recplaylist/>
                <Recplaylist/>
                <Recplaylist/>
                <Recplaylist/>
            </div>
        </div>
    )
}
