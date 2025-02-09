import React from 'react'
import {BiSearch} from "react-icons/bi";

const SerachBar = () => {
    return (
        <div className={`flex flex-col px-4 mt-8 z-[10]  gap-1`}>
            {/*    addd song  */}
            {/*    Search Bar   */}
            <h1 className={`
                        font-semibold
                        text-[23px]
                        tracking-tight
                    `}>
                Let's find something for your playlist
            </h1>
            <div className={`
                        w-[80%]
                        mt-3
                        h-10
                        rounded-sm
                        gap-2
                        bg-[#2d2c2c]
                        flex
                        items-center
                        px-5
                    `}>

                <BiSearch size={20}/>
                <input type="text"
                       className={`
                                w-full
                                text-start
                                text-[13px]
                                font-[300]
                                text-zinc-50
                                placeholder:text-zinc-300
                        `}
                       placeholder={'Search for songs or episodes'}
                />
            </div>
        </div>
    )
}
export default SerachBar
