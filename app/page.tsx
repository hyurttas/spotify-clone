'use client'
import Main from "@/components/main/main";
import HeaderButton from "@/components/main/header-buttons";
import RecContainer from "@/components/main/recommended/recContainer";
import Recplaylist from "@/components/main/recommended/recommended";

export default function Home() {

    return (
        <Main className={`main-bg`}>
            {/*playlists*/}
            <section className={'flex w-full items-center'}>
                <div className={`
                flex 
                pt-4
                w-full
                flex-wrap
                items-center
                justify-center
                gap-x-2
                gap-y-[7px]
                mx-auto
              `}>
                    <HeaderButton active={true}/>
                    <HeaderButton active={true}/>
                    <HeaderButton active={true}/>
                    <HeaderButton active={true}/> <HeaderButton active={true}/>
                    <HeaderButton active={true}/> <HeaderButton active={true}/>
                    <HeaderButton active={true}/>
                </div>
            </section>

            {/*  sugessted playlists  */}
            <section>
                <RecContainer title={'Made for hsy'}>
                    <Recplaylist/>
                    <Recplaylist/>
                    <Recplaylist/>
                    <Recplaylist/>
                    <Recplaylist/>
                    <Recplaylist/>
                    <Recplaylist/>
                    <Recplaylist/>
                </RecContainer><RecContainer title={'Made for hsy'}>
                <Recplaylist/>
                <Recplaylist/>
                <Recplaylist/>
                <Recplaylist/>
                <Recplaylist/>
                <Recplaylist/>
                <Recplaylist/>
                <Recplaylist/>
            </RecContainer><RecContainer title={'Made for hsy'}>
                <Recplaylist/>
                <Recplaylist/>
                <Recplaylist/>
                <Recplaylist/>
                <Recplaylist/>
                <Recplaylist/>
                <Recplaylist/>
                <Recplaylist/>
            </RecContainer>

            </section>

        </Main>
    );
}
