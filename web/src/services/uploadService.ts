import axios from "axios";

const uploadImage = async (file: File): Promise<File> => {
    const formData = new FormData();
    formData.append("image", file);
    const api_url = "";

    try {
        const response = await axios.post(api_url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        if (axios.isAxiosError(error)) {
            throw error.response?.data || error.message;
        } else {
            throw error;
        }
    }
};

export default uploadImage;