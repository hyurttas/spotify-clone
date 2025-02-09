import Button from "@/components/navbar/button";
import {FaSpotify} from "react-icons/fa6";

export default function Navbar() {
    const auth = false
    return (
        <nav
            className={`flex z-50 h-[3.5rem] sticky left-0 top-0 overflow-hidden w-full py-1 ${auth && `bg-[#101010]`} items-center justify-between  pl-6 text-white`}>
            <FaSpotify size={35}/>
            <div className={`flex h-full gap-2`}>
                <Button isDark={true} href={'/signup'} label={'sign up'}/>
                <Button isDark={false} href={'login'} label={'login'}/>
            </div>
        </nav>
    );
}
