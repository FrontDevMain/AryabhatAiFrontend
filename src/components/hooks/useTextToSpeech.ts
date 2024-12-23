import { useState, useEffect } from "react";

const useTextToSpeech = (text: string) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<any>(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u: any = new SpeechSynthesisUtterance(text);

    u.onend = () => {
      setIsSpeaking(false);
    };

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else {
      utterance.pitch = 1.0; // Adjust pitch for natural tone
      utterance.rate = 1; // Slightly faster rate for natural Indian speech
      utterance.volume = 1;
      synth.speak(utterance);
      setIsSpeaking(true);
    }

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
    setIsSpeaking(false);
  };

  return { isSpeaking, handlePlay, handlePause, handleStop, isPaused };
};

export default useTextToSpeech;
