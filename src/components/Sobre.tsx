import React from 'react';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

const Sobre: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cards = [
    {
      title: 'ENEM',
      icon: <GraduationCap size={48} className="text-[#A8E10C] mb-4" />,
      description: 'Preparação completa para o Exame Nacional do Ensino Médio com metodologia comprovada e material didático exclusivo.'
    },
    {
      title: 'SISU',
      icon: <Award size={48} className="text-[#A8E10C] mb-4" />,
      description: 'Orientação especializada para o Sistema de Seleção Unificada, maximizando suas chances de ingresso nas melhores universidades.'
    },
    {
      title: 'ProUni',
      icon: <BookOpen size={48} className="text-[#A8E10C] mb-4" />,
      description: 'Suporte completo para conquista de bolsas através do Programa Universidade para Todos, desde a inscrição até a matrícula.'
    }
  ];

  return (
    <section 
      id="sobre" 
      className="section bg-[#2B2B2B] py-20"
      ref={ref}
    >
      <div 
        className={`container mx-auto px-4 transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
            Quem Somos
            <span className="absolute bottom-0 left-0 w-full h-1 bg-[#A8E10C]"></span>
          </h2>
          
          <p className="text-lg md:text-xl text-[#CCCCCC] max-w-3xl mx-auto">
            Desde 2016, a LK Cursos tem se destacado na preparação de estudantes para o ENEM e concursos públicos. 
            Nossa missão é transformar a vida de jovens através da educação, com valores baseados nos três pilares: 
            <span className="text-[#A8E10C] font-semibold"> Força para lutar, Foco no objetivo e Fé para vencer</span>.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div 
              key={index}
              className={`bg-[#1A1A1A] p-8 rounded-lg shadow-lg transition-all duration-500 hover:transform hover:scale-105 hover:shadow-xl text-center ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex flex-col items-center">
                {card.icon}
                <h3 className="text-2xl font-bold mb-4 text-[#A8E10C]">{card.title}</h3>
                <p className="text-[#CCCCCC]">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-[#1A1A1A] p-8 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold mb-4 text-[#A8E10C]">Nossa História</h3>
              <p className="text-[#CCCCCC] mb-4">
                A LK Cursos nasceu da paixão pela educação e da vontade de transformar a vida de estudantes. 
                Começamos como um pequeno grupo de estudos e hoje somos referência em aprovações.
              </p>
              <p className="text-[#CCCCCC]">
                Com mais de 70% de aprovações, nosso método tem comprovado que, com a orientação correta, 
                qualquer estudante pode alcançar seus objetivos acadêmicos e profissionais.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="bg-[#2B2B2B] p-6 rounded-lg border-l-4 border-[#A8E10C]">
                <h4 className="text-xl font-bold mb-2 text-white">Nossos Valores</h4>
                <ul className="space-y-2 text-[#CCCCCC]">
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-[#A8E10C] rounded-full mr-2"></span>
                    <strong>FORÇA</strong> para lutar - Persistência e resiliência nos estudos
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-[#A8E10C] rounded-full mr-2"></span>
                    <strong>FOCO</strong> no objetivo - Concentração e dedicação diária
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-[#A8E10C] rounded-full mr-2"></span>
                    <strong>FÉ</strong> para vencer - Confiança no processo e no potencial
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sobre;