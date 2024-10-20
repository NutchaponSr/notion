import { auth } from "@/auth";
import { Hero } from "./_components/hero";
import { FeaturesCarousel } from "./_components/features-carousel";

const HomePage = async () => {
  const session = await auth();

  if (session) {
    return (
      <div>
        {JSON.stringify(session)}
      </div>
    );
  }

  return (
    <>
      <Hero />
      <FeaturesCarousel />
    </>
  );
}

export default HomePage;