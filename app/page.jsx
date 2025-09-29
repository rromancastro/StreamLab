import { NavBar, NavBarMobile } from "./components";
import { EighthSection, FifthSection, FirstSection, FourthSection, SecondSection, SeventhSection, SixthSection, ThirdSection, ThirdSectionMobile } from "./sections";
import { NinthSection } from "./sections/NinthSection";

export default function Home() {


    return (<>
        <NavBar />
        <NavBarMobile />
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <ThirdSectionMobile />
        <FourthSection />
        <FifthSection />
        <SixthSection />
        <SeventhSection />
        <EighthSection />
        <NinthSection />
    </>)
}
