// PromoSection.tsx
type PromoSectionProps = {
  backgroundImage: string;
};

export default function PromoSection({ backgroundImage }: PromoSectionProps) {
  return (
    <section
      className="relative bg-cover bg-center text-white py-16"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-4xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-4">Get 5% Cash Back On $200</h2>
        <p className="text-lg mb-6">
          Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.
        </p>
        <button className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
          Learn More
        </button>
      </div>
    </section>
  );
}
