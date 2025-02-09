import LButtons from "@/components/elements/login-button";
import Hr from "@/components/elements/hr";
import Link from "next/link";
import {FcGoogle} from "react-icons/fc";
import {FaApple, FaFacebook, FaSpotify} from "react-icons/fa6";
import Form from "@/app/(site)/login/form";

export default function Page() {
    return (
        <div className={'flex w-full  log-gradient md:pt-10 justify-center h-[100vh] md:h-full'}>
            <main className={` sm:w-[full] rounded-lg flex  flex-col items-center bg-[#121212] w-[45rem]`}>
                <div className={`
                    md:w-[45%] w-full px-8 md:px-0 gap-8 flex-col items-center flex
                `}>
                    <section
                        className={`font-bold pt-8 flex flex-col w-full relative items-center tracking-tighter  text-white`}>
                        <Link href={'/public'}>
                            <FaSpotify size={39}/>
                        </Link>
                        <div className={'text-[2rem]'}>Log in to Spotify</div>
                    </section>
                    <section className={'flex flex-col items-center w-full gap-3'}>
                        <LButtons icon={FcGoogle}>
                            Continue with google
                        </LButtons><LButtons icon={FaFacebook}>
                        Continue with facebook
                    </LButtons><LButtons icon={FaApple}>
                        Continue with apple
                    </LButtons>

                    </section>
                    <Hr className={`md:w-[150%] w-[100%] `}/>
                    <Form/>
                    <Link href={'#'} className={`
                underline
                font-normal
                tracking-tight
                text-md
                 `}>
                        Forgot your password?
                    </Link>
                    <Hr className={`w-[150%]`}/>
                    <section>
                        <div className={'text-zinc-400 tracking-tight'}>Don`t have an account? <Link href={'/signup'}
                                                                                                     className={`
                underline
                font-normal
                text-md
                text-white
                hover:text-[#1ed760]
                transition
                 `}>Sign up for Spotify</Link></div>
                    </section>
                </div>
            </main>
        </div>
    )
}