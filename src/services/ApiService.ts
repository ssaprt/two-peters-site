const API_URL =
    typeof window === "undefined"
        ? process.env.API_URL
        : process.env.NEXT_PUBLIC_API_URL;

type ApiResponse<T> = {
    success: boolean;
    data?: T;
    message?: string;
};

class ApiService {
    async getData<T>(
        controller: string,
        action: string,
    ): Promise<ApiResponse<T>> {
        console.log(`${API_URL}/${controller}/${action}`);
        const res = await fetch(`${API_URL}/${controller}/${action}`, {
            method: "GET",
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("API Error");
        }

        return res.json();
    }

    async postData<T>(
        controller: string,
        action: string,
        body?: unknown,
    ): Promise<ApiResponse<T>> {
        const res = await fetch(`${API_URL}/${controller}/${action}`, {
            method: "POST",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            throw new Error("API Error");
        }
        return res.json();
    }
}

export const apiService = new ApiService();
