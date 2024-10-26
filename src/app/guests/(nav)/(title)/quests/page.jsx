"use client"
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "../../../../../common/atoms/button/Button";
import QuestCard from "../../../../../common/molecules/questCard/QuestCard";
import { useFetch } from "../../../../../hooks/useFetch/useFetch";
import { getQuests } from "../../../../services/quests/quests";

const QuestsPage = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [quests, fetchQuests, loadingQuests] = useFetch({
    functionFetch: getQuests,
    fetchInit: false,
  });

  useEffect(() => {
    if (session) {
      fetchQuests({ body: { token } });
    }
  }, [session]);

  return (
    <>
      <h2 className="text-lg font-medium ml-3 mt-5"> Misiones del evento </h2>
      {/* <div className="grid grid-cols-1 mx-3">
        <div className="relative h-full min-w-full max-w-full min-h-52 max-h-52">
          <div className="absolute -inset-0.5 bg-secondary-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 "></div>
          <div className="relative bg-secondary-500 h-full grid grid-rows-[auto_1fr_auto] rounded-lg p-2">
            <h3 className="font-bold text-lg">Nombre de la misión</h3>
            <p className="mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </p>
            <Button color="ghost" size={"sm"} className={"bg-base-content text-secondary-500"}>
              Completar la misión
            </Button>
            <Button color="neutral" variant="outline" size={"sm"} className={"my-2"}>
              Ver galeria de la misión
            </Button>
          </div>
        </div>
      </div> */}
      <div className="flex flex-col gap-y-4 overflow-x-auto px-4 py-2 mb-20">
          {loadingQuests || !session ? (
            <>
              <div className="skeleton animate-pulse rounded-[16px] min-w-full max-w-full w-full h-[187px] max-h-[187px] bg-white opacity-15"></div>
              <div className="skeleton animate-pulse rounded-[16px] min-w-full max-w-full w-full h-[187px] max-h-[187px] bg-white opacity-15"></div>
              <div className="skeleton animate-pulse rounded-[16px] min-w-full max-w-full w-full h-[187px] max-h-[187px] bg-white opacity-15"></div>
              <div className="skeleton animate-pulse rounded-[16px] min-w-full max-w-full w-full h-[187px] max-h-[187px] bg-white opacity-15"></div>
              <div className="skeleton animate-pulse rounded-[16px] min-w-full max-w-full w-full h-[187px] max-h-[187px] bg-white opacity-15"></div>
            </>
          ) : quests.length > 0 ? (
            quests.map((quest) => (
              <QuestCard
                key={quest.id}
                id={quest.id}
                title={quest.name}
                description={quest.description}
                color={quest.color || undefined}
                img={quest.image || undefined}
                isCompleted={quest.is_completed}
                className="min-w-full max-w-full w-full min-h-[224px] h-[224px] max-h-[224px]"
              />
            ))
          ) : (
            <p className="text-gray-500">No hay misiones disponibles</p>
          )}
        </div>
    </>
  );
};

export default QuestsPage;
