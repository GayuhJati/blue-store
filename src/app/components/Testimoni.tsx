"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from "lucide-react";
import React, { useEffect, useState } from "react";
import { CardTestimoni } from "./CardTestimoni";

export const Testimoni = () => {
  interface Testimoni {
    id: string;
    message: string;
    name: string;
    rating: number;
  }
  const [data, setData] = useState<Testimoni[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/testimoni`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-5 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Testimoni</h1>
      <div className="flex justify-center mb-4">
        <Carousel className="w-full max-w-6xl flex items-center">
          <CarouselContent className="-ml-1">
            {data.length > 0 ? (
              data.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-1 basis-1/2 md:basis-1/3 "
                >
                  <div
                    className="p-4  duration-300 ease-in-out w-fit"
                    key={item.id}
                  >
                    <CardTestimoni
                      key={item.id}
                      data={{
                        name: item.name,
                        text: item.message,
                        rating: item.rating,
                      }}
                    />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <div>
                <p className="text-center">Tidak ada Buku yang ditemukan</p>
              </div>
            )}
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
      </div>
    </div>
  );
};
