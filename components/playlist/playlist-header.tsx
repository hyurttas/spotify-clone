import Image from "next/image";

export default function PHeader(){
    return(
        <div className={`
            w-full 
            h-full
            flex
            gap-3
        `}>
        {/*    Image    */}
            <div className={`
                relative
                w-[8.5rem]
                h-[8.5rem]
            `}>
                <Image className={`rounded-md object-cover bg-center`} alt={'cover'} src={`/img/model.jpg`} fill/>
            </div>
        {/*    Text     */}
            <div className={`
                flex
                flex-col
                justify-end
            `}>
                <p className={`text-zinc-100 text-[14px]`}>Playlist</p>
                <h1 className={`
                    text-[2.6rem]
                    font-bold
                    tracking-tight
                    mt-[-10px]
                    leading-[60px]
                `}>zeus</h1>
                {/*header bottom*/}
                <div className={`
                    flex
                    gap-2
                    items-center
                `}>
                    <div className={'relative w-4 h-4'}>
                        <Image className={`rounded-full object-cover bg-center`} alt={'cover'} src={`/img/model.jpg`} fill/>
                    </div>
                    <p className={`font-medium text-sm`}>hsy <span className={`font-light ml-2 tracking-tight text-[13px]`}>247 songs</span> </p>
                </div>
            </div>
        </div>
    )
}
