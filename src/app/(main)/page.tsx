import { Hero } from "./_components/hero";
import { FeaturesCarousel } from "./_components/features-carousel";

const MainPage = () => {
  return (
    <main className="mx-auto w-full min-h-full h-full" style={{ padding: "0 round(up, 7.22223%, .2rem)" }}>
      <div className="max-w-[1252px] m-auto w-full flex flex-col xl:gap-7">
        <Hero />
        <FeaturesCarousel />
      </div>
    </main>
  );
}

export default MainPage;