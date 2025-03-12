import axios from "axios";

const getImages = async ( page: number = 1, per_page: number = 12) => {
    const api_url = `${import.meta.env.VITE_API_URL}/images?page=${page}&per_page=${per_page}`;
    // const api_url = `http://localhost:5001/filter?year=${year}&month=${month}&day=${day}`;
    try {
        const response = await axios.get(api_url, { withCredentials: true })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        return { images: [], pages: 1, total: 0, current_page: page };
    }
}

export default getImages;