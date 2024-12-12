"use client"

import React, { useState } from 'react';
import StoreItem from './magazin-iteme';

interface StoreItemType {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
}

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ 
  label, 
  options, 
  value, 
  onChange 
}) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          appearance-none bg-[#2D1A4A] text-[#FAFAFA] font-montserrat 
          px-4 py-2 pr-8 rounded-lg border transition-all duration-300
          ${value ? 'border-transparent' : 'border-[rgba(250,250,250,0.1)]'}
          focus:outline-none cursor-pointer hover:border-[#047A6E]
          [&>option:checked]:bg-gradient-to-r [&>option:checked]:from-[#047A6E] [&>option:checked]:via-[#047A6E] [&>option:checked]:to-[#9F1E07]
          [&>option]:py-2 [&>option]:px-4 [&>option]:bg-[#2D1A4A]
          [&>option:hover]:bg-[#3D2A5A]
        `}
        style={{
          backgroundClip: 'padding-box',
          ...(!value ? {} : {
            border: '1px solid transparent',
            backgroundImage: 'linear-gradient(#2D1A4A, #2D1A4A), linear-gradient(to right, #047A6E, #047A6E, #9F1E07)',
            backgroundOrigin: 'border-box',
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          })
        }}
      >
        <option value="" className="text-[#FAFAFA]">{label}</option>
        {options.map((option) => (
          <option 
            key={option} 
            value={option}
            className="text-[#FAFAFA]"
          >
            {option}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#FAFAFA]"
        >
          <path 
            d="M2 4L6 8L10 4" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

const StoreSection: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedFrame, setSelectedFrame] = useState<string>('');
  const [selectedBottle, setSelectedBottle] = useState<string>('');

  const storeItems: StoreItemType[] = [
    { id: 1, title: "Arta din Sticla #1", price: 299, imageUrl: "/produse/Jack_daniel.webp" },
    { id: 2, title: "Arta din Sticla #2", price: 349, imageUrl: "/produse/Jack_daniel.webp" },
    { id: 3, title: "Arta din Sticla #3", price: 399, imageUrl: "/produse/Jack_daniel.webp" },
  ];

  const sizeOptions: string[] = ['Mic', 'Mediu', 'Mare'];
  const frameOptions: string[] = ['Negru', 'Auriu', 'Argintiu'];
  const bottleOptions: string[] = ['Verde', 'Maro', 'Transparent'];

  return (
    <div className="container mx-auto px-8 py-16">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-[#FAFAFA] font-lacquer text-6xl">
          Magazin
        </h1>
        
        <div className="relative p-6 rounded-lg"
          style={{
            background: '#2D1A4A',
            border: '1px solid rgba(250,250,250,0.1)',
          }}
        >
          <div 
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            style={{
              background: 'radial-gradient(circle at top left, #4A2B7A 0%, #4A2B7A 10%, rgba(74,43,122,0.8) 20%, rgba(74,43,122,0.5) 35%, rgba(74,43,122,0.2) 45%, transparent 60%)'
            }}
          />
          
          <div className="relative z-10 flex flex-row gap-4">
            <FilterDropdown 
              label="Alege Marimea" 
              options={sizeOptions}
              value={selectedSize}
              onChange={setSelectedSize}
            />
            <FilterDropdown 
              label="Alege Rama" 
              options={frameOptions}
              value={selectedFrame}
              onChange={setSelectedFrame}
            />
            <FilterDropdown 
              label="Alege Sticla" 
              options={bottleOptions}
              value={selectedBottle}
              onChange={setSelectedBottle}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {storeItems.map((item) => (
          <StoreItem
            key={item.id}
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default StoreSection;