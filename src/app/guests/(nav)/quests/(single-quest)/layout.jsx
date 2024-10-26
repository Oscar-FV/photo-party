import React from "react";
import { Icon } from "@iconify/react";

export default function CompleteQuestsLayout({ children }) {
  return (
    <>
      <div className="grid grid-rows-[auto_1fr] min-h-[100svh]">
        <div className="px-2 pt-2 mb-1 sticky top-0 w-full bg-base-100 z-10">
          <span className="grid grid-cols-[auto_1fr]">
            <Icon
              icon="material-symbols:arrow-back-ios-rounded"
              width="24"
              height="24"
              className="text-primary-500 mt-1"
            />
            <h1 className="text-2xl text-primary-500 font-semibold -ml-2">
              Quest Name
            </h1>
          </span>
          <p className="text-lg pl-4">Quest description</p>
        </div>
        {children}
      </div>
    </>
  );
}
