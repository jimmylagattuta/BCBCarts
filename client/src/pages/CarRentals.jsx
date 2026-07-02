import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import FooterComponent from "../sections/FooterComponent";
import Contact from "./main/Contact";

const CarRentals = () => {
  const pageUrl = "https://www.bcbcarts.com/car-rentals";
  const turoClickEndpoint = "/api/turo-clicks";

  const cars = [
    {
      id: "ford-mustang",
      name: "Ford Mustang",
      year: "Ford Mustang",
      category: "Sporty Rental Car",
      image:
        "https://res.cloudinary.com/djtsuktwb/image/upload/v1753832728/IMG_1907_smsgnv.jpg",
      imagePosition: "center center",
      description:
        "Take a cruise down the coast in style. A great choice for weekend trips, beach drives, date nights, and visitors who want something more fun than a basic rental car.",
      highlights: [
        "Great for beach drives",
        "Fun weekend rental",
        "Book directly through Turo",
        "Local Long Beach support"
      ],
      link:
        "https://turo.com/us/en/car-rental/united-states/long-beach-ca/ford/mustang/3287420"
    },
    {
      id: "gray-dodge-grand-caravan",
      name: "Gray Dodge Grand Caravan",
      year: "Dodge Grand Caravan",
      category: "7-Seat Minivan",
      image:
        "https://res.cloudinary.com/djtsuktwb/image/upload/v1753832966/IMG_1869_j15ycp.jpg",
      imagePosition: "center center",
      description:
        "Spacious, practical, and reliable. A strong option for families, airport trips, group transportation, beach days, errands, luggage, and hauling gear around Long Beach.",
      highlights: [
        "Seats up to 7 passengers",
        "Great for families and groups",
        "Good for luggage and gear",
        "Book directly through Turo",
        "Local Long Beach pickup"
      ],
      link:
        "https://turo.com/us/en/minivan-rental/united-states/long-beach-ca/dodge/grand-caravan/3277933"
    },
    {
      id: "white-dodge-grand-caravan",
      name: "White Dodge Grand Caravan",
      year: "2014 Dodge Grand Caravan",
      category: "White 7-Seat Minivan",
      image:
        "https://res.cloudinary.com/djtsuktwb/image/upload/v1781722540/aMfVVoaKTBalael-uOHn8w_fljuvx.avif",
      imagePosition: "center center",
      description:
        "A clean white 7-seat Dodge Grand Caravan available in Long Beach. Great for families, airport trips, group transportation, beach days, luggage, errands, and local Southern California travel.",
      highlights: [
        "Seats up to 7 passengers",
        "Gas regular",
        "Automatic transmission",
        "Great for families and groups",
        "Good for airport trips and luggage"
      ],
      link:
        "https://turo.com/us/en/minivan-rental/united-states/long-beach-ca/dodge/grand-caravan/3559352"
    },
    {
      id: "nissan-versa-2016",
      name: "Nissan Versa",
      year: "2016 Nissan Versa S",
      category: "Fuel-Efficient Compact Car",
      image:
        "https://res.cloudinary.com/djtsuktwb/image/upload/f_auto,q_auto/v1782830829/IMG_5005_owhaz6",
      imagePosition: "center 5%",
      description:
        "A practical, fuel-efficient compact car available in Long Beach. This 2016 Nissan Versa S seats up to 5 passengers, uses regular gas, gets an estimated 35 MPG, and is a strong choice for errands, commuting, visitors, and simple local transportation.",
      highlights: [
        "Seats up to 5 passengers",
        "Regular gas",
        "Estimated 35 MPG",
        "Manual transmission",
        "Bluetooth and AUX input",
        "Long Beach pickup"
      ],
      link:
        "https://turo.com/us/en/car-rental/united-states/long-beach-ca/nissan/versa/3671270"
    }
  ];

  const rentalGuides = [
    {
      title: "Car Rental Near Downtown Long Beach and 90813",
      description:
        "A location-focused guide for customers searching near Downtown Long Beach, 90813, and nearby neighborhoods.",
      href: "/blog/car-rental-near-downtown-long-beach-90813",
      label: "Downtown / 90813"
    },
    {
      title: "7-Seat Minivan Rental in Long Beach",
      description:
        "A practical guide for families, groups, airport trips, luggage, and Dodge Grand Caravan rental options.",
      href: "/blog/7-seat-minivan-rental-long-beach",
      label: "Minivan Guide"
    },
    {
      title: "Cheap Compact Car Rental in Long Beach",
      description:
        "A budget-friendly guide for Nissan Versa rentals, compact cars, errands, commuting, and fuel-efficient local driving.",
      href: "/blog/cheap-compact-car-rental-long-beach-nissan-versa",
      label: "Compact Car Guide"
    },
    {
      title: "Long Beach Turo Car Rentals",
      description:
        "A broad guide to local Turo rental options through BCB Carts, including the Mustang, Grand Caravan, and Versa.",
      href: "/blog/long-beach-turo-car-rentals",
      label: "Turo Guide"
    }
  ];

  const trackTuroClick = (car) => {
    const payload = {
      event_type: "turo_book_click",
      vehicle_id: car.id,
      vehicle_name: car.name,
      vehicle_year: car.year,
      vehicle_category: car.category,
      destination_url: car.link,
      page_url: window.location.href,
      canonical_page_url: pageUrl,
      referrer: document.referrer || null,
      clicked_at: new Date().toISOString(),
      user_agent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
      timezone_offset_minutes: new Date().getTimezoneOffset(),
      screen: {
        width: window.screen?.width || null,
        height: window.screen?.height || null
      }
    };

    try {
      const body = JSON.stringify(payload);

      if (navigator.sendBeacon) {
        const blob = new Blob([body], {
          type: "application/json"
        });

        navigator.sendBeacon(turoClickEndpoint, blob);
        return;
      }

      fetch(turoClickEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body,
        keepalive: true
      }).catch(() => {});
    } catch (error) {
      // Never block the customer from opening Turo because tracking failed.
    }
  };

  const scrollToContactForm = (event) => {
    event.preventDefault();

    const element = document.getElementById("contactForm");

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      window.history.pushState(null, "", "#contactForm");
    }
  };

  useEffect(() => {
    if (window.location.hash === "#contactForm") {
      const element = document.getElementById("contactForm");

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }, 100);
      }
    }
  }, []);

  const richSnippet = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Car Rentals in Long Beach | BCB Carts Turo Rentals",
        description:
          "Rent a car in Long Beach through BCB Carts on Turo. Browse local options like a Ford Mustang, Dodge Grand Caravan minivans, and a fuel-efficient Nissan Versa with easy booking, clean vehicles, and local support.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.bcbcarts.com/#website",
          name: "BCB Carts",
          url: "https://www.bcbcarts.com"
        },
        about: {
          "@id": "https://www.bcbcarts.com/#localbusiness"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.bcbcarts.com/#localbusiness",
        name: "BCB Carts",
        url: "https://www.bcbcarts.com",
        image:
          "https://res.cloudinary.com/djtsuktwb/image/upload/v1753832966/IMG_1869_j15ycp.jpg",
        areaServed: [
          {
            "@type": "City",
            name: "Long Beach"
          },
          {
            "@type": "State",
            name: "California"
          },
          {
            "@type": "AdministrativeArea",
            name: "Southern California"
          }
        ],
        makesOffer: cars.map((car) => ({
          "@type": "Offer",
          name: `${car.year} rental in Long Beach`,
          url: car.link,
          availability: "https://schema.org/InStock",
          itemOffered: {
            "@type": "Service",
            name: `${car.year} rental through BCB Carts`,
            serviceType: "Car rental",
            description: car.description,
            image: car.image,
            areaServed: {
              "@type": "City",
              name: "Long Beach"
            }
          }
        }))
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#rental-list`,
        name: "BCB Carts Turo Car Rentals in Long Beach",
        description:
          "A list of local Long Beach car rental options from BCB Carts that can be booked through Turo.",
        url: pageUrl,
        numberOfItems: cars.length,
        itemListElement: cars.map((car, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: car.link,
          name: `${car.year} rental in Long Beach`,
          item: {
            "@type": "Service",
            name: `${car.year} rental through BCB Carts`,
            serviceType: "Car rental",
            provider: {
              "@id": "https://www.bcbcarts.com/#localbusiness"
            },
            areaServed: {
              "@type": "City",
              name: "Long Beach"
            },
            image: car.image,
            description: car.description,
            url: car.link
          }
        }))
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#rental-guides`,
        name: "Helpful Long Beach Rental Guides",
        description:
          "Helpful BCB Carts guides about car rentals near Downtown Long Beach, 7-seat minivan rentals, compact car rentals, and Long Beach Turo rentals.",
        url: pageUrl,
        numberOfItems: rentalGuides.length,
        itemListElement: rentalGuides.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `https://www.bcbcarts.com${guide.href}`,
          name: guide.title,
          description: guide.description
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.bcbcarts.com"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Car Rentals",
            item: pageUrl
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Car Rentals in Long Beach | BCB Carts Turo Rentals</title>

        <meta
          name="description"
          content="Rent a car in Long Beach through BCB Carts on Turo. Browse local options like a Ford Mustang, Dodge Grand Caravan minivans, and a fuel-efficient Nissan Versa with easy booking, clean vehicles, and local support."
        />

        <meta
          name="keywords"
          content="Long Beach car rentals, Turo Long Beach, Nissan Versa rental Long Beach, 2016 Nissan Versa rental, Dodge Grand Caravan rental Long Beach, Ford Mustang rental Long Beach, BCB Carts rentals, rent a car Long Beach, minivan rental Long Beach, compact car rental Long Beach, manual transmission rental Long Beach"
        />

        <link rel="canonical" href={pageUrl} />

        <meta
          property="og:title"
          content="Car Rentals in Long Beach | BCB Carts Turo Rentals"
        />
        <meta
          property="og:description"
          content="Browse BCB Carts car rentals in Long Beach and book directly through Turo. Choose from local vehicles like a Ford Mustang, Dodge Grand Caravan minivans, and a Nissan Versa."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/djtsuktwb/image/upload/f_auto,q_auto,c_fill,g_auto,w_1200,h_700/v1782716535/IMG_5018_qgeqo7.heic"
        />

        <script type="application/ld+json">
          {JSON.stringify(richSnippet)}
        </script>
      </Helmet>

      <main className="bg-slate-50">
        <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300 mb-4">
                Long Beach Turo Rentals
              </p>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Car Rentals in Long Beach Through BCB Carts
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-200 leading-relaxed">
                Need a clean, reliable car in Long Beach? BCB Carts offers local
                vehicle rentals through Turo, giving you easy online booking with
                real local support.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="#available-cars"
                  className="inline-flex justify-center items-center rounded-xl bg-yellow-400 px-6 py-3 text-base font-bold text-slate-950 hover:bg-yellow-300 transition-colors"
                >
                  View Available Cars
                </a>

                <a
                  href="#contactForm"
                  onClick={scrollToContactForm}
                  className="inline-flex justify-center items-center rounded-xl border border-white/30 px-6 py-3 text-base font-bold text-white hover:bg-white/10 transition-colors"
                >
                  Ask a Question
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="available-cars"
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
        >
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Available Long Beach Car Rentals
            </h2>

            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Browse BCB Carts vehicles and book securely through Turo. Whether
              you need a fun coastal cruiser, a practical 7-seat minivan, or a
              fuel-efficient compact car, our Long Beach rental options are
              built for convenience.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {cars.map((car) => (
              <article
                key={car.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-100"
              >
                <div className="relative">
                  <img
                    src={car.image}
                    alt={`${car.year} rental in Long Beach through BCB Carts`}
                    className="w-full h-80 object-cover"
                    style={{
                      objectPosition: car.imagePosition || "center center"
                    }}
                  />

                  <div className="absolute top-4 left-4 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-slate-900 shadow">
                    {car.category}
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    {car.name}
                  </h3>

                  <p className="mt-1 text-sm font-semibold text-blue-700">
                    {car.year}
                  </p>

                  <p className="mt-4 text-slate-600 leading-relaxed">
                    {car.description}
                  </p>

                  <ul className="mt-5 grid gap-2">
                    {car.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-sm text-slate-700"
                      >
                        <span className="mt-1 h-2 w-2 rounded-full bg-yellow-400 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={car.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackTuroClick(car)}
                    className="mt-6 inline-flex w-full justify-center items-center rounded-xl bg-blue-700 px-5 py-3 text-base font-bold text-white hover:bg-blue-800 transition-colors"
                  >
                    Book on Turo
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white border-y border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900">
                  Why Rent Through BCB Carts on Turo?
                </h2>

                <p className="mt-4 text-slate-600 leading-relaxed">
                  Turo makes booking simple, while BCB Carts gives you the
                  benefit of a local Long Beach business behind the listing. You
                  can browse the vehicle, check availability, review trip
                  details, and book directly through Turo.
                </p>

                <p className="mt-4 text-slate-600 leading-relaxed">
                  Our goal is to make local car rental easier for visitors,
                  families, residents, and customers who need temporary
                  transportation without the stress of a traditional rental
                  counter.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
                  <h3 className="font-bold text-slate-900">
                    Easy Turo Booking
                  </h3>
                  <p className="mt-2 text-slate-600">
                    Reserve through Turo, manage your trip online, and view
                    availability directly on the vehicle listing.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
                  <h3 className="font-bold text-slate-900">
                    Local Long Beach Pickup
                  </h3>
                  <p className="mt-2 text-slate-600">
                    Rentals are based in Long Beach, making them convenient for
                    locals, visitors, beach trips, airport plans, and weekend
                    travel.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
                  <h3 className="font-bold text-slate-900">
                    Practical Vehicle Options
                  </h3>
                  <p className="mt-2 text-slate-600">
                    Choose a fun Mustang for coastal drives, a Dodge Grand
                    Caravan when you need extra seats and luggage room, or a
                    Nissan Versa when you want simple, fuel-efficient local
                    transportation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-extrabold text-slate-900">
                Popular Rental Uses
              </h2>

              <p className="mt-4 text-slate-600 leading-relaxed">
                BCB Carts car rentals can work for quick trips, longer stays,
                family needs, airport plans, beach days, and temporary
                transportation around Southern California.
              </p>
            </div>

            <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
              {[
                "Family trips around Long Beach",
                "Airport pickup and local travel",
                "Beach days and weekend plans",
                "Visitors staying in Southern California",
                "Temporary transportation while your car is in the shop",
                "Group transportation with luggage or gear",
                "Business trips and local errands",
                "Coastal drives and date nights"
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white p-5 border border-slate-200 shadow-sm"
                >
                  <p className="font-semibold text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white border-y border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700 mb-3">
                Rental Guides
              </p>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Helpful Long Beach Rental Guides
              </h2>

              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                Not sure which vehicle fits your trip? Read our local guides for
                Downtown Long Beach rentals, 7-seat minivans, compact cars, and
                Turo rental options through BCB Carts.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {rentalGuides.map((guide) => (
                <a
                  key={guide.href}
                  href={guide.href}
                  className="group block rounded-3xl bg-slate-50 p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-800">
                      {guide.label}
                    </span>

                    <span className="text-blue-700 font-black group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-extrabold text-slate-900">
                    {guide.title}
                  </h3>

                  <p className="mt-3 text-slate-600 leading-relaxed">
                    {guide.description}
                  </p>

                  <p className="mt-5 font-bold text-blue-700">
                    Read guide
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Ready to Book a Long Beach Car Rental?
            </h2>

            <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300 leading-relaxed">
              View the available vehicles above, choose the car that fits your
              trip, and book directly through Turo. For questions about BCB
              Carts, local service, or availability, contact us anytime.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#available-cars"
                className="inline-flex justify-center items-center rounded-xl bg-yellow-400 px-6 py-3 text-base font-bold text-slate-950 hover:bg-yellow-300 transition-colors"
              >
                Browse Vehicles
              </a>

              <a
                href="#contactForm"
                onClick={scrollToContactForm}
                className="inline-flex justify-center items-center rounded-xl border border-white/30 px-6 py-3 text-base font-bold text-white hover:bg-white/10 transition-colors"
              >
                Contact BCB Carts
              </a>
            </div>
          </div>
        </section>

        <div id="contactForm">
          <Contact />
        </div>
      </main>

      <FooterComponent />
    </>
  );
};

export default CarRentals;