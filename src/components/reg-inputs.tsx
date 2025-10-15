"use client";

import React, { useState, useRef, useEffect } from "react";

interface RegPageProps {
  institute: string;
  but: string;
  role: Option | null;
}

interface Option {
  value: string;
  label: string;
}

const RegInputs: React.FC<RegPageProps> = ({ institute, but, role }) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<Option | null>(null);
  const [group, setGroup] = useState<Option[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Option | null>(null);
  const [subgroups, setSubgroups] = useState<Option[]>([]);
  const [selectedSubgroup, setSelectedSubgroup] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [isSubgroupOpen, setIsSubgroupOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const groupRef = useRef<HTMLDivElement | null>(null);
  const subgroupRef = useRef<HTMLDivElement | null>(null);

  const loadSubgroupsByGroupName = async (groupName: string) => {
    try {
      const response = await fetch('/json/subgroup.json');
      if (!response.ok) {
        throw new Error(`HTTP error! статус: ${response.status}`);
      }
      const data = await response.json();
      const subOptions = data[groupName];
      if (!subOptions) {
        throw new Error(`Ключ "${groupName}" не найден в subgroup.json`);
      }
      setSubgroups(subOptions);
      if (subOptions.length > 0) {
        setSelectedSubgroup(subOptions[0]);
      } else {
        setSelectedSubgroup(null);
      }
    } catch (error) {}
  };

  const loadGroupByOption = async (option: Option) => {
    try {
      const response = await fetch('/json/group.json');
      if (!response.ok) {
        throw new Error(`HTTP error! статус: ${response.status}`);
      }
      const data = await response.json();
      const key = option.value;
      const optionsFromJson = data[key];
      if (!optionsFromJson) {
        throw new Error(`Ключ "${key}" не найден в group.json`);
      }
      setGroup(optionsFromJson);
      if (optionsFromJson.length > 0) {
        setSelectedGroup(optionsFromJson[0]);
        await loadSubgroupsByGroupName(optionsFromJson[0].label);
      } else {
        setSubgroups([]);
        setSelectedSubgroup(null);
      }
    } catch (error) {}
  };

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await fetch('/json/options.json');
        if (!response.ok) {
          throw new Error(`HTTP error! статус: ${response.status}`);
        }
        const data = await response.json();
        const optionsFromJson = data[institute];
        if (!optionsFromJson) {
          throw new Error(`Ключ "${institute}" не найден в options.json`);
        }
        setOptions(optionsFromJson);
        if (optionsFromJson.length > 0) {
          const firstOption = optionsFromJson[0];
          setSelected(firstOption);
          await loadGroupByOption(firstOption);
        }
      } catch (error) {}
    }
    fetchOptions();
  }, [institute]);

  const handleOptionClick = async (option: Option, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(option);
    setIsOpen(false);
    await loadGroupByOption(option);
  };

  const handleGroupOptionClick = async (option: Option, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedGroup(option);
    setIsGroupOpen(false);
    await loadSubgroupsByGroupName(option.label);
  };

  const handleSubgroupOptionClick = (option: Option, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSubgroup(option);
    setIsSubgroupOpen(false);
  };

  const toggleMenu = () => setIsOpen(prev => !prev);
  const toggleGroupMenu = () => setIsGroupOpen(prev => !prev);
  const toggleSubgroupMenu = () => setIsSubgroupOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (groupRef.current && !groupRef.current.contains(event.target as Node)) {
        setIsGroupOpen(false);
      }
      if (subgroupRef.current && !subgroupRef.current.contains(event.target as Node)) {
        setIsSubgroupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async () => {
    const dataToSend = {
      direction: selected ? selected.value : null,
      group: selectedGroup ? selectedGroup.value : null,
      subgroup: selectedSubgroup ? selectedSubgroup.value : null,
      role: role ? role.value : null,
    };
    try {
      await fetch('/эндпоинт', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
    } catch (error) {}
  };

  return (
    <div className="flex flex-col w-full mt-[17.75px] gap-[20.32px]">
      
      <div className="w-full gap-[7.32px]">
        <span className="font-[Montserrat] font-medium text-[13px] text-[#111827]">Выберите свое направление</span>
        <div className="relative w-full" ref={containerRef}>
          <div
            className="border border-[var(--color6)] rounded-xl h-[56px] px-4 flex items-center justify-between cursor-pointer"
            onClick={toggleMenu}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleMenu();
              } else if (e.key === "Escape") {
                setIsOpen(false);
              }
            }}
          >
            <span className={`transform-colors duration-300 text-[var(--color9)] ${isOpen ? "text-black" : ""}`}>
              {selected ? selected.label : 'Выберите опцию'}
            </span>
            <svg
              className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
              width="10"
              height="6"
              viewBox="0 0 10 6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.623867 0.750934C0.93626 0.438654 1.44298 0.438654 1.75538 0.750934L4.81137 3.80757C4.87852 3.87473 4.93166 3.92735 4.97803 3.97229C4.98554 3.97956 4.99276 3.98665 4.99952 3.99312C5.0064 3.98654 5.014 3.97971 5.02165 3.97229C5.06802 3.92736 5.12119 3.87471 5.18832 3.80757L8.24431 0.750934L8.30551 0.696246C8.61965 0.44012 9.08295 0.458287 9.37582 0.750934C9.66865 1.0438 9.68736 1.50769 9.43116 1.8219L9.37582 1.88244L6.31983 4.93843C6.19719 5.06108 6.0716 5.18787 5.9559 5.28609C5.83307 5.39035 5.66969 5.50871 5.45329 5.57906C5.15882 5.67472 4.84153 5.67469 4.54704 5.57906L4.46827 5.55106C4.29012 5.4798 4.15136 5.37741 4.04379 5.28609C3.9281 5.18787 3.80248 5.06105 3.67986 4.93843L0.623867 1.88244C0.311581 1.57005 0.31157 1.06333 0.623867 0.750934Z"
                fill={isOpen ? "#000000" : "#6B7280"}
                className="transition-colors duration-300"
              />
            </svg>
          </div>
          {isOpen && (
            <ul className="bg-[#F3F3F3] absolute left-0 right-0 border border-[#9CA3AF] rounded-xl max-h-60 overflow-y-auto z-10 no-scrollbar">
              {options.map((option) => (
                <li
                  key={option.value}
                  className="px-4 py-2 cursor-pointer text-[var(--color6)]"
                  onClick={(e) => handleOptionClick(option, e)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="w-full gap-[7.32px]">
        <span className="font-[Montserrat] font-medium text-[13px] text-[#111827]">Выберите группу</span>
        <div className="relative w-full" ref={groupRef}>
          <div
            className="border border-[var(--color6)] rounded-xl h-[56px] px-4 flex items-center justify-between cursor-pointer"
            onClick={toggleGroupMenu}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleGroupMenu();
              } else if (e.key === "Escape") {
                setIsGroupOpen(false);
              }
            }}
          >
            <span
              className={`transform-colors duration-300 text-[var(--color9)] ${isGroupOpen ? "text-black" : ""}`}
            >
              {selectedGroup ? selectedGroup.label : "Выберите группу"}
            </span>
            <svg
              className={`transform transition-transform duration-300 ${isGroupOpen ? "rotate-180" : "rotate-0"}`}
              width="10"
              height="6"
              viewBox="0 0 10 6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.623867 0.750934C0.93626 0.438654 1.44298 0.438654 1.75538 0.750934L4.81137 3.80757C4.87852 3.87473 4.93166 3.92735 4.97803 3.97229C4.98554 3.97956 4.99276 3.98665 4.99952 3.99312C5.0064 3.98654 5.014 3.97971 5.02165 3.97229C5.06802 3.92736 5.12119 3.87471 5.18832 3.80757L8.24431 0.750934L8.30551 0.696246C8.61965 0.44012 9.08295 0.458287 9.37582 0.750934C9.66865 1.0438 9.68736 1.50769 9.43116 1.8219L9.37582 1.88244L6.31983 4.93843C6.19719 5.06108 6.0716 5.18787 5.9559 5.28609C5.83307 5.39035 5.66969 5.50871 5.45329 5.57906C5.15882 5.67472 4.84153 5.67469 4.54704 5.57906L4.46827 5.55106C4.29012 5.4798 4.15136 5.37741 4.04379 5.28609C3.9281 5.18787 3.80248 5.06105 3.67986 4.93843L0.623867 1.88244C0.311581 1.57005 0.31157 1.06333 0.623867 0.750934Z"
                fill={isGroupOpen ? "#000000" : "#6B7280"}
                className="transition-colors duration-300"
              />
            </svg>
          </div>
          {isGroupOpen && (
            <ul className="bg-[#F3F3F3] absolute left-0 right-0 border border-[#9CA3AF] rounded-xl max-h-60 overflow-y-auto z-10 no-scrollbar">
              {group.map((grp) => (
                <li
                  key={grp.value}
                  className="px-4 py-2 cursor-pointer text-[var(--color6)]"
                  onClick={(e) => handleGroupOptionClick(grp, e)}
                >
                  {grp.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="w-full gap-[7.32px]">
        <span className="font-[Montserrat] font-medium text-[13px] text-[#111827]">Выберите подгруппу</span>
        <div className="relative w-full" ref={subgroupRef}>
          <div
            className="border border-[var(--color6)] rounded-xl h-[56px] px-4 flex items-center justify-between cursor-pointer"
            onClick={toggleSubgroupMenu}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleSubgroupMenu();
              } else if (e.key === "Escape") {
                setIsSubgroupOpen(false);
              }
            }}
          >
            <span
              className={`transform-colors duration-300 text-[var(--color9)] ${isSubgroupOpen ? "text-black" : ""}`}
            >
              {selectedSubgroup ? selectedSubgroup.label : "Выберите подгруппу"}
            </span>
            <svg
              className={`transform transition-transform duration-300 ${isSubgroupOpen ? "rotate-180" : "rotate-0"}`}
              width="10"
              height="6"
              viewBox="0 0 10 6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.623867 0.750934C0.93626 0.438654 1.44298 0.438654 1.75538 0.750934L4.81137 3.80757C4.87852 3.87473 4.93166 3.92735 4.97803 3.97229C4.98554 3.97956 4.99276 3.98665 4.99952 3.99312C5.0064 3.98654 5.014 3.97971 5.02165 3.97229C5.06802 3.92736 5.12119 3.87471 5.18832 3.80757L8.24431 0.750934L8.30551 0.696246C8.61965 0.44012 9.08295 0.458287 9.37582 0.750934C9.66865 1.0438 9.68736 1.50769 9.43116 1.8219L9.37582 1.88244L6.31983 4.93843C6.19719 5.06108 6.0716 5.18787 5.9559 5.28609C5.83307 5.39035 5.66969 5.50871 5.45329 5.57906C5.15882 5.67472 4.84153 5.67469 4.54704 5.57906L4.46827 5.55106C4.29012 5.4798 4.15136 5.37741 4.04379 5.28609C3.9281 5.18787 3.80248 5.06105 3.67986 4.93843L0.623867 1.88244C0.311581 1.57005 0.31157 1.06333 0.623867 0.750934Z"
                fill={isSubgroupOpen ? "#000000" : "#6B7280"}
                className="transition-colors duration-300"
              />
            </svg>
          </div>
          {isSubgroupOpen && (
            <ul className="bg-[#F3F3F3] absolute left-0 right-0 border border-[#9CA3AF] rounded-xl max-h-60 overflow-y-auto z-10 no-scrollbar">
              {subgroups.map((sub) => (
                <li
                  key={sub.value}
                  className="px-4 py-2 cursor-pointer text-[var(--color6)]"
                  onClick={(e) => handleSubgroupOptionClick(sub, e)}
                >
                  {sub.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button className="mt-[24px] w-[160px] h-[48px] bg-[var(--color11)] rounded-[20px] flex items-center justify-center ml-auto mr-auto text-[var(--white)] font-semibold font-[Montserrat]" onClick={handleSubmit}>
        {but}
      </button>
    </div>
  );
};

export default RegInputs;