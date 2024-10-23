const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const login = async ({ params }) => {
    try {
      const apiUrl = `${APIURL}/users/login`;
      const response = await fetch(apiUrl, {
        method: 'POST', // GET para el login
        body: JSON.stringify({
            username: params.email,
            password: params.password,
          }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Devuelve directamente la respuesta para su procesamiento
      return response;
    } catch (error) {
      console.error(error);
      throw new Error("Login request failed");
    }
  };

  export const refreshToken = async ({ params }) => {
    try {
      const apiUrl = `${APIURL}/users/refresh-token`;
      const response = await fetch(apiUrl, {
        method: 'POST', // GET para el login
        body: JSON.stringify({
            username: params.email,
            password: params.password,
          }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Devuelve directamente la respuesta para su procesamiento
      return response;
    } catch (error) {
      console.error(error);
      throw new Error("Login request failed");
    }
  };