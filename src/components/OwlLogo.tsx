import React from 'react';

interface OwlLogoProps {
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const OwlLogo: React.FC<OwlLogoProps> = ({ 
  animate = false,
  size = 'md'
}) => {
  let sizeClass;
  switch (size) {
    case 'sm':
      sizeClass = 'w-12 h-12';
      break;
    case 'lg':
      sizeClass = 'w-32 h-32';
      break;
    case 'md':
    default:
      sizeClass = 'w-full h-full';
  }

  return (
    <div className={`${sizeClass} relative`}>
      {/* This is a stylized representation of the owl logo using CSS */}
      <div className="w-full h-full relative">
        {/* Owl body */}
        <div className="absolute inset-0 bg-[#1A1A1A] rounded-full transform scale-90"></div>
        
        {/* Owl head */}
        <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 bg-[#2B2B2B] rounded-full"></div>
        
        {/* Owl wings */}
        <div className="absolute top-1/4 left-0 w-1/3 h-2/3 bg-[#A8E10C] rounded-l-full"></div>
        <div className="absolute top-1/4 right-0 w-1/3 h-2/3 bg-[#A8E10C] rounded-r-full"></div>
        
        {/* Owl ears */}
        <div className="absolute top-0 left-1/3 w-1/6 h-1/4 bg-[#2B2B2B] skew-x-12 transform -rotate-12"></div>
        <div className="absolute top-0 right-1/3 w-1/6 h-1/4 bg-[#2B2B2B] skew-x-12 transform rotate-12"></div>
        
        {/* Owl eyes */}
        <div className={`absolute top-2/5 left-1/3 w-1/6 h-1/6 bg-[#FFD700] rounded-full ${animate ? 'animate-pulse-slow' : ''}`}></div>
        <div className={`absolute top-2/5 right-1/3 w-1/6 h-1/6 bg-[#FFD700] rounded-full ${animate ? 'animate-pulse-slow' : ''}`}></div>
        
        {/* Owl beak */}
        <div className="absolute top-1/2 left-[45%] right-[45%] bottom-2/5 bg-[#FFD700] rotate-45 transform"></div>
        
        {/* Text */}
        <div className="absolute bottom-0 w-full text-center">
          <span className="text-[#A8E10C] font-bold text-lg">LK</span>
        </div>
      </div>
    </div>
  );
};

export default OwlLogo;