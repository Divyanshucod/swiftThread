// companyCard.tsx
import Image from 'next/image';
import Link from 'next/link';

type CompanyCardProps = {
  name: string;
  logo: string;
  deliveryTime: string;
};

export default function CompanyCard({ name, logo, deliveryTime }: CompanyCardProps) {
  return (
    <Link href={`/products/query?brand=${name}`} className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
      <Image src={logo} alt={`${name} logo`} width={80} height={80} className="mb-2" />
      <h3 className="text-lg font-bold text-center">{name}</h3>
      <p className="text-sm text-gray-500">{deliveryTime}</p>
    </Link>
  );
}
