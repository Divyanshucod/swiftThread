import { Companies } from "@/components/CompanySection/Companies";
import { MainSection } from "@/components/MainSection/MainSection";
import { Products } from "@/components/ProductsSection/Products";
import PromoSection from "@/components/PromoSection/PromoSection";
import { TrendingCategory } from "@/components/TrendingCategory/TrendingSection";


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
    <MainSection/>
    <TrendingCategory/>
    <Companies/>
    <PromoSection backgroundImage={'/backgroundImage.jpg'}/>
    <Products/>
    </div>
  );
}
