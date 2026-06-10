import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-10 bg-[#172016] px-4 py-8 text-sm text-white sm:text-base">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p className="font-semibold">DestinationKenya</p>
        <p className="text-slate-300">Copyright &copy; {currentYear}. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
