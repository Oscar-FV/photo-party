"use client"
import React, {useEffect} from "react";
import { useSession } from "next-auth/react";
import { useParams } from 'next/navigation';
import AnimatedGradientText from "../../../../../common/atoms/animatedGradientText/AnimatedGradientText";
import { useFetch } from "../../../../../hooks/useFetch/useFetch";
import { getQuestById } from "../../../../services/quests/quests";

export default function QuestLayout({ children }) {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const params = useParams();
  const { quest_id } = params;
  const [quest, fetchQuest, loadingQuest] = useFetch({
    functionFetch: getQuestById,
    fetchInit: false,
  });

  useEffect(() => {
    if (session) {
      fetchQuest({ body: {token:token, questId: quest_id } });
    }
  }, [session]);

  return (
    <>
      <div className="sticky top-0 z-10 h-full w-full bg-base-100 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40">
        <div className="mx-2 py-4 flex flex-col gap-x-2">
          <AnimatedGradientText
            className={"text-3xl font-extrabold"}
            text={quest?.name}
          />
          <p>{quest?.description}</p>
        </div>
      </div>
      {children}
    </>
  );
}
