import Link from "next/link";

export default function Page() {
  const imageRandom = Math.floor(Math.random() * (13 - 1 + 1)) + 1;
  const popularDestinations = [
    {
      city: "Tajrish",
      imageUrl: "/img/landing/tajrish.jpg",
      imageAlt: "Tajrish in Iran",
      description: "in Iran",
      propertyCount: 115,
    },
    {
      city: "Restaurant",
      imageUrl: "/img/landing/restaurant.jpg",
      imageAlt: "Restaurant in Malibu",
      description: "in Malibu",
      propertyCount: 67,
    },
    {
      city: "In Car",
      description: "Car in London",
      propertyCount: 250,
      imageUrl: "/img/landing/london.jpg",
      imageAlt: "Car in London",
    },
    {
      city: "Chicago",
      description: "Chicago in Tower",
      propertyCount: 63,
      imageUrl: "/img/landing/chicago.jpg",
      imageAlt: "chicago in Tower",
    },
    {
      city: "Seattle",
      description: "Seattle in Beach",
      propertyCount: 47,
      imageUrl: "/img/landing/seattle.jpg",
      imageAlt: "Seattle in Beach",
    },
    {
      city: "Rome",
      description: "Rome in Italy",
      propertyCount: 30,
      imageUrl: "/img/landing/rome.jpg",
      imageAlt: "Rome in Italy",
    },
  ];

  const destinationImgSizeClasses = {
    height: "h-32",
    width: "w-32",
  };
  return (
    <div>
      <div className="bg-gray-100 grid lg:grid-cols-2 2xl:grid-cols-5">
        <div className="px-8 py-12 max-w-md mx-auto sm:max-w-xl lg:px-12 lg:py-24 lg:max-w-full xl:mr-0 2xl:col-span-2">
          <div className="xl:max-w-xl">
            <img className="h-10" src="/img/logo.svg" alt="VasatYab" />
            <img
              className="mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-64 sm:w-full sm:object-cover object-center lg:hidden"
              src={`/img/landing/baner/${imageRandom}.jpg`}
              alt="baner"
            />
            <h1 className="mt-6 text-2xl font-headline tracking-tight font-semibold text-gray-900 sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl">
              Find the perfect meeting spot.
              <br className="hidden lg:inline" />{" "}
              <span className="text-brand">The midpoint calculator</span>
            </h1>
            <p className="mt-2 text-gray-600 sm:mt-4 sm:text-xl">
              Never fight over location again! VasatYab instantly finds the
              perfect meeting spot for you and your friends.
            </p>
            <div className="mt-4 space-x-1 sm:mt-6">
              <Link
                className="inline-block px-5 py-3 rounded-lg transform transition bg-brand hover:bg-brand-light hover:-translate-y-0.5 focus:ring-brand focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 active:bg-brand-dark uppercase tracking-wider font-bold text-sm text-white shadow-lg sm:text-base"
                href="/auth/login">
                start using
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden relative lg:block 2xl:col-span-3">
          <img
            className="absolute inset-0 w-full h-full object-cover object-center"
            src={`/img/landing/baner/${imageRandom}.jpg`}
            alt="baner"
          />
        </div>
      </div>
      <div className="max-w-md sm:max-w-xl lg:max-w-6xl mx-auto px-8 lg:px-12 py-8">
        <h2 className="text-xl text-gray-900">Popular destinations</h2>
        <p className="mt-2 text-gray-600">
          Simply enter two addresses, and we'll find the exact geographical
          midpoint, No matter where are you.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {popularDestinations.map((destination) => (
            <div
              className="flex items-center rounded-lg bg-white shadow-lg overflow-hidden"
              key={destination.city}>
              <img
                className={`${destinationImgSizeClasses.height} ${destinationImgSizeClasses.width} flex-shrink-0`}
                src={destination.imageUrl}
                alt={destination.imageAlt}
              />
              <div className="px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {destination.city}
                </h3>

                <p className="text-gray-600">{destination.description}</p>
                <div className="mt-4">
                  <Link
                    href="/auth/login"
                    className="text-brand-dark hover:text-brand font-semibold text-sm">
                    Explore {destination.propertyCount} properties
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
