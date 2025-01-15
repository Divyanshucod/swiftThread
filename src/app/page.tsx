import { MainSection } from "@/components/MainSection/MainSection";
import { TrendingCategory } from "@/components/TrendingCategory/TrendingSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
    <MainSection/>
    <TrendingCategory/>
    </div>
  );
}
