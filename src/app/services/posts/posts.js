const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const getUserGallery = async ({ body }) => {
  try {
    const apiUrl = `${APIURL}/posts/user-posts`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${body?.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error obteniendo datos del evento:", error.message);
  }
};

export const savePhoto = async ({ body }) => {
  try {
    const apiUrl = `${APIURL}/posts/image`;

    const formData = new FormData();
    formData.append("file", body?.file);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${body?.token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Error subiendo tu imagen, intentalo de nuevo:",
      error.message
    );
  }
};

export const createPost = async ({ body }) => {
  try {
    const apiUrl = `${APIURL}/posts`;

    // Construir el cuerpo de la solicitud directamente sin el objeto "newPost"
    const postData = {
      quest_id: body?.quest_id,
      image_url: body?.image_url,
      caption: body?.caption,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${body?.token}`,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creando el post:", error.message);
  }
};