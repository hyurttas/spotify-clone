import Main from "@/components/main/main";
import PHeader from "@/components/profile/header";
import RecContainer from "@/components/main/recommended/recContainer";
import RecProfile from "@/components/main/recommended/recProfile";

export default function Page() {
    return (
        <Main>
            <PHeader/>
            <RecContainer title={'Top Artist this month'}>
                <RecProfile/>
                <RecProfile/>
                <RecProfile/>
                <RecProfile/>
                <RecProfile/>
                <RecProfile/>
                <RecProfile/>
            </RecContainer>
        </Main>
    )
}