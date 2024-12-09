'use client';

import React, { createContext, useContext, useState } from 'react';

interface AudioContextType {
  bassValue: number;
  setBassValue: (value: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [bassValue, setBassValue] = useState(0);

  return (
    <AudioContext.Provider value={{ bassValue, setBassValue }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}