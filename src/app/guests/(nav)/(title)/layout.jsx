"use client"
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter} from "next/navigation";
import AnimatedGradientText from "../../../../common/atoms/animatedGradientText/AnimatedGradientText";
import Image from "next/image";
import { useFetch } from "../../../../hooks/useFetch/useFetch";
import {getEventData} from "../../../../features/countdown/infraestructure/countdown.repositories"

export default function PartyLayout({ children }) {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const params = useParams();
  const { quest_id } = params;
  const [event, fetchEvent, loadingEvent] = useFetch({
    functionFetch: getEventData,
    fetchInit: false,
  });

  useEffect(() => {
    if (session) {
      fetchEvent({ body: { token: token, questId: quest_id } });
    }
  }, [session]);

  return (
    <>
      <div className="sticky top-0 z-10 h-full w-full bg-base-100 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40">
        <div className="mx-2 py-4 flex gap-x-2 items-center">
          <Image
            src="/logo.png"
            width={70}
            height={70}
            alt="photo-party logo"
            priority={true}
          />
          <AnimatedGradientText
            className={"text-3xl font-extrabold"}
            text={event?.name}
          />
        </div>
      </div>
      {children}
    </>
  );
}
