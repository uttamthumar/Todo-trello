import React from "react";

export default function Header({ text, bg, count }) {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase test-sm text-white`}
    >
      {text}
      <div className="rounded-full w-5 h-5 ml-2 font-semibold bg-slate-100 text-slate-600 flex items-center justify-center">
        {count}
      </div>
    </div>
  );
}
