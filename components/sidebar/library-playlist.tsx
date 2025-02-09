import Image from "next/image";
import Link from "next/link";

export default function LPlaylist(){
    return(
        <Link
            href={'/playlist'}
            className={`
            h-15
            w-full
            flex
            items-center
            gap-3
            py-1
            mt-2
            pl-2
            rounded
            md:pl-1
            transition
            hover:bg-[rgba(255,255,255,10%)]
        `}>
            <div className={`
                relative
                h-12
                w-12
                rounded-md
            `}>
                <Image fill alt={'model'} src={`/img/model.jpg`} className={`
                    object-cover
                    bg-center
                    rounded-md
                `}/>
            </div>
            {/*text*/}
            <div className={`
                hidden
                md:block
            `}>
                <div className={`
                flex 
                flex-col
                items-start
                
            `}>
                    <h5 className={`
                    text-white
                    font-[300]
                `}>
                        zeus
                    </h5>
                    <p className={`
                    text-zinc-400
                    text-sm
                `}>
                        playlist Ela
                    </p>
                </div>
            </div>
        </Link>
    )
}
