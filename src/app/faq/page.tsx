import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Metadata } from "next";
import Image from "next/image";
import faq from '../../../public/faq.png';
import Link from "next/link";

export const metadata: Metadata = {
  title: "IVHub | FAQ",
  description: "IVHub by weks (tg @CeoWEKS)",
};

export default function FAQ() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="p-[45px] overflow-hidden relative w-full h-auto bg-[var(--color3)] rounded-[12px] flex flex-col items-center justify-center gap-y-[10px]">
        <Image src={faq} alt="FAQ" className="absolute w-full h-full object-cover" />
        <h1 className="z-[1] font-[500] text-[34px] font-[Unbounded] text-center text-[var(--white)]">Информация для студентов</h1>
        <p className="z-[1] font-[300] text-[14px] font-[Unbounded] text-center text-[var(--white)]">Доска — это место, где ученики любого курса могут найти нужный вопрос</p>
      </div>
      <div className="w-full h-[2px] bg-[var(--color3)]"></div>
      <div className="w-full grid grid-cols-2 gap-x-[15px] gap-y-[25px]">
        <Link href="/faq/1" className="cursor-pointer p-[10px] flex flex-col items-start gap-y-[20px] bg-[var(--color3)] rounded-[12px] border-[1px] border-[#FFFFFF1A]">
            <h2 className="font-[400] text-[14px] font-[Unbounded] text-[var(--white)]">Учебный процесс и расписание</h2>
            <span className="font-[200] text-[12px] font-[Unbounded] text-[var(--white)] opacity-[0.8]">25 постов</span>
        </Link>
        <Link href="/faq/1" className="cursor-pointer p-[10px] flex flex-col items-start gap-y-[20px] bg-[var(--color3)] rounded-[12px] border-[1px] border-[#FFFFFF1A]">
            <h2 className="font-[400] text-[14px] font-[Unbounded] text-[var(--white)]">Учебный процесс и расписание</h2>
            <span className="font-[200] text-[12px] font-[Unbounded] text-[var(--white)] opacity-[0.8]">25 постов</span>
        </Link>
        <Link href="/faq/1" className="cursor-pointer p-[10px] flex flex-col items-start gap-y-[20px] bg-[var(--color3)] rounded-[12px] border-[1px] border-[#FFFFFF1A]">
            <h2 className="font-[400] text-[14px] font-[Unbounded] text-[var(--white)]">Учебный процесс и расписание</h2>
            <span className="font-[200] text-[12px] font-[Unbounded] text-[var(--white)] opacity-[0.8]">25 постов</span>
        </Link>
        <Link href="/faq/1" className="cursor-pointer p-[10px] flex flex-col items-start gap-y-[20px] bg-[var(--color3)] rounded-[12px] border-[1px] border-[#FFFFFF1A]">
            <h2 className="font-[400] text-[14px] font-[Unbounded] text-[var(--white)]">Учебный процесс и расписание</h2>
            <span className="font-[200] text-[12px] font-[Unbounded] text-[var(--white)] opacity-[0.8]">25 постов</span>
        </Link>
      </div>
      </div>
      <Footer active3={true}/>
    </div>
  );
}