import React from 'react';
import { useInView } from 'react-intersection-observer';

const Hero: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollToEnem = () => {
    const enemSection = document.getElementById('enem');
    if (enemSection) {
      enemSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="section bg-[#1A1A1A] relative overflow-hidden"
      ref={ref}
    >
      <div 
        className={`container mx-auto flex flex-col items-center justify-center text-center px-4 transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="w-full max-w-3xl mx-auto mb-4">
          <img 
            src="/imagen/logo e tema.png"
            alt="LK Cursos Logo"
            className="w-full h-auto"
          />
        </div>
        
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#A8E10C]">
            A dor passa, a aprovação fica!
          </h1>
          
          <p className="text-xl md:text-2xl text-[#CCCCCC] mb-4">
            <span className="text-[#A8E10C] font-bold">FORÇA</span> para lutar. 
            <span className="text-[#A8E10C] font-bold"> FOCO</span> no objetivo. 
            <span className="text-[#A8E10C] font-bold"> FÉ</span> para vencer.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
          <button 
            onClick={scrollToEnem}
            className="button bg-[#A8E10C] hover:bg-[#6AFF00] text-black px-8 py-3 rounded-md text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Ver Contador
          </button>
        </div>
        
        <div className="mt-12 flex justify-center">
          <div className="animate-bounce">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-[#A8E10C]"
            >
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;