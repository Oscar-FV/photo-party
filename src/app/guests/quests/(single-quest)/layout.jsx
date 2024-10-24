import React from "react";

export default function CompleteQuestsLayout({ children }) {
  return (
    <>
      <div className="grid grid-rows-[auto_1fr] max-h-[100svh] h-[100svh]">
        <div className="px-2 pt-2 mb-1 sticky top-0 w-full bg-base-100 z-10">
          <h1 className="text-2xl text-primary-500 font-semibold">Quest Name</h1>
          <p className="text-lg">Quest description</p>
        </div>
        {children} 
      </div>
    </>
  );
}
