import { Calendar } from "@/components/calendar";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Subject } from "@/components/subject";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IVHub | Schedule",
  description: "IVHub by weks (tg @CeoWEKS)",
};

export default function Schedule() {
  return (
    <div>
      <Header />
      <div className="container">
        <Calendar />
        <div className="w-full h-[3px] bg-[var(--color3)]"></div>
        <span className="font-[400] text-[14px] font-[Montserrat] text-[var(--black)]">Сегодня: <span className="font-[700] text-[14px] font-[Montserrat] text-[var(--color3)]">4 пары</span></span>
        <Subject />
        <Subject />
        <Subject />
        <Subject />
      </div>
      <Footer active2={true} />
    </div>
  );
}