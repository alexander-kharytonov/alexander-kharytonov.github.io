'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Backdrop, Button, Typography } from '@mui/material';

const GREETING_LOCALSTORAGE_KEY = 'greeting';

export default function Greeting() {
  const t = useTranslations('greeting');
  const [showGreeting, setShowGreeting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const messages = [
    t('Hello'),
    t('My name is Alexander Kharytonov'),
    t('Im a Software Engineer and UI Developer'),
    t('Perhaps Im the one youve been looking for'),
  ];

  const handleCloseGreeting = () => {
    setShowGreeting(false);
    setCurrentStep(0);
  };

  const handleShowGreeting = () => {
    setShowGreeting(true);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (!localStorage.getItem(GREETING_LOCALSTORAGE_KEY)) {
      handleShowGreeting();
      localStorage.setItem(GREETING_LOCALSTORAGE_KEY, 'true');
    }
  }, []);

  useEffect(() => {
    if (!showGreeting) return;

    if (currentStep < messages.length - 1) {
      const stepTimeout = setTimeout(
        () => setCurrentStep((prev) => prev + 1),
        3000,
      );

      return () => clearTimeout(stepTimeout);
    }

    const endTimeout = setTimeout(() => handleCloseGreeting(), 5000);
    return () => clearTimeout(endTimeout);
  }, [showGreeting, currentStep, messages.length]);

  return (
    <>
      <Button onClick={handleShowGreeting}>
        <Typography variant="button">Показать приветствие</Typography>
      </Button>
      <Backdrop
        open={showGreeting}
        onClick={handleCloseGreeting}
        sx={(theme) => ({
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: 'background.default',
        })}
        transitionDuration={{ enter: 500, exit: 500 }}
      >
        <AnimatePresence>
          {showGreeting && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -10 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.4, 1] }}
              key={currentStep}
            >
              <Typography
                variant="h5"
                align="center"
                sx={{
                  textShadow: '0 0 10px rgba(255,255,255,0.3)',
                }}
              >
                {messages[currentStep]}
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Backdrop>
    </>
  );
}
