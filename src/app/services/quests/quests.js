const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const getQuests = async ({body}) => {
    try {
      const apiUrl = `${APIURL}/quests/quests-status`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
        "ngrok-skip-browser-warning": "true",
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
  
  export const getQuestById = async ({body}) => {
    try {
      const apiUrl = `${APIURL}/quests/${body?.questId}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
        "ngrok-skip-browser-warning": "true",
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
  