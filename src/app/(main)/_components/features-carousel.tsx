"use client";

import Image from "next/image";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { buttons, images } from "@/contants";

import { Button } from "@/components/ui/button";

export const FeaturesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  }

  const currentImage = images[currentIndex]; 

  return (
    <section className="grid grid-cols-12 gap-7 gap-y-[50px] w-full items-center xl:mt-[30px] mx-auto auto-rows-min">
      <div className="col-span-12 w-full">
        <div className="grid grid-cols-12 auto-rows-min gap-6 w-full">
          <div className="col-span-12 mb-6">
            <div
              className={cn(
                "rounded-xl border border-[#37352f29] overflow-hidden shadow-[0px_4px_18px_#0000000a,0px_2.025px_7.84688px_rgba(0,0,0,0.027),0px_0.8px_2.925px_#00000005,0px_0.175px_1.04062px_rgba(0,0,0,0.013)] w-full h-full block mx-auto transition-all",
              )}
            >
              <Image
                src={currentImage.image.src}
                alt={currentImage.label}
                width={1280}
                height={800}
                className="block w-full h-auto object-cover"
              />
            </div>
          </div>
          <div className="col-span-12 mb-6">
            <div className="flex flex-wrap flex-row items-center justify-center gap-2 overflow-hidden">
              {buttons.map(({ label, icon: Icon }, index) => (
                <Button
                  key={label}
                  size="lg"
                  onClick={() => goToSlide(index)}
                  variant={currentIndex === index ? "primary" : "ghost"}
                  className={cn(
                    "dark:hover:bg-[#37352f0f] dark:text-[#1a1a1a]",
                    currentIndex === index ? "dark:text-white" : "dark:text-[#1a1a1a]",
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}