"use client";
import ProfileForm from "@/components/ProfileForm";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:4000";

const profile: React.FC = () => {
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('currentUserId') : null;
        const id = stored || "1";
        fetch(`${API_URL}/users/${id}`)
            .then(r => r.ok ? r.json() : null)
            .then(u => setUserName(u?.name ?? ""))
            .catch(() => { });
    }, []);
    return (
        <div>
            {userName && (
                <h2 className="text-xl font-semibold mb-2">{userName}</h2>
            )}
            <ProfileForm />
        </div>
    );
}

export default profile;