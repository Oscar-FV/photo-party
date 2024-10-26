"use client";
import React from "react";
import Gallery from "../../../../common/molecules/gallery/Gallery";
import QuestCard from "../../../../common/molecules/questCard/QuestCard"


const PartyPage = () => {
  return (
    <>
      <div className="">
        <h2 className="font-medium text-lg pl-4"> Misiones </h2>
        <div className="flex gap-x-6 overflow-x-auto py-4 pl-2 -mt-4">
          <QuestCard />
          <QuestCard color="secondary-500"/>
          <QuestCard color="accent-500"/>
          <QuestCard color="card"/>
        </div>
      </div>

      <h2 className="mt-5 font-medium text-lg pl-4"> Tu galería </h2>
      <Gallery></Gallery>
    </>
  );
};

export default PartyPage;
