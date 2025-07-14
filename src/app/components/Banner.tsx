"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Loading } from "./Loading";
import { type CarouselApi } from "@/components/ui/carousel";

interface Banner {
  id: string;
  image: string;
}

export const Banner = () => {
  const [data, setData] = useState<Banner[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const goToSlide = (index: number) => {
    if (api) {
      api.scrollTo(index); 
      setCurrent(index); 
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/banners`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="w-full mx-auto p-5 bg-white shadow-md rounded-md">
      <Carousel
        plugins={[
          Autoplay({
            delay: 10000,
          }),
        ]}
        opts={{
          loop: true,
        }}
        setApi={setApi}
      >
        <CarouselContent className="flex items-center">
          {data.length > 0 ? (
            data.map((banner, index) => (
              <CarouselItem key={index} className="w-full flex justify-center">
                <Image
                  key={banner.id}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${banner.image}`}
                  alt="Banner"
                  width={1400}
                  height={250}
                  className=" object-cover mb-4 rounded"
                />
              </CarouselItem>
            ))
          ) : (
            <div className="w-full flex justify-center items-center p-10">
              <Loading />
            </div>
          )}
        </CarouselContent>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2">
          {data.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                current === index ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </Carousel>
    </div>
  );
};
