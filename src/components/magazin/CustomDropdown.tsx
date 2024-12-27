'use client'

import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
  color?: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative min-w-[160px]" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 bg-[#17012C] text-[#FAFAFA] rounded border border-[#2A235A] outline-none cursor-pointer hover:border-[#047A6E] transition-colors duration-200 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          {selectedOption?.color && (
            <div
              className="w-3 h-3 rounded-full border border-[#FAFAFA]/20"
              style={{ backgroundColor: selectedOption.color }}
            />
          )}
          <span>{selectedOption?.label || placeholder}</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-[#17012C] border border-[#2A235A] rounded shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full p-2 text-left hover:bg-[#2A235A] transition-colors duration-200 flex items-center gap-2
                ${option.value === value ? 'bg-[#2A235A] text-[#047A6E]' : 'text-[#FAFAFA]'}`}
            >
              {option.color && (
                <div
                  className="w-3 h-3 rounded-full border border-[#FAFAFA]/20"
                  style={{ backgroundColor: option.color }}
                />
              )}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;