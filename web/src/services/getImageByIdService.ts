import axios from "axios";

const getImageById = async ( id: number ) => {
    const api_url = `${import.meta.env.VITE_API_URL}/image/${id}`;
    try {
        const response = await axios.get(api_url, {
          withCredentials: true,  // Send credentials (cookies, etc.)
          responseType: 'blob'    // Expect a Blob (binary data)
        });
    
        // Create a URL for the image Blob
        const imageUrl = URL.createObjectURL(response.data);
        console.log(imageUrl)
        return imageUrl
    
      } catch (error) {
        console.error('Error fetching the image:', error);
      }
}

export default getImageById;