import {InputType} from "node:zlib";

export default function Input(
    {label,type}:{label:string,type:InputType}
){
    return(
        <label className={`w-full mt-3`}>
            <p className={'text-[14px] capitalize font-semibold text-white'}>{label}</p>
            <input type="text" placeholder={label} className={`
                border
                capitalize
                w-full
                border-zinc-500
                py-3
                px-3
                rounded-[4px]
                mt-1
                tracking-tight
                text-white
                focus:border-white
                transition
             `}/>
        </label>
    )
}