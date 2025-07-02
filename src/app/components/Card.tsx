import Image from "next/image";
import React from "react";

type CardProps = {
    data: {
      image: string;
    };
  };

export const Card = ({data}:CardProps) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
      <a href="#">
        <Image
          src={`http://toko-biru.test/storage/${data.image}`}
          alt="image book"
          className="rounded-t-lg"
        />
      </a>
    </div>
  );
};
