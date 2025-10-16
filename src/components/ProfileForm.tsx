"use client"
import { div } from "framer-motion/m";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:4000";

export default function ProfileForm() {
    const [userId, setUserId] = useState<string>("1");
    const [role, setRole] = useState("1");
    const [direction, setDirection] = useState("ИСТ");
    const [group, setGroup] = useState("09-562");
    const [subgroup, setSubgroup] = useState("1");
    const [name, setName] = useState("Admin");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        // получить id из localStorage, если есть
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('currentUserId');
            if (stored) setUserId(stored);
        }
    }, []);

    useEffect(() => {
        if (!userId) return;
        fetch(`${API_URL}/users/${userId}`)
            .then(async r => {
                if (!r.ok) return null;
                return r.json();
            })
            .then((u) => {
                if (u) {
                    setName(u.name ?? "");
                    setRole(u.role ?? "1");
                    setDirection(u.direction ?? "ИСТ");
                    setGroup(u.group ?? "09-562");
                    setSubgroup(u.subgroup ?? "1");
                }
            })
            .finally(() => setLoading(false));
    }, [userId]);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            let res = await fetch(`${API_URL}/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, role, direction, group, subgroup, avatarUrl: "/logo.png" })
            });
            if (!res.ok && res.status === 404) {
                // если пользователя нет, создадим нового
                res = await fetch(`${API_URL}/users`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, role, direction, group, subgroup, avatarUrl: "/main-logo.png" })
                });
                const created = await res.json();
                if (created?.id) {
                    localStorage.setItem('currentUserId', String(created.id));
                    setUserId(String(created.id));
                }
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
        <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full mx-auto mt-6 gap-[20px] font-[Montserrat]"
        >
            {loading && <span className="text-sm text-gray-500">Загрузка...</span>}
            {/* Имя */}
            <div className="flex flex-col gap-[7px]">
                <label className="text-[13px] font-medium text-[#111827]">
                    Имя
                </label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-[var(--color6)] rounded-xl h-[56px] px-4 text-[var(--color9)] outline-none focus:border-black transition-colors"
                />
            </div>
            {/* Роль */}
            <div className="flex flex-col gap-[7px]">
                <label className="text-[13px] font-medium text-[#111827]">
                    Выберите роль
                </label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="border border-[var(--color6)] rounded-xl h-[56px] px-4 text-[var(--color9)] outline-none focus:border-black transition-colors"
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
                <p className="text-[12px] text-[#6B7280]">
                    Роль выдается после модерации (по всем вопросам @norrthh)
                </p>
            </div>

            {/* Направление */}
            <div className="flex flex-col gap-[7px]">
                <label className="text-[13px] font-medium text-[#111827]">
                    Выберите свое направление
                </label>
                <select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value)}
                    className="border border-[var(--color6)] rounded-xl h-[56px] px-4 text-[var(--color9)] outline-none focus:border-black transition-colors"
                >
                    <option value="ИСТ">ИСТ</option>
                    <option value="ПМИ">ПМИ</option>
                    <option value="ФИИТ">ФИИТ</option>
                </select>
            </div>

            {/* Группа */}
            <div className="flex flex-col gap-[7px]">
                <label className="text-[13px] font-medium text-[#111827]">
                    Выберите свою группу
                </label>
                <select
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                    className="border border-[var(--color6)] rounded-xl h-[56px] px-4 text-[var(--color9)] outline-none focus:border-black transition-colors"
                >
                    <option value="09-562">09-562</option>
                    <option value="09-563">09-563</option>
                    <option value="09-564">09-564</option>
                </select>
            </div>

            {/* Номер подгруппы */}
            <div className="flex flex-col gap-[7px]">
                <label className="text-[13px] font-medium text-[#111827]">
                    Выберите номер группы
                </label>
                <select
                    value={subgroup}
                    onChange={(e) => setSubgroup(e.target.value)}
                    className="border border-[var(--color6)] rounded-xl h-[56px] px-4 text-[var(--color9)] outline-none focus:border-black transition-colors"
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>

            {/* Кнопка */}
            <button
                type="submit"
                disabled={saving}
                className="my-[24px] cursor-pointer w-[160px] h-[48px] bg-[var(--color11)] rounded-[20px] text-[var(--white)] font-semibold mx-auto transition-colors hover:opacity-90 disabled:opacity-50"
            >
                {saving ? "Сохранение..." : "Сохранить"}
            </button>
            </form>
        </div>
    );
}
