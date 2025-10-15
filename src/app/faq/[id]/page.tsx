import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Metadata } from "next";
import Image from "next/image";
import faq from "../../../../public/faq.png";
import React from "react";
import { List } from "@/components/list";

export const metadata: Metadata = {
  title: "IVHub | FAQ",
  description: "IVHub by weks (tg @CeoWEKS)",
};

export default function FAQ({ params }: { params: { id: number }; }) {
const id = params.id;

  return (
    <div>
      <Header />
      <div className="container">
        <div className="p-[70px] overflow-hidden relative w-full h-auto bg-[var(--color3)] rounded-[12px] flex flex-col items-center justify-center gap-y-[10px]">
          <Image
            src={faq}
            alt="FAQ"
            className="absolute w-full h-full object-cover"
          />
          <h1 className="z-[1] font-[500] text-[29px] font-[Unbounded] text-center text-[var(--white)]">
            Учебный процесс и расписание
          </h1>
        </div>
        <div className="w-full h-[2px] bg-[var(--color3)]"></div>
        <List />
        <List />
        <List />
      </div>
      <Footer active3={true} />
    </div>
  );
}
