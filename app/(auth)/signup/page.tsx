'use client'
import Input from "@/components/elements/input";
import {FaApple, FaFacebook, FaSpotify} from "react-icons/fa6";
import {useRouter, useSearchParams} from "next/navigation";
import Button from "@/components/elements/button";
import {BsChevronLeft} from "react-icons/bs";
import {useGoogleLogin} from "@react-oauth/google";
import axios from "axios";
import {useActionState, useState} from 'react'
import LButtons from "@/components/elements/login-button";
import {FcGoogle} from "react-icons/fc";
import Hr from "@/components/elements/hr";
import {signUp} from "@/actions/signUpAction";

export default function Page() {
    //formAction
    const [state, action, pending] = useActionState(signUp, undefined);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const param = useSearchParams();
    let page = Number(param.get('page')) || 1;

    const router = useRouter();
    //google auth
    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const res = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${response.access_token}`,
                        },
                    }
                );
                console.log(res.data);
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        },
    });

    const handleSubmit = async () => {
        const rawData = {
            email: email,
            name: name,
            password: password,
        }

        try {
            const response = await axios.post('http://localhost:3000/api/createUser', rawData);  // Send rawData directly
            const result = response.data;

            if (response.status === 200 && result.redirect) {
                window.location.href = result.redirect;
            } else {
                console.error('Failed to create session:', result.message);
            }
            console.log('User created successfully:', result);
        } catch (error: any) {
            console.error('Error creating user:', error.response ? error.response.data : error.message);
        }
    };


    return (
        <main className="bg-[#121212] w-full h-full flex justify-center">
            {errorMessage}
            <div className="w-[22rem] h-full relative flex flex-col items-center gap-y-7 pt-8">
                {page !== 1 &&
                    <div className="w-[130%] h-[2px] bg-zinc-600 transition">
                        <div className={`bg-green-500 h-full w-${page}/3`}></div>
                    </div>
                }
                {page === 1 &&
                    <>
                        <FaSpotify size={50}/>
                        <div
                            className="tracking-tight leading-tight text-[2.8rem] text-white font-bold text-center mt-4">
                            <p>Sign up to</p>
                            <p>start listening</p>
                        </div>
                        <Input label="Email address" min={6} max={12} name="email" type="email"
                               onChange={(e: any) => setEmail(e.target.value)}
                               className={`${errorMessage.length >= 1 && 'border-red-500'}`}
                        />
                        {state?.errors?.email && <p>{state.errors.email.join(', ')}</p>}
                        <section className={'flex absolute top-[28rem] flex-col items-center w-full gap-3'}>
                            <Hr className={`md:w-[150%] w-[100%] `}/>
                            <LButtons icon={FcGoogle} onClick={() => login()}>
                                Continue with google
                            </LButtons><LButtons icon={FaFacebook}>
                            Continue with facebook
                        </LButtons><LButtons icon={FaApple}>
                            Continue with apple
                        </LButtons>

                        </section>
                    </>
                }
                {page === 2 &&
                    <div className="flex flex-col w-full relative">
                        <button className="absolute left-[-40px] top-5"
                                onClick={() => router.push(`/signup?page=${page - 1}`)}>
                            <BsChevronLeft size={20}/>
                        </button>
                        <p className="text-zinc-400 font-normal mb-2">Step {page}/3</p>
                        <h4 className="text-white font-semibold tracking-tight text-left text-sm capitalize mb-6">Create
                            password</h4>
                        <Input name="password" label="Password" type="password" max={10}
                               onChange={(e: any) => setPassword(e.target.value)}
                               className={`${errorMessage.length >= 1 && 'border-red-500'}`}


                        />
                        {state?.errors?.password && <p>{state.errors.password.join(', ')}</p>}
                        <div className="mt-3">
                            <h4 className="text-[13px] tracking-tight font-semibold">Your password must include:</h4>
                            <div className="ml-2">
                                <div className="flex gap-2 items-center mt-3">
                                    <span
                                        className={`border rounded-full w-[10px] h-[10px] `}></span>
                                    <p className="text-[13px]">8 letters</p>
                                </div>
                                <div className="flex gap-2 items-center mt-2">
                                    <span
                                        className={`border rounded-full w-[10px] h-[10px] `}></span>
                                    <p className="text-[13px]">Number and special character</p>
                                </div>
                                <div className="flex gap-2 items-center mt-2">
                                    <span
                                        className={`border rounded-full w-[10px] h-[10px] `}></span>
                                    <p className="text-[13px]">At most 15 characters</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {page === 3 &&
                    <div className="flex flex-col w-full relative">
                        <button className="absolute left-[-40px] top-5"
                                onClick={() => router.push(`/signup?page=${page - 1}`)}>
                            <BsChevronLeft size={20}/>
                        </button>
                        <p className="text-zinc-400 font-normal mb-2">Step {page}/3</p>
                        <h4 className="text-white font-semibold tracking-tight text-left text-sm capitalize mb-6">Create
                            username</h4>
                        <Input name="name" label="Username" type="text" max={10}
                               onChange={(e: any) => setName(e.target.value)}
                               className={`${errorMessage.length >= 1 && 'border-red-500'}`}
                        />
                        {state?.errors?.name && <p>{state.errors.name.join(', ')}</p>}

                    </div>
                }
                <Button buttonType={page === 3 ? 'submit' : 'button'}
                        onClick={() => (page == 3 ? handleSubmit() : router.push(`/signup?page=${page + 1}`))}
                >{page === 3 ? 'Sign up' : 'Next'}</Button>
            </div>
        </main>
    );
}
