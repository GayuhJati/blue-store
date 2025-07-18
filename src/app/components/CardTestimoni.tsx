import React from "react";

type CardTestimoniProps = {
  data: {
    text: string;
    name: string;
    rating: number;
  };
};

export const CardTestimoni = ({data}:CardTestimoniProps) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm h-[200px] flex flex-col items-center justify-center ">
      <div className="p-2 w-[250px] flex flex-col items-center gap-2">
        <div className="text-center italic text-sm text-zinc-500 font-medium">"{data.text}"</div>
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
          {data.name ? data.name : "Book Title Not Available"}
        </h5>
        <div className="flex items-center">
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ms-1 ${
                i < data.rating ? "text-yellow-300" : "text-gray-300"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
};
