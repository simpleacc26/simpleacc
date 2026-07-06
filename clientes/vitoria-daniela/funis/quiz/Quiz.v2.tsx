import { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { Question } from './Question';
import { LeadForm } from './LeadForm';
import { ProgressBar } from './ProgressBar';

export function Quiz() {
  const {
    currentStep,
    totalSteps,
    currentQuestion,
    handleAnswer,
    handleBack,
    submitLead,
    isSubmitting,
    submissionError,
  } = useQuizLogic();

  const isQuestion = currentStep >= 0 && currentStep < totalSteps;
  const isLeadForm = currentStep === totalSteps;
  const isSuccess = currentStep === totalSteps + 1;

  const variants = useMemo(() => ({
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  }), []);

  useEffect(() => {
    if (isSuccess) {
      const duration = 2500;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 45,
          origin: { x: 0 },
          colors: ['#C5A059', '#ffffff'],
          ticks: 50,
          gravity: 1.2,
          scalar: 0.7
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 45,
          origin: { x: 1 },
          colors: ['#C5A059', '#ffffff'],
          ticks: 50,
          gravity: 1.2,
          scalar: 0.7
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      const timer = setTimeout(() => {
        window.location.href = 'https://lp.vitoriadaniela.com.br/';
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const HeroHeader = useMemo(() => (
    <div className="space-y-6 text-center md:text-left mb-10">
      <h1 className="font-serif text-3xl md:text-4xl text-white leading-tight text-center">
        <span className="text-[#C5A059] font-bold">Descubra como trazer a autoridade que você já possui no offline para a internet</span> e atraia clientes de alto valor.
      </h1>
      <p className="text-stone-400 text-base leading-relaxed max-w-xl mx-auto md:mx-0">
        Para especialistas e empresários de serviço de excelência. Em 3 minutos, descubra como atrair clientes de maior poder aquisitivo e crescer com previsibilidade no digital.
      </p>
    </div>
  ), []);

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-white overflow-hidden relative selection:bg-[#C5A059]/30 selection:text-[#C5A059]">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Progress Bar - Only during questions */}
      {isQuestion && <ProgressBar current={currentStep} total={totalSteps} />}

      {/* Top Navigation / Brand */}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-40 pointer-events-none">
        <div className="pointer-events-auto">
          {currentStep > 0 && isQuestion && (
            <button
              onClick={handleBack}
              className="p-2 -ml-2 text-stone-500 hover:text-white transition-colors flex items-center gap-1 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          )}
        </div>

        {/* Step Indicator */}
        {isQuestion && (
          <div className="text-stone-600 text-xs font-medium tracking-widest uppercase">
             {currentStep + 1} / {totalSteps}
          </div>
        )}
      </header>

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center py-12">
        <AnimatePresence mode="wait">
          {isQuestion && (
            <motion.div
              key={`question-${currentQuestion.id}`}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full"
            >
              <Question
                question={currentQuestion}
                onAnswer={(ans) => handleAnswer(currentQuestion.id, ans)}
                header={currentStep === 0 ? HeroHeader : undefined}
              />
            </motion.div>
          )}

          {isLeadForm && (
            <motion.div
              key="lead-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full px-4"
            >
              <LeadForm
                onSubmit={submitLead}
                isSubmitting={isSubmitting}
                error={submissionError}
              />
            </motion.div>
          )}

          {isSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 px-6 max-w-lg mx-auto"
            >
              <div className="w-24 h-24 bg-[#C5A059]/10 text-[#C5A059] rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_-5px_rgba(197,160,89,0.3)] border border-[#C5A059]/20">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-white">
                Diagnóstico Enviado!
              </h2>
              <p className="text-stone-400 text-lg">
                Você será redirecionada em instantes...
              </p>
              <div className="pt-4">
                 <div className="h-1 w-32 bg-stone-900 rounded-full mx-auto overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3.5, ease: "linear" }}
                        className="h-full bg-[#C5A059]"
                    />
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
