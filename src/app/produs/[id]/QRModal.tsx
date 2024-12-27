import React from 'react';
import { X } from 'lucide-react';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div 
        className="relative w-full max-w-lg mx-4 p-8 rounded-lg"
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
        
        <div className="relative z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#FAFAFA] hover:text-[#9F1E07] transition-colors duration-300"
          >
            <X size={24} />
          </button>

          <h2 className="text-2xl font-lacquer text-[#FAFAFA] mb-6 text-center">
            Scanează pentru a vedea procesul de fabricație
          </h2>

          <div className="bg-white p-4 rounded-lg w-64 h-64 mx-auto mb-6">
            <img
              src="/qr-code.png"
              alt="QR Code"
              className="w-full h-full"
            />
          </div>

          <p className="text-[#FAFAFA]/80 font-montserrat text-center text-sm">
            Scanează codul QR cu camera telefonului pentru a urmări întregul proces de fabricație al acestei piese unice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRModal;