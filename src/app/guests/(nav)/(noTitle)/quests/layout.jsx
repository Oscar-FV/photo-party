"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter} from "next/navigation";
import { Icon } from "@iconify/react";
import AnimatedGradientText from "../../../../../common/atoms/animatedGradientText/AnimatedGradientText";
import { useFetch } from "../../../../../hooks/useFetch/useFetch";
import { getQuestById } from "../../../../services/quests/quests";

export default function QuestLayout({ children }) {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const params = useParams();
  const router = useRouter();
  const { quest_id } = params;
  const [quest, fetchQuest, loadingQuest] = useFetch({
    functionFetch: getQuestById,
    fetchInit: false,
  });

  useEffect(() => {
    if (session) {
      fetchQuest({ body: { token: token, questId: quest_id } });
    }
  }, [session]);

  return (
    <>
      <div className="sticky top-0 z-10 h-full w-full bg-base-100 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40">
        <div className="mx-2 py-4 flex flex-col gap-x-2">
          <span className="flex">
            <Icon icon={"material-symbols:arrow-back-ios-rounded"} className="mt-1 text-primary-500 text-3xl" onClick={() => {router.push("/guests/quests")}}></Icon>
            <AnimatedGradientText
              className={"text-3xl font-extrabold"}
              text={quest?.name}
            />
          </span>

          <p>{quest?.description}</p>
        </div>
      </div>
      {children}
    </>
  );
}
