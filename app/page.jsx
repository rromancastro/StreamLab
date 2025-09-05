import { NavBar } from "./components";
import { EighthSection, FifthSection, FirstSection, FourthSection, SecondSection, SeventhSection, SixthSection, ThirdSection } from "./sections";
import { NinthSection } from "./sections/NinthSection";

export default function Home() {


    return (<>
        <NavBar />
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <FourthSection />
        <FifthSection />
        <SixthSection />
        <SeventhSection />
        <EighthSection />
        <NinthSection />
    </>)
}
