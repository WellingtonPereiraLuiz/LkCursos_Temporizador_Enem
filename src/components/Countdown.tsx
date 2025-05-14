import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import Confetti from 'react-confetti';
import { formatDistanceToNowStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Countdown: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Target date for ENEM 2025
  const [targetDate, setTargetDate] = useState(new Date(2025, 10, 9, 13, 15, 0));
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  // Update window size when resized
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to calculate time remaining
  const calculateTimeRemaining = useCallback(() => {
    const now = new Date();
    
    // If target date is in the past, set new target date for next year
    if (now >= targetDate) {
      // After 24 hours of completing, reset to next year
      if ((now.getTime() - targetDate.getTime()) > 24 * 60 * 60 * 1000) {
        const nextYear = targetDate.getFullYear() + 1;
        setTargetDate(new Date(nextYear, 10, 9, 13, 15, 0));
        setIsComplete(false);
        setShowConfetti(false);
        return;
      } else if (!isComplete) {
        // Just reached zero
        setIsComplete(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 10000); // Stop confetti after 10 seconds
        return;
      }
    }

    const difference = targetDate.getTime() - now.getTime();
    
    if (difference <= 0) {
      setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    setTimeRemaining({ days, hours, minutes, seconds });
  }, [targetDate, isComplete]);

  // Effect to update countdown every second
  useEffect(() => {
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, [calculateTimeRemaining]);

  return (
    <section 
      id="enem" 
      className="section bg-[#1A1A1A] relative overflow-hidden"
      ref={ref}
    >
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={['#A8E10C', '#6AFF00', '#FFD700', '#FFFFFF']}
        />
      )}
      
      <div 
        className={`container mx-auto px-4 text-center transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
          Contagem Regressiva para o ENEM 2025
          <span className="absolute bottom-0 left-0 w-full h-1 bg-[#A8E10C]"></span>
        </h2>
        
        <p className="text-lg md:text-xl text-[#CCCCCC] max-w-3xl mx-auto mb-12">
          Cada segundo conta na sua jornada. Fique de olho no tempo restante e organize seus estudos.
        </p>
        
        {isComplete ? (
          <div className="animate-fade-in">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#A8E10C] neon-text">
              Já chegou a hora! Mantenha o foco!
            </h3>
            <p className="text-xl text-white">
              O ENEM está acontecendo agora. Confiamos no seu potencial!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              {Object.entries(timeRemaining).map(([unit, value]) => (
                <div 
                  key={unit}
                  className="bg-[#2B2B2B] p-6 rounded-lg shadow-lg border-2 border-[#A8E10C] glow-border"
                >
                  <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                    {value}
                  </div>
                  <div className="text-sm md:text-base uppercase tracking-wide text-[#CCCCCC]">
                    {unit}
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-xl text-[#A8E10C] font-semibold mt-8">
              {formatDistanceToNowStrict(targetDate, { 
                addSuffix: true,
                locale: ptBR 
              })}
            </p>
          </>
        )}
        
        <div className="mt-16 bg-[#2B2B2B] p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-[#A8E10C]">Preparação Final</h3>
          <p className="text-[#CCCCCC] mb-6">
            O tempo está passando! Garanta que você está revisando todos os conteúdos importantes 
            e fazendo simulados regularmente. Lembre-se dos nossos pilares: 
            <strong> Força, Foco e Fé</strong>!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-[#1A1A1A] p-4 rounded-lg border-l-4 border-[#A8E10C] text-left flex-1 min-w-[250px]">
              <h4 className="text-lg font-bold mb-2 text-white">Dica Rápida</h4>
              <p className="text-sm text-[#CCCCCC]">
                Estude por 45 minutos e descanse por 15. Este ciclo mantém seu cérebro alerta 
                e melhora a retenção de informações.
              </p>
            </div>
            <div className="bg-[#1A1A1A] p-4 rounded-lg border-l-4 border-[#A8E10C] text-left flex-1 min-w-[250px]">
              <h4 className="text-lg font-bold mb-2 text-white">Lembretes</h4>
              <p className="text-sm text-[#CCCCCC]">
                Prepare seus documentos com antecedência. Cartão de confirmação, documento com 
                foto e caneta preta transparente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;