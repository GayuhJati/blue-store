"use client"
import { useEffect, useState } from "react";
import React from 'react'
import { Card } from "./Card";
import { Loading } from "./Loading";

export const Collection = () => {
    interface Item {
      id: string;
      image: string;
    }

    const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}items`);
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
    <div className="max-w-7xl mx-auto px-4">
        {data.length > 0 ? (
        data.map((item) => (
          <Card
            key={item.id}
            data={{
              image: item.image,
            }}
          />
        ))
      ) : (
        <Loading/>
      )}
    </div>
  )
}
