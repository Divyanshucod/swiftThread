import Image from "next/image";

export const Footer = () => {
  return (
    <div className="relative mt-16 bg-deep-purple-accent-400">
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
      <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          <div className="md:max-w-md lg:col-span-2">
            <a
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <Image
                src="/PlatformLogo.png" // Replace this with your logo path
                alt="Company Logo"
                width={50}
                height={50}
              />
              <span className="ml-2 text-xl font-bold tracking-wide text-gray-600 uppercase">
                Company
              </span>
            </a>
            <div className="mt-4 lg:max-w-sm">
              <p className="text-sm text-deep-purple-50">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam.
              </p>
              <p className="mt-4 text-sm text-deep-purple-50">
                Eaque ipsa quae ab illo inventore veritatis et quasi architecto
                beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
            {[
              {
                title: "Category",
                links: ["News", "World", "Games", "References"],
              },
              {
                title: "Cherry",
                links: ["Web", "eCommerce", "Business", "Entertainment", "Portfolio"],
              },
              {
                title: "Apples",
                links: ["Media", "Brochure", "Nonprofit", "Educational", "Projects"],
              },
              {
                title: "Business",
                links: ["Infopreneur", "Personal", "Wiki", "Forum"],
              },
            ].map((section, index) => (
              <div key={index}>
                <p className="font-semibold tracking-wide text-teal-accent-400">
                  {section.title}
                </p>
                <ul className="mt-2 space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="/"
                        className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-deep-purple-accent-200 sm:flex-row">
          <p className="text-sm text-gray-400">
            © Copyright 2020 Lorem Inc. All rights reserved.
          </p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            {["/twitter.png", "/instagram.png", "/facebook.png"].map((icon, index) => (
              <a
                key={index}
                href="/"
                className="transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400"
              >
                <Image
                  src={icon} // Replace these with your social media icon paths
                  alt="Social Media Icon"
                  width={24}
                  height={24}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
