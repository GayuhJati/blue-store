import Image from "next/image";
import React from "react";

type CardArticleProps = {
  data: {
    thumbnail: string;
    title: string;
    content: string;
    author: string;
  };
};

export const CardArticle = ({ data }: CardArticleProps) => {
  return (
    <div className="max-h-lg bg-white border border-gray-200 rounded-lg shadow-sm h-[400px] w-[350px]">
      <a href="#" className="flex flex-col">
        <div className="relative h-[250px] w-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.thumbnail}`}
            alt="image book"
            fill
            className="object-cover" 
          />
        </div>
        <div className="p-2 w-[300px]">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 text-justify">
            {data.title ? data.title : "Article Title Not Available"}
          </h5>
        </div>
      </a>
    </div>
  );
};
