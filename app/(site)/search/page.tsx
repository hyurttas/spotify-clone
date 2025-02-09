import Main from "@/components/main/main";
import SContainer from "@/components/serach/search-container";
import genres from "@/components/genre";
import SBox from "@/components/serach/serach-box";

export default function Page() {

    return (
        <Main>
            <SContainer>
                {
                    genres.map((e, index) => (
                        <SBox key={index} label={e}/>
                    ))
                }
            </SContainer>
        </Main>
    )
}
