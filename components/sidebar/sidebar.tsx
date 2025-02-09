'use client';
import Box from "@/components/sidebar/box/box";
import {useMemo} from "react";
import {usePathname} from "next/navigation";
import {GoHome} from "react-icons/go";
import Lheader from "@/components/sidebar/library-header";
import LPlaylist from "@/components/sidebar/library-playlist";
import Lcontainer from "@/components/sidebar/lbirary-container";

interface SidebarProps {
    className?: string;
}

export default function Sidebar({className}: SidebarProps) {
    const pathname = usePathname();
    const path = pathname !== '/login' && pathname !== '/signup';

    const routes = useMemo(() => [
        {
            icon: GoHome,
            label: 'Home',
            active: pathname !== '/search',
            href: '/'
        }
    ], [pathname]);

    return (
        <>
            {path && (
                <aside className={`
                    bg-black
                    md:w-[27rem]
                    w-[5rem]
                    h-full
                    rounded-xl
                    flex
                    pl-1
                    flex-col
                    gap-2
                    overflow-x-hidden
                    ${className}
                `}>
                    <Box className={`
                        md:p-4
                    `}>
                        <Lheader/>
                    </Box>
                    <Box className={'h-full'}>
                        <div className={`
                            h-full
                            w-full
                            md:pl-4
                        `}>


                            {/*    Playlists   */}
                            <Lcontainer>
                                <LPlaylist/>
                                <LPlaylist/>
                                <LPlaylist/>
                                <LPlaylist/>
                                <LPlaylist/>
                                <LPlaylist/>
                                <LPlaylist/>
                                <LPlaylist/>
                                <LPlaylist/> <LPlaylist/>
                                <LPlaylist/>
                                <LPlaylist/>
                                <LPlaylist/>
                                <LPlaylist/>
                                <LPlaylist/> <LPlaylist/>
                                <LPlaylist/>
                                <LPlaylist/>
                                <LPlaylist/>
                                <LPlaylist/>
                                <LPlaylist/> <LPlaylist/>
                                <LPlaylist/>
                                <LPlaylist/>
                                <LPlaylist/>
                                <LPlaylist/>
                                <LPlaylist/>
                            </Lcontainer>
                        </div>
                    </Box>
                </aside>
            )}
        </>
    );
}
