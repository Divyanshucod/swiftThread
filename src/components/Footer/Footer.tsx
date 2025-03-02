import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="relative mt-16 bg-deep-purple-accent-400 text-white">
      <svg
        className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-deep-purple-accent-400"
        preserveAspectRatio="none"
        viewBox="0 0 1440 54"
      >
        <path
          fill="currentColor"
          d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
        />
      </svg>
      <div className="px-4 pt-12 mx-auto max-w-screen-xl md:px-8 lg:px-16">
        <div className="grid gap-10 mb-8 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2 text-center md:text-left">
            <Link href="/" className="inline-flex items-center justify-center md:justify-start">
              <Image src="/PlatformLogo.png" alt="Company Logo" width={50} height={50} />
              <span className="ml-2 text-xl font-bold tracking-wide uppercase text-gray-400">
                Company
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Delivering convenience with style. Get your favorite fashion pieces delivered instantly.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:col-span-4">
            {[
              { title: "Category", links: ["News", "World", "Games", "References"] },
              { title: "Services", links: ["Web", "eCommerce", "Business", "Portfolio"] },
              { title: "Resources", links: ["Media", "Brochure", "Educational", "Projects"] },
              { title: "Company", links: ["About", "Careers", "Contact", "Blog"] },
            ].map((section, index) => (
              <div key={index} className="text-center md:text-left">
                <p className="font-semibold tracking-wide text-teal-400">{section.title}</p>
                <ul className="mt-2 space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href="/"
                        className="transition-colors duration-300 text-gray-500 hover:text-teal-400"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between pt-5 border-t border-gray-600 sm:flex-row">
          <p className="text-sm text-gray-600 text-center sm:text-left">
            © {new Date().getFullYear()} Company Inc. All rights reserved.
          </p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            {["/twitter.png", "/instagram.png", "/facebook.png"].map((icon, index) => (
              <Link key={index} href="/" className="hover:opacity-75">
                <Image src={icon} alt="Social Media Icon" width={24} height={24} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};