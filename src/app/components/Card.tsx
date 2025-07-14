import Image from "next/image";
import React from "react";

type CardProps = {
  data: {
    image: string;
    name?: string;
    price?: number;
  };
};

export const Card = ({ data }: CardProps) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm h-[300px]">
      <a href="#">
        <div className="flex items-center justify-center p-5 h-[180px]">
          <Image
            width={100}
            height={150}
            src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.image}`}
            alt="image book"
          />
        </div>
        <div className="p-2 w-[200px]">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
            {data.name ? data.name : "Book Title Not Available"}
          </h5>
          <span className="text-lg text-gray-900">
            Rp{" "}
            {data.price
              ? Number(data.price).toLocaleString("id-ID")
              : "Price Not Available"}
          </span>
        </div>
      </a>
    </div>
  );
};
