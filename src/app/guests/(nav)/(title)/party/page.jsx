"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Gallery from "../../../../../common/molecules/gallery/Gallery";
import QuestCard from "../../../../../common/molecules/questCard/QuestCard";
import { useFetch } from "../../../../../hooks/useFetch/useFetch";
import { getQuests } from "../../../../services/quests/quests";
import { getUserGallery } from "../../../../services/posts/posts";

const PartyPage = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [quests, fetchQuests, loadingQuests] = useFetch({
    functionFetch: getQuests,
    fetchInit: false,
  });

  const [posts, setPosts] = useState([]);       // Estado para almacenar los posts
  const [skip, setSkip] = useState(0);          // Estado para manejar la paginación
  const [hasMore, setHasMore] = useState(true); // Estado para indicar si hay más posts
  const [loadingPosts, setLoadingPosts] = useState(false);
  const limit = 12; // Tamaño del lote

  const [_, fetchPosts] = useFetch({
    functionFetch: getUserGallery,
    fetchInit: false,
  });

  // Cargar las misiones y el primer lote de la galería cuando hay sesión
  useEffect(() => {
    if (session) {
      fetchQuests({ body: { token } });
      loadMorePosts(); // Cargar los primeros elementos de la galería
    }
  }, [session]);

  // Función para cargar más elementos de la galería
  const loadMorePosts = async () => {
    if (!token || loadingPosts || !hasMore) return;

    setLoadingPosts(true);
    const response = await fetchPosts({
      body: { token, skip, limit },
    });

    if (response?.posts) {
      setPosts((prevPosts) => [...prevPosts, ...response.posts]); // Agrega nuevos posts al estado existente
      setHasMore(response.has_more); // Actualiza hasMore según la respuesta de la API
      setSkip((prevSkip) => prevSkip + limit); // Incrementa skip para la siguiente página
    }

    setLoadingPosts(false);
  };

  return (
    <>
      <div>
        <h2 className="font-medium text-lg pl-4"> Misiones </h2>
        <div className="flex gap-x-6 overflow-x-auto py-4 pl-2 -mt-4">
          {loadingQuests || !session ? (
            <>
              <div className="skeleton animate-pulse rounded-[16px] h-[187px] min-w-[288px] w-[288px] bg-white opacity-15"></div>
              <div className="skeleton animate-pulse rounded-[16px] h-[187px] min-w-[288px] w-[288px] bg-white opacity-15"></div>
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
              />
            ))
          ) : (
            <p className="text-gray-500">No hay misiones disponibles</p>
          )}
        </div>
      </div>

      <h2 className="mt-5 font-medium text-lg pl-4"> Tu galería </h2>
      <Gallery 
        items={posts} 
        loading={loadingPosts || !session} 
        loadMore={loadMorePosts} 
        limit={limit}
        showDetails={false}
      />
    </>
  );
};

export default PartyPage;
