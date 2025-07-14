"use client";
import React, { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { Card } from "../components/Card";
import { useSearchParams } from "next/navigation";

interface Item {
  id: string;
  photo: string;
  name: string;
  price: number;
}

const page = () => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const type = searchParams.get("type"); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/items`;

        if (type === "trending") {
          url += "/trending";
        } else if (type === "new") {
          url += "/new-arrival"; 
        }

        const res = await fetch(url);
        const result = await res.json();
        setData(result);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [type]);

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Semua Buku</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data.length > 0 ? (data.map((item) => (
            <Card
              key={item.id}
              data={{
                name: item.name,
                price: item.price,
                image: item.photo,
              }}
            />
          ))) : (
            <div className="col-span-4 text-center p-[250px] bg-zinc-100">
              <p className="text-gray-500">Tidak ada buku yang ditemukan.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default page;
