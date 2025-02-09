export default function SContainer({children}:{children:React.ReactNode}){
    return(
        <div className={`
            px-3
            mt-6
        `}>
            <h1 className={`
                text-2xl
                font-semibold
                mb-6
            `}>
                Browse all
            </h1>
            <div className={`
                flex
                flex-wrap
                h-full
                justify-between
                gap-y-5
            `}>
                {children}

            </div>
        </div>
    )
}
