
import React from "react";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <section className="space-y-10 pb-4 sm:pb-8">
      <div className="relative min-h-[560px] overflow-hidden rounded-lg bg-slate-900 text-white shadow-xl">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.pexels.com/photos/10711116/pexels-photo-10711116.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Kenya landscape"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/15" />
        <div className="relative flex min-h-[560px] max-w-3xl flex-col justify-end px-5 py-8 sm:px-8 lg:px-10">
          <p className="mb-3 text-sm font-semibold uppercase text-[#f2c14e]">
            Explore Kenya
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Discover places worth planning a trip around.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-100 sm:text-lg">
            Browse Kenyan locations, compare destinations, and read visitor
            reviews before choosing where to go next.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link className="primary-button bg-[#f2c14e] text-slate-950 hover:bg-[#ffd166]" to="/destinations">
              View destinations
            </Link>
            <Link className="secondary-button border-white/50 bg-white/10 text-white hover:border-white hover:bg-white hover:text-slate-900" to="/locations">
              Browse locations
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="surface-panel p-5">
          <p className="text-3xl font-bold text-[#0b6b2b]">Curated</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Browse destinations grouped by Kenyan locations.
          </p>
        </div>
        <div className="surface-panel p-5">
          <p className="text-3xl font-bold text-[#0b6b2b]">Reviewed</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Read ratings and comments from other travelers.
          </p>
        </div>
        <div className="surface-panel p-5">
          <p className="text-3xl font-bold text-[#0b6b2b]">Local</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Test against your local Flask API during development.
          </p>
        </div>
      </div>

      <div className="grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase text-[#0b6b2b]">
            Featured experience
          </p>
          <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            Move from inspiration to a shortlist faster.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            The app keeps locations, destination details, and reviews close
            together so the main travel-planning flow stays simple.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:pt-10">
            <img
              className="h-64 w-full rounded-lg object-cover shadow-sm"
              src="https://images.pexels.com/photos/4253835/pexels-photo-4253835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Kenya wildlife"
            />
          </div>
          <div>
            <img
              className="h-64 w-full rounded-lg object-cover shadow-sm"
              src="https://images.pexels.com/photos/12959528/pexels-photo-12959528.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Kenya coast"
            />
          </div>
          <div className="sm:pt-10">
            <img
              className="h-64 w-full rounded-lg object-cover shadow-sm"
              src="https://images.pexels.com/photos/10711116/pexels-photo-10711116.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Kenya destination"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
