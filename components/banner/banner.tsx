export default function Banner(){
    return(
        <div className={`
            w-full
            h-6
            rounded-sm
            bg-[#1DB954]
            justify-end
            px-3
            flex 
            items-center
        `}>
            <p className={`
                text-sm
                font-semibold
                text-black
            `}>
                Playing on Iphone
            </p>
        </div>
    )
}