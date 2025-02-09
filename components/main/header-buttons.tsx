import Link from "next/link";
import Image from "next/image";
import './main.scss'

export default function HeaderButton(active: { active: boolean }) {
    return (
        <Link href={'/playlist'} className={`
                flex
                light
                items-center
                text-white
                rounded-[4px]
                w-[47%]
                xl:w-[23%]
                h-12
                xl:h-16
                ${active
        &&
        `bg-zinc-100
                 text-black
                `}
            `}>
            <div className={'h-[46px] xl:h-14 flex rounded-[4px] gap-2 items-center'}>
                <div className={'relative h-full bg-purple-800 w-12 xl:w-14'}>
                    <Image alt={'model'} className={'rounded-[4px] object-cover bg-center'} src={'/img/model.jpg'}
                           fill/>
                </div>
                <h3 className={`
                        font-semibold
                        text-sm
                        
                    `}>
                    Hits
                </h3>
            </div>
        </Link>

    )
}
