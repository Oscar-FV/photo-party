const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const getEventStartTime = async () => {
  try {
    const apiUrl = `${APIURL}/events/start-time`;
    const response = await fetch(apiUrl, {
      method: "GET",
    });

    return response;
  } catch (error) {
    console.error("Error obteniendo datos del evento:", error.message);
  }
};

export const getEventData = async () => {
    try {
      const apiUrl = `${APIURL}/events/event-info`;
      const response = await fetch(apiUrl, {
        method: "GET",
      });
  
      return response;
    } catch (error) {
      console.error("Error obteniendo datos del evento:", error.message);
    }
  };
