"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { useCart } from "@/context/CartContext";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Image from "next/image";
import getUserCurrency from "@/services/currrencyService";
import { currencyData } from "@/data/currencyData";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

export function CourseCard({
  id,
  title,
  description,
  imageUrl,
  price,
}: CourseCardProps) {
  const router = useRouter();
  // const { handleAddToCart } = useCart();

  const [convertedPrice, setConvertedPrice] = useState<number>(price);
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  useEffect(() => {
    const fetchCurrency = async () => {
      const userCurrency = await getUserCurrency();
      const { symbol, converter } = currencyData[userCurrency || "US"];

      setCurrencySymbol(symbol);
      setConvertedPrice(price * converter);
    };

    fetchCurrency();
  }, [price]);

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-darkKnight-navbarBg dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {description}
        </CardItem>
        <CardItem
          translateZ="100"
          className="w-full mt-4 cursor-pointer"
          onClick={() => router.push(`/courses/${id}`)}
        >
          <Image
            src={imageUrl}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            className="px-4 py-2 rounded-xl text-2xl font-bold dark:text-darkKnight-text"
          >
            {currencySymbol}
            {convertedPrice.toFixed(2)}
          </CardItem>
          {/* <CardItem
            translateZ={20}
            as="button"
            onClick={() =>
              handleAddToCart({
                id,
                title,
                originalPrice: price,
                price: convertedPrice,
                imageUrl,
                instructor,
                rating,
                reviews,
                duration,
                lectures,
                level,
                currencySymbol,
              })
            }
            className="px-4 py-2 rounded-xl text-lg font-bold dark:text-darkKnight-text"
          >
            Add to Cart
          </CardItem> */}
        </div>
      </CardBody>
    </CardContainer>
  );
}
