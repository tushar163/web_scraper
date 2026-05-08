import Cookies from "js-cookie";

const getAuthToken = () => {
    return Cookies.get("token") || localStorage.getItem("token") || "";
}
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
export const fetchStories = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/stories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${getAuthToken()}`
            }
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || response.statusText || "Failed to fetch stories");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching stories:", error);
        throw error;
    }
}
export const FetchStoryById = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/api/stories/${id}`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || response.statusText || "Failed to fetch story");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching story:", error);
        throw error;
    }
}