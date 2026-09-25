import React from 'react';
import { motion } from 'framer-motion';

interface AudioWaveformProps {
  isRecording: boolean;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({ isRecording }) => {
  const bars = [12, 24, 38, 52, 28, 44, 60, 32, 18, 48, 36, 20, 56, 40, 22];

  return (
    <div className="flex items-center justify-center gap-1.5 h-16 px-4">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          animate={{
            height: isRecording
              ? [height * 0.4, height * 1.2, height * 0.5, height]
              : 8,
            backgroundColor: isRecording
              ? ['#C85A32', '#D4AF37', '#582C12', '#C85A32']
              : '#D4AF37'
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: i * 0.04
          }}
          className="w-1.5 rounded-full"
        />
      ))}
    </div>
  );
};
