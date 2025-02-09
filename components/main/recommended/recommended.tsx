import Link from "next/link";
import Image from "next/image";

export default function Recplaylist(){
    return(
        <Link href={`#`} className={`
            flex
            flex-col
            gap-2
            p-2
            hover:bg-[rgba(255,255,255,.08)]
            transition
            w-[12rem]
            rounded-lg
            flex-none
            items-center
            justify-center
        `}>
        {/*    Image    */}
            <div className={`
                w-full
                h-[11rem]
                relative
            `}>
                <Image fill alt={'model'} src={'/img/model.jpg'} className={`
                    rounded-lg
                    object-cover
                    bg-center
                `}/>
            </div>

        {/*    Texts    */}
            <h4 className={`
                text-clip
                text-balance
                text-[13px]
                font-light
                text-[rgba(255,255,255,.6)]
            `}>
                Ceza, Ati242, Contra, and Hidra
            </h4>
        </Link>
    )
}
