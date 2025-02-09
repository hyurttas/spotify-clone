export default function Lcontainer({children}:{children:React.ReactNode}) {
    return (
        <div className={`
            h-full
            w-full
            mt-3
            overflow-auto
            hov
        `}>
            {children}
        </div>
    )
}
