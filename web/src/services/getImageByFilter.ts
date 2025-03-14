import axios from "axios";

const getImages = async ( year?: number, month?: number, day?: number ) => {
    // const api_url = `${import.meta.env.VITE_API_URL}/images?page=${page}&per_page=${per_page}`;
    const api_url = `http://localhost:5001/filter?year=${year}&month=${month}&day=${day}`;
    try {
        const response = await axios.get(api_url, { 
            withCredentials: true,
            headers: {
                "X-API-Key": import.meta.env.API_KEY
            }
        })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        return { images: [] };
    }
}

export default getImages;