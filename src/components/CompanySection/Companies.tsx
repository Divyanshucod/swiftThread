import CompanyCard from "./CompanyCard";

export function Companies() {
  const companies = [
    { name: 'Puma', logo: '/puma.png', deliveryInfo: 'Delivery within 24 hours' },
    { name: 'Peter England', logo: '/peter_england.jpg', deliveryInfo: 'Delivery within 24 hours' },
    { name: 'Adidas', logo: '/adidas.png', deliveryInfo: 'Delivery within 24 hours' },
    { name: 'H & M', logo: '/h_m.png', deliveryInfo: 'Delivery within 24 hours' },
    { name: 'Gucci', logo: '/gucci.jpg', deliveryInfo: 'Delivery within 24 hours' },
    { name: 'Zara', logo: '/zara.png', deliveryInfo: 'Delivery within 24 hours' },
    { name: 'Allen Solly', logo: '/allen_solly.png', deliveryInfo: 'Delivery within 24 hours' },
    { name: 'Nike', logo: '/nike.png', deliveryInfo: 'Delivery within 24 hours' },
  ];

  return (
    <section className="bg-gray-100 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Choose By Company</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 container mx-auto px-4">
        {companies.map((company, index) => (
          <CompanyCard key={index} name={company.name} logo={company.logo} deliveryTime={company.deliveryInfo} />
        ))}
      </div>
    </section>
  );
}