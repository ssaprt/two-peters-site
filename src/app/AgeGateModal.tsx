"use client";

import { useEffect, useState } from "react";

import { registerVisit } from "@/lib/api/registerVisit";
import { apiService } from "@/services/ApiService";
import { YearsOld } from "./YearsOld/YearsOld";

export function AgeGateModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const verified = document.cookie
            .split("; ")
            .some((cookie) => cookie.startsWith("age_verified=1"));

        if (!verified) {
            setIsOpen(true);
        }
    }, []);

    async function handleConfirm() {
        const result = await apiService.postData("age", "verify");

        if (!result?.success) {
            return;
        }

        await registerVisit();
        setIsOpen(false);
    }

    if (!isOpen) {
        return null;
    }

    return <YearsOld onConfirm={handleConfirm} />;
}
