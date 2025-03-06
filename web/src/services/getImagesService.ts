import axios from "axios";

const getImage = async ( page: number = 1, per_page: number = 12,year?: number, month?: number, day?: number) => {
    const api_url = `http://localhost:5001/filter?page=${page}&per_page=${per_page}year=${year}&month=${month}&day=${day}`;
    // const api_url = `http://localhost:5001/filter?year=${year}&month=${month}&day=${day}`;
    try {
        const response = await axios.get(api_url, { withCredentials: true })
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        return { images: [], pages: 1, total: 0, current_page: page };
    }
}

export default getImage;