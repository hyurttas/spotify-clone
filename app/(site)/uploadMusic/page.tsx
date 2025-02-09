'use client'

import Input from "@/components/elements/input";
import genres from "@/components/genre";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import Label from "@/components/elements/uploadLabel";

const Page = () => {
    const imageRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        // Cleanup function to revoke the object URL when component unmounts
        // or when preview changes
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleFileChange = () => {
        const file = imageRef.current?.files?.[0];

        if (!file) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
    };

    return (
        <div
            className="bg-[#121212] w-full pt-12 px-8 sm:px-24 md:pt-24 md:px-12 lg:px-24 h-[100vh] flex flex-col-reverse justify-center items-center md:flex-row overflow-auto">
            <div className="h-full sm:w-[100%]  relative">
                <div className="flex flex-col h-full w-full md:w-[70%] transition items-end gap-4 overflow-hidden">
                    <Input type="text" name="name" label="music name"/>

                    {/* Image Upload Section */}
                    <div className="w-full relative">

                        <input
                            type="file"
                            id="trackImage"
                            ref={imageRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>

                    {/* Music Upload Section */}

                    <Label label={'upload music'} htmlFor={'file'}/>
                    <input
                        type="file"
                        accept="audio/*"
                        id="file"
                        className="hidden"
                    />

                    {/* Genres Section */}
                    <div className="relative w-full">
                        <div className="absolute left-0 text-white">Genres</div>
                        <div className="flex gap-2 flex-wrap mt-8">
                            {genres.map((genre, index) => (
                                <span
                                    key={index}
                                    className="border border-zinc-500 px-4 py-1 text-[13px] sm:text-[15px] rounded-sm text-zinc-500
                                             mt-1 hover:border-white hover:text-white cursor-pointer transition"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        className="py-2 w-32 bg-green-500 rounded-md hover:shadow-white
                                 hover:shadow-lg transition text-white font-medium"
                    >
                        Submit
                    </button>
                </div>
            </div>
            {/*image*/}
            <div className={`h-[50vh] w-full flex justify-center  relative`}>
                <div className="relative md:w-full md:h-[40rem] sm:h-[25rem] sm:w-[25rem] w-[15rem] h-[15rem] ">
                    <label
                        htmlFor={'trackImage'}
                        className={`
                            cursor-pointer
                            absolute
                            top-0
                            left-0
                            w-full
                            h-full
                            border
                            border-dashed
                            border-zinc-400
                            rounded-2xl
                            flex
                            items-center
                            justify-center
                        `}>
                        Choose image for cover
                    </label>
                    {preview && (
                        <Image
                            src={preview}
                            fill
                            className="object-cover rounded-2xl z-20"
                            alt="Track cover preview"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;