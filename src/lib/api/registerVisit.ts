import { apiService } from "@/services/ApiService";
import { getVisitorId } from "./visitor";

export async function registerVisit() {
    if (typeof window === "undefined") {
        return;
    }

    const result = await apiService.postData<{
        restore_visitor_id?: string;
    }>("visits-site", "add", {
        visitor_id: getVisitorId(),

        language: navigator.language,

        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

        screen_width: screen.width,

        screen_height: screen.height,

        platform: navigator.platform,
    });

    if (result.data?.restore_visitor_id) {
        localStorage.setItem("visitor_id", result.data.restore_visitor_id);
    }
}
