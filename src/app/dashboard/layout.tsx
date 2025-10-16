"use client"
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const tabs = [
    { name: "Лента", href: "/dashboard/ribbon" },
    { name: "Профиль", href: "/dashboard/profile" },
  ];
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div>
      <Header />
      <div className="px-0">
        <div className="relative flex rounded-[5px] justify-around border border-[#003A73] h-[45px] bg-white p-1 w-full overflow-hidden">
          {tabs.map((tab) => {
            const isActive =
              pathname === tab.href ||
              (tab.href === "/dashboard/ribbon" && pathname === "/dashboard");

            return (
              <button
                key={tab.href}
                onClick={() => router.push(tab.href)}
                className={`relative z-10 flex-1 h-full cursor-pointer text-[15px] font-light transition-colors rounded-[5px] ${isActive ? "text-white" : "text-black"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute top-0 left-0 w-full h-full bg-[#003A73] rounded-[5px] z-0"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.name}</span>
              </button>
            );
          })}
        </div>

        <div className='w-full h-[4px] my-[16px] rounded-[9px] bg-[var(--color3)]'></div>

        <div>{children}</div>
      </div>
      <Footer active4={true} />
    </div>
  );
}
