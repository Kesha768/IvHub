"use client";
import PostBlock from "@/components/PostBlock";
import { useEffect, useMemo, useState } from "react";

type Author = { id: string; name: string; avatarUrl: string };
type Comment = { id: string; author: Author; text: string; createdAt: string; likes: number };
type Post = {
    id?: number;
    author: Author;
    createdAt: string;
    text: string;
    imageUrl: string | null;
    pdfUrl: string | null;
    likes: number;
    commentsCount: number;
    comments: Comment[];
};

const API_URL = "http://localhost:4000";

const ribbon: React.FC = () => {
    const [text, setText] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);

    const [currentAuthor, setCurrentAuthor] = useState<Author>({ id: "u1", name: "Admin", avatarUrl: "/logo.png" });

    useEffect(() => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('currentUserId') : null;
        const id = stored || "1";
        fetch(`${API_URL}/users/${id}`)
            .then(r => r.ok ? r.json() : null)
            .then(u => {
                if (u) setCurrentAuthor({ id: String(u.id), name: u.name || 'User', avatarUrl: u.avatarUrl || '/main-logo.png' });
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        fetch(`${API_URL}/posts?_sort=id&_order=desc`)
            .then(r => r.json())
            .then((data: Post[]) => setPosts(data))
            .catch(() => { });
    }, []);

    function readFileAsDataURL(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async function handleSubmit() {
        if (!text.trim() && !imageFile && !pdfFile) return;
        setIsSubmitting(true);
        try {
            const [imageUrl, pdfUrl] = await Promise.all([
                imageFile ? readFileAsDataURL(imageFile) : Promise.resolve(null),
                pdfFile ? readFileAsDataURL(pdfFile) : Promise.resolve(null)
            ]);

            const newPost: Post = {
                author: currentAuthor,
                createdAt: new Date().toISOString(),
                text: text.trim(),
                imageUrl: imageUrl as string | null,
                pdfUrl: pdfUrl as string | null,
                likes: 0,
                commentsCount: 0,
                comments: []
            };

            const res = await fetch(`${API_URL}/posts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPost)
            });
            const created = await res.json();
            setPosts(p => [created, ...p]);
            setText("");
            setImageFile(null);
            setPdfFile(null);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="">
            <div className="w-full  rounded-lg border border-gray-300 p-3 bg-white shadow-sm">
                <textarea
                    placeholder="Что у вас нового ?)"
                    className="w-full resize-none border-none focus:outline-none text-gray-800 placeholder:text-gray-400"
                    rows={2}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <hr className="my-2" />

                <div className="flex items-center justify-between">
                    <div className="flex gap-4 text-sm text-gray-600">
                        <label className="flex items-center gap-1 cursor-pointer hover:text-blue-800 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                                <path d="M3 15l6-6 4 4 8-8" />
                            </svg>
                            <span>Медиа</span>
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} />
                        </label>

                        <label className="flex items-center gap-1 cursor-pointer hover:text-blue-800 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path d="M9 12h6M9 16h6M13 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V9z" />
                            </svg>
                            <span>Файл</span>
                            <input type="file" accept="application/pdf" className="hidden" onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)} />
                        </label>
                    </div>

                    <button disabled={isSubmitting} onClick={handleSubmit} className="bg-blue-900 disabled:opacity-50 text-white rounded-full p-2 hover:bg-blue-800 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="mt-4">
                <PostBlock />
            </div>
        </div>
    );
}

export default ribbon;