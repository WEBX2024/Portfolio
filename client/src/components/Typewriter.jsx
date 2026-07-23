import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Typewriter({ text, delay = 0, speed = 100, className = '' }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    let i = 0;
    let typingInterval;
    let waitTimeout;

    const startTyping = () => {
      setIsWaiting(false);
      setDisplayedText('');
      i = 0;
      
      typingInterval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(typingInterval);
          setIsWaiting(true);
          waitTimeout = setTimeout(startTyping, 10000);
        }
      }, speed);
    };

    const initialDelay = setTimeout(startTyping, delay * 1000);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(initialDelay);
      clearTimeout(waitTimeout);
    };
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {displayedText}
      {!isWaiting && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
          style={{ color: 'var(--color-accent)' }}
        >
          |
        </motion.span>
      )}
    </span>
  );
}
