const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const login = async (formData) => {
    try {
        const response = await fetch(`${baseUrl}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || response.statusText || "Login failed");
        }

        return await response.json();
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};