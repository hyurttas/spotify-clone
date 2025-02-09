import Image from "next/image";

export default function ListItem(){
    return(
        <button className={`
            flex
            items-center
            justify-between
            rounded-md
            px-2
            py-1
            w-full
            hover:bg-[rgba(255,255,255,.1)]
        `}>
            <div className={`
                flex
                items-center
                gap-5
            `}>
                <p className={`
                    text-zinc-500
                    font-light
                    text-[15px]
                `}>1</p>
                <div className={`
                    relative
                    w-[44px]
                    h-[44px]
                `}>
                    <Image alt={'cover'} src={`/img/model.jpg`} fill className={`rounded object-cover bg-center`}/>
                </div>
                <div className={'flex flex-col gap-1'}>
                    <h3 className={`
                        capitalize
                        font-light
                        text-[16px]
                    `}>
                        Nereye gittin ki sen?
                    </h3>
                    <p className={`
                        capitalize
                        tracking-tight
                        text-[13px]
                        text-zinc-400
                        font-light
                        text-start
                    `}>
                        Emre nalbantoglu
                    </p>
                </div>

            </div>
            <p className={`
                text-sm
                text-zinc-400
                font-light
            `}>4:25</p>
        </button>
    )
}
