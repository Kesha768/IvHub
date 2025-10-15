"use client";

import AutoResizeInput from '@/components/media-file-uploader';
import RegInputs from '@/components/reg-inputs';
import { useEffect, useRef, useState } from 'react';

interface Option {
    value: string;
    label: string;
}

export default function MainPage() {
    const [activeOption, setActiveOption] = useState('lenta');
    const [role, setRole] = useState<Option[]>([]);
    const [selectedRole, setSelectedRole] = useState<Option | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(prev => !prev);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const roles = "роли";

    // Для хранения нескольких файлов
    const [files, setFiles] = useState<File[]>([]);

    // Обработчик выбора файлов
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    setFiles(prev => [...prev, ...Array.from(e.target.files)]);
  }
};
    const loadGroupByOption = async (option: Option) => {
        console.log('Загружаем группу по роли:', option);
    };

    useEffect(() => {
        async function fetchrole() {
            try {
                const response = await fetch('/json/role.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! статус: ${response.status}`);
                }
                const data = await response.json();
                const roleFromJson = data[roles];
                if (!roleFromJson) {
                    throw new Error(`Ключ "${roles}" не найден в role.json`);
                }
                setRole(roleFromJson);
                if (roleFromJson.length > 0) {
                    const firstOption = roleFromJson[0];
                    setSelectedRole(firstOption);
                    await loadGroupByOption(firstOption); 
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchrole();
    }, [roles]);

    const handleOptionClick = async (option: Option, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedRole(option);
        setIsOpen(false);
        await loadGroupByOption(option);
    };  

    return (
        <div className='flex flex-col items-center w-full'>
            <div className='flex flex-col align-center w-full max-w-[481px] mt-[13px]'>
                {/* Переключатели */}
                <div className="flex flex-row border border-[#003A73] p-[5px] rounded-[10px] bg-[#f0f0f0] h-[50px]">
                    <div
                        className={`cursor-pointer option rounded-[24px] transition duration-300 ease-in-out w-full h-full flex flex-col items-center justify-center font-[Montserrat] text-[16px] ${activeOption === 'lenta' ? 'active' : ''}`}
                        onClick={() => setActiveOption('lenta')}
                    >
                        Лента
                    </div>
                    <div
                        className={`cursor-pointer option rounded-[24px] transition duration-300 ease-in-out w-full h-full flex flex-col items-center justify-center ${activeOption === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveOption('profile')}
                    >
                        Профиль
                    </div>
                </div>
                {/* Разделитель */}
                <div className='mt-[14px] mb-[7px] h-[4px] w-full bg-[#003A73] rounded-[2px]'></div>

                {activeOption === 'lenta' && (
                    <div>
                        {/* Текстовое поле */}
                        <AutoResizeInput />

                        {/* Один загрузчик для нескольких изображений */}
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        {/* Предварительный просмотр всех выбранных изображений */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                            {files.map((file, index) => {
                                const url = URL.createObjectURL(file);
                                return (
                                    <div key={index} style={{ width: '100px', height: '100px', overflow: 'hidden' }}>
                                        <img
                                            src={url}
                                            alt={`upload-${index}`}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onLoad={() => URL.revokeObjectURL(url)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeOption === 'profile' && (
                    <div>
                        {/* Остальной код профиля */}
                        <div className="w-full gap-[7.32px] font-[Montserrat] font-medium text-[13px] text-[#111827]">
                            <span>Выберите роль</span>
                            <div className="relative w-full" ref={containerRef}>
                                {/* меню выбора роли */}
                                {/* ... ваш код ... */}
                                <RegInputs institute={"ивмиит"} but={"Сохранить"} role={selectedRole}/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}