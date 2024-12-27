'use client'
import React, { useState, useEffect } from 'react';
import { fetchAPI, getAssetURL } from '../../../utils/api';
import StoreItem from './magazin-iteme';
import CustomDropdown from './CustomDropdown';
import { motion } from 'framer-motion';
import { Menu, X, Filter } from 'lucide-react';

interface StoreItemType {
  id: number;
  Imagine_produs: string;
  Titlu: string;
  Pret: number;
  sticla: string;
  Culoare_rama: string;
  Marime: string;
  Imagine_logo: string;
  purchase_status: 'available' | 'sold';
  payment_intent_id?: string;
  date_sold?: string;
}

interface FieldChoices {
  sticla: Option[];
  culoare_rama: Option[];
  marime: Option[];
}

interface Option {
  value: string;
  label: string;
  color?: string;
}

interface FieldMeta {
  id: number;
  collection: string;
  field: string;
  special: string | null;
  interface: string;
  options: {
    choices?: Array<{
      text: string;
      value: string;
      color: string;
    }>;
  } | null;
}

interface FieldResponse {
  data: {
    collection: string;
    field: string;
    type: string;
    meta: FieldMeta;
  }
}

const getUniqueValues = (arr: string[]): string[] => {
  return arr.filter((value, index, self) => 
    value && self.indexOf(value) === index
  );
};

const StoreSection: React.FC = () => {
  const [storeItems, setStoreItems] = useState<StoreItemType[]>([]);
  const [fieldChoices, setFieldChoices] = useState<FieldChoices>({
    sticla: [],
    culoare_rama: [],
    marime: []
  });
  const [selectedFrame, setSelectedFrame] = useState('');
  const [selectedBottle, setSelectedBottle] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchFieldConfiguration = async () => {
      try {
        const response = await fetch('/fields/store_items/Culoare_rama');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { data: fieldConfig } = await response.json();
        return fieldConfig.meta?.options?.choices || [];
      } catch (err) {
        console.error('Failed to fetch field configuration:', err);
        return [];
      }
    };

    const fetchStoreData = async () => {
      try {
        const [storeResponse, frameOptions] = await Promise.all([
          fetch('/items/store_items?filter[purchase_status][_eq]=available'),
          fetchFieldConfiguration()
        ]);

        if (!storeResponse.ok) {
          throw new Error(`HTTP error! status: ${storeResponse.status}`);
        }

        const data = await storeResponse.json();

        if (data.data) {
          const uniqueSticla = getUniqueValues(data.data.map((item: StoreItemType) => item.sticla));
          const uniqueFrame = getUniqueValues(data.data.map((item: StoreItemType) => item.Culoare_rama));
          const uniqueSize = getUniqueValues(data.data.map((item: StoreItemType) => item.Marime));

          const choices: FieldChoices = {
            sticla: uniqueSticla
              .sort()
              .map(value => ({
                value,
                label: value
              })),
            culoare_rama: uniqueFrame
              .sort()
              .map(value => {
                const option = frameOptions.find((opt: { text: string; value: string; color: string; }) => opt.value === value);
                return {
                  value,
                  label: value,
                  color: option?.color
                };
              }),
            marime: uniqueSize
              .sort((a, b) => {
                const aNum = parseInt(a.split('x')[0]);
                const bNum = parseInt(b.split('x')[0]);
                return aNum - bNum;
              })
              .map(value => ({
                value,
                label: `${value} cm`
              }))
          };

          setFieldChoices(choices);
        }

        setStoreItems(data.data || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load store items');
        setLoading(false);
      }
    };

    fetchStoreData();
  }, []);

  useEffect(() => {
    const fetchFilteredItems = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        
        // Always filter for available items
        params.append('filter[purchase_status][_eq]', 'available');
        
        // Add other filters
        if (selectedFrame) params.append('filter[Culoare_rama][_eq]', selectedFrame);
        if (selectedBottle) params.append('filter[sticla][_eq]', selectedBottle);
        if (selectedSize) params.append('filter[Marime][_eq]', selectedSize);

        const url = `/items/store_items?${params.toString()}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStoreItems(data.data || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load filtered items');
        setLoading(false);
      }
    };

    fetchFilteredItems();
  }, [selectedFrame, selectedBottle, selectedSize]);

  const resetFilters = () => {
    setSelectedFrame('');
    setSelectedBottle('');
    setSelectedSize('');
    setIsFilterOpen(false);
  };

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-16">{error}</div>;

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-16">
      <div className="flex flex-col md:flex-row justify-between mb-8 md:mb-12">
        <h1 className="text-3xl md:text-6xl font-lacquer text-[#FAFAFA] text-center md:text-left mb-6 md:mb-0">Magazin</h1>
        
        <div className="relative w-full md:w-auto">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden flex justify-center mb-4">
          <motion.button 
  onClick={() => setIsFilterOpen(!isFilterOpen)}
  whileTap={{ scale: 0.95 }}
  className="bg-[#9F1E07] text-[#FAFAFA] px-4 py-2 rounded flex items-center gap-2 relative overflow-hidden"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ 
    type: "spring", 
    stiffness: 300, 
    damping: 10 
  }}
>
  {isFilterOpen ? (
    <X className="w-5 h-5" />
  ) : (
    <Filter className="w-5 h-5" />
  )}
  <span className="relative">
    Filtre
    <motion.div 
      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FAFAFA]"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }}
    />
  </span>
</motion.button>
          </div>

          {/* Filter Container */}
          <div 
            className={`
              ${isFilterOpen ? 'block' : 'hidden'} 
              md:block absolute z-50 md:static w-full md:w-auto bg-[#2D1A4A] md:bg-transparent
              rounded-lg shadow-lg md:shadow-none p-4 md:p-0 mt-2 md:mt-0
            `}
          >
            <div 
              className="absolute inset-0 rounded-lg z-0 md:hidden"
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
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-4 items-center">
              <CustomDropdown
                options={fieldChoices.culoare_rama}
                value={selectedFrame}
                onChange={setSelectedFrame}
                placeholder="Culoarea Ramei"
              />
              
              <CustomDropdown
                options={fieldChoices.sticla}
                value={selectedBottle}
                onChange={setSelectedBottle}
                placeholder="Alege Sticla"
              />

              <CustomDropdown
                options={fieldChoices.marime}
                value={selectedSize}
                onChange={setSelectedSize}
                placeholder="Marime"
              />

              <motion.button 
                onClick={resetFilters}
                whileTap={{ scale: 0.95 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="bg-[#9F1E07] text-[#FAFAFA] px-4 py-2 rounded border border-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-[#9F1E07] hover:border-[#9F1E07] transition-colors duration-200 font-faculty whitespace-nowrap w-full md:w-auto"
              >
                Reset Filtre
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {storeItems.map((item) => (
          <StoreItem
            key={item.id}
            id={item.id}            
            title={item.Titlu}
            price={item.Pret}
            imageUrl={getAssetURL(item.Imagine_produs)}
            bottleType={item.sticla}
            size={item.Marime}
            backgroundImageUrl={getAssetURL(item.Imagine_logo)}
          />
        ))}
      </div>
    </div>
  );
};

export default StoreSection;