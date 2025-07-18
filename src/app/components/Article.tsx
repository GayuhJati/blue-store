"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import React from "react";
import { CardArticle } from "./CardArticle";

export const Article = () => {
  interface Item {
    id: string;
    title: string;
    content: string;
    thumbnail: string;
    author: string;
  }

  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/articles`
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
  return (
    <div className="max-w-7xl mx-auto p-5 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Our Article</h1>
      <div className="flex justify-center mb-4">
        <Carousel className="w-full max-w-6xl flex items-center">
          <CarouselContent className="-ml-1">
            {data.length > 0 ? (
              data.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <div
                    className="p-4 transition-all duration-300 ease-in-out hover:scale-105 w-fit"
                    key={item.id}
                  >
                    <CardArticle
                      key={item.id}
                      data={{
                        thumbnail: item.thumbnail,
                        title: item.title,
                        content: item.content,
                        author: item.author,
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
      <div className="p-2 flex justify-center">    
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            View More
          </button>
      </div>
    </div>
  );
};
