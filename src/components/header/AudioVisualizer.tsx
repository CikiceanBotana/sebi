'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AudioVisualizerProps {
  onBassUpdate?: (bassValue: number) => void;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ onBassUpdate }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAudio = async () => {
      try {
        const audio = new Audio('/music/casanova.mp3');
        audio.loop = true;
        audioRef.current = audio;

        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = audioContext;

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 64;
        analyserRef.current = analyser;

        const source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        audioSourceRef.current = source;

        await new Promise<void>((resolve) => {
          audio.addEventListener('loadeddata', () => resolve());
        });

        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing audio:', error);
      }
    };

    initializeAudio();

    return () => {
      if (audioContextRef.current) {
        void audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = analyserRef.current;
    if (!analyser) return;

    const audio = audioRef.current;
    if (!audio) return;

    const audioContext = audioContextRef.current;
    if (!audioContext) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      
      analyser.getByteFrequencyData(dataArray);
      
      if (onBassUpdate) {
        const bassFrequencies = dataArray.slice(0, 4);
        const bassAverage = bassFrequencies.reduce((a, b) => a + b, 0) / bassFrequencies.length;
        const normalizedBass = bassAverage / 255;
        onBassUpdate(normalizedBass);
      }
      
      ctx.fillStyle = '#17012C';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = canvas.width / bufferLength;
      let x = 0;
      
      for(let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        gradient.addColorStop(0, '#047A6E');
        gradient.addColorStop(0.5, '#2A235A');
        gradient.addColorStop(1, '#9F1E07');
        
        ctx.fillStyle = gradient;
        
        ctx.beginPath();
        ctx.roundRect(
          x,
          canvas.height - barHeight,
          barWidth - 2,
          barHeight,
          [2, 2, 0, 0]
        );
        ctx.fill();
        
        x += barWidth;
      }
    };
    
    if (isPlaying) {
      if (audioContext.state === 'suspended') {
        void audioContext.resume();
      }
      void audio.play();
      draw();
    } else {
      audio.pause();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (onBassUpdate) {
        onBassUpdate(0);
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      audio.pause();
    };
  }, [isPlaying, isInitialized, onBassUpdate]);

  const togglePlay = async () => {
    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col items-center justify-center w-96 h-12">
      <div className="relative w-full h-8">
        <canvas
          ref={canvasRef}
          width="384"
          height="32"
          className="w-full h-full rounded-md border border-[#047A6E]/20"
        />
        <button
          onClick={togglePlay}
          disabled={!isInitialized}
          className="absolute bottom-0 right-0 px-2 py-1 text-xs text-[#FAFAFA] hover:text-[#047A6E] transition-colors duration-200 font-faculty bg-[#17012C]/80 rounded-bl-md rounded-tr-md border-l border-t border-[#047A6E]/20 disabled:opacity-50"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
};

export default AudioVisualizer;