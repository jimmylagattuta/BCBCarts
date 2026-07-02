import React from "react";
import { Link } from "react-router-dom";

function CarRentalsHomeSection() {
  const rentalHighlights = [
    "Ford Mustang for weekend drives, beach trips, and visitors who want something fun",
    "Dodge Grand Caravan minivans for families, groups, airport trips, and luggage",
    "Nissan Versa for affordable, fuel-efficient local transportation",
    "Easy online booking through Turo with local Long Beach support"
  ];

  return (
    <section className="bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300 mb-4">
              Long Beach Car Rentals
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Need a Car Rental in Long Beach?
            </h2>

            <p className="mt-5 text-lg text-slate-200 leading-relaxed">
              BCB Carts now offers local Long Beach car rental options through
              Turo, including a Ford Mustang, Dodge Grand Caravan minivans, and
              a fuel-efficient Nissan Versa.
            </p>

            <p className="mt-4 text-slate-300 leading-relaxed">
              Whether you need a 7-seat minivan, a cheap compact car, or
              something fun for the weekend, you can browse available vehicles
              and book directly online.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/car-rentals"
                className="inline-flex justify-center items-center rounded-xl bg-yellow-400 px-6 py-3 text-base font-bold text-slate-950 hover:bg-yellow-300 transition-colors"
              >
                View Car Rentals
              </Link>

              <Link
                to="/car-rentals#contactForm"
                className="inline-flex justify-center items-center rounded-xl border border-white/30 px-6 py-3 text-base font-bold text-white hover:bg-white/10 transition-colors"
              >
                Ask About a Rental
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white/10 border border-white/10 p-6 sm:p-7 shadow-2xl">
            <h3 className="text-2xl font-extrabold text-white">
              Available Rental Options
            </h3>

            <ul className="mt-6 grid gap-4">
              {rentalHighlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-slate-100">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-yellow-400 flex-shrink-0" />
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-2xl bg-slate-900/80 border border-white/10 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                Popular Searches
              </p>

              <p className="mt-3 text-slate-200 leading-relaxed">
                Car rental near Downtown Long Beach, Long Beach 90813 car
                rental, 7-seat minivan rental, Dodge Grand Caravan rental, cheap
                compact car rental, and Nissan Versa rental in Long Beach.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CarRentalsHomeSection;