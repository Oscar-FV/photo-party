"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Gallery from "../../../../../common/molecules/gallery/Gallery";
import { useFetch } from "../../../../../hooks/useFetch/useFetch";
import { getEventPosts } from "../../../../services/posts/posts";

const GalleryPage = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [posts, setPosts] = useState([]);       // Estado para almacenar los posts
  const [skip, setSkip] = useState(0);          // Estado para manejar la paginación
  const [hasMore, setHasMore] = useState(true); // Estado para indicar si hay más posts
  const [loadingPosts, setLoadingPosts] = useState(false);
  const limit = 16; // Tamaño del lote

  const [_, fetchPosts] = useFetch({
    functionFetch: getEventPosts,
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
      <h2 className="mt-5 font-medium text-lg pl-4"> Galería de la fiesta </h2>
      <Gallery 
        items={posts} 
        loading={loadingPosts || !session} 
        loadMore={loadMorePosts} 
        limit={limit}
        noPhotosText="Aún no hay post en tu fiesta"
      />
    </>
  );
};

export default GalleryPage;
