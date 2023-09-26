async function getPledges() {
    const url = `${import.meta.env.VITE_API_URL}/pledges/`;
    const token = window.localStorage.getItem("token");
  
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error fetching pledges: ${response.statusText}`);
    }
  
    return await response.json();
  }
  
  export default getPledges;
  