"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useFetch } from "../../../../../../../hooks/useFetch/useFetch";
import { getQuestGallery } from "../../../../../../services/posts/posts";
import Gallery from "../../../../../../../common/molecules/gallery/Gallery";
import { Button } from "../../../../../../../common/atoms/button/Button";

const SingleQuestPage = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const params = useParams();
  const router = useRouter();
  const { quest_id, is_completed } = params;

  const [posts, setPosts] = useState([]); // Estado para almacenar los posts
  const [skip, setSkip] = useState(0); // Estado para manejar la paginación
  const [hasMore, setHasMore] = useState(true); // Estado para indicar si hay más posts
  const [loadingPosts, setLoadingPosts] = useState(false);
  const limit = 16; // Tamaño del lote

  const [_, fetchPosts] = useFetch({
    functionFetch: getQuestGallery,
    fetchInit: false,
  });

  // Cargar las misiones y el primer lote de la galería cuando hay sesión
  useEffect(() => {
    if (session) {
      loadMorePosts(); // Cargar los primeros elementos de la galería
    }
  }, [session]);

  // Función para cargar más elementos de la galería
  const loadMorePosts = async () => {
    if (!token || loadingPosts || !hasMore) return;

    setLoadingPosts(true);
    const response = await fetchPosts({
      body: { token, skip, limit, quest_id },
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
      <div className="mx-2">
        <Button disabled={is_completed} color="accent" size={"sm"} className={"w-full"} onClick={() => {router.push(`/guests/quests/complete/${quest_id}`)}}>
          ¡Completa la misión!
        </Button>
        <h2 className="text-lg font-medium mt-5"> Galería de la misión </h2>
      </div>
      <Gallery
        items={posts}
        loading={loadingPosts || !session}
        loadMore={loadMorePosts}
        limit={limit}
      />
    </>
  );
};

export default SingleQuestPage;
