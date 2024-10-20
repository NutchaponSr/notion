import Link from "next/link";
import Image from "next/image";
import HeroIllo from "../../../../public/hero-illo.png";

import {logoTicker } from "@/contants";

import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="grid grid-cols-12 gap-7 w-full items-center mt-[30px] mx-auto auto-rows-min">
      <div className="flex flex-col gap-4 xl:col-span-5 md:col-span-8 md:col-start-3 col-span-12">
        <h1 className="md:text-7xl text-5xl font-semibold tracking-tight text-balance xl:text-left sm:text-center text-left">
          Drive Success with Precision.
        </h1>
        <h2 className="text-2xl font-medium xl:text-left sm:text-center text-left">
          Empower your organization with tailored strategies and actionable insights.
        </h2>
        <div className="flex xl:flex-row md:flex-row flex-col gap-2 w-full xl:justify-start justify-center sm:items-center">
          <Button size="xl" variant="primary" className="text-base" asChild>
            <Link href="/sign-in">
              Get Started
            </Link>
          </Button>
          <Button size="xl" variant="tritrary" className="text-base" asChild>
            <Link href="/contact-admins">
              Contact admins
            </Link>
          </Button>
        </div>
        <div className="mt-6 max-w-full flex flex-col gap-2">
          <span className="text-[#999] font-medium xl:text-left text-center">Trusted by teams at</span>
          <div className="flex flex-nowrap justify-between items-center">
            {logoTicker.map((logo, index) => (
              <Image 
                key={index}
                src={logo.src}
                alt={logo.src}
                width={100}
                height={28}
                className="h-7 md:w-[98px] w-[64px] block"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="xl:col-span-7 col-span-12 xl:self-end self-center">
        <Image 
          src={HeroIllo.src}
          alt="Hero"
          width={640}
          height={100}
          className="block sm:w-[520px] w-[360px] xl:w-full object-cover xl:ml-auto mx-auto max-w-[640px]"
        />
      </div>
    </section>
  );
}