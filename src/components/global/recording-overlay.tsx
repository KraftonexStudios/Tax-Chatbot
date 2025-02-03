"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mic, X, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { transcribeAudioGroq } from "@/actions/speech-to-text";
import { useChat } from "@/context/chatbot";
import { useRecording } from "@/hooks/use-recording";

interface RecordingOverlayProps {
  isOpen: boolean;
  setClose: () => void;
    modal: string;
}

export default function RecordingOverlay({
  isOpen,
  setClose,
  modal,
}: RecordingOverlayProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { addMessage } = useChat();
  const { isRecording, startRecording, stopRecording, audioURL } =
    useRecording();

  const handleStopRecording = async () => {
    setIsProcessing(true);
    stopRecording();
  };

  useEffect(() => {
    if (audioURL) {
      processAudio(audioURL);
    }
  }, [audioURL]);

  const processAudio = async (audioURL: Blob) => {
    console.log("Processing audio:", audioURL);

    const text = await transcribeAudioGroq(audioURL);
    if (text) {
      addMessage("user", text,modal);
    } else {
      alert("Error transcribing audio");
    }
    setIsProcessing(false);
    setClose();
  };

  useEffect(() => {
    if (isOpen) {
      startRecording();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:text-white/80"
            onClick={setClose}
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="text-center">
            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.div
                  key="processing"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="flex flex-col items-center gap-4"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Loader2 className="h-16 w-16 text-red-500" />
                  </motion.div>
                  <p className="text-white text-xl font-medium">
                    Processing...
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="recording"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="flex flex-col items-center gap-4"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative z-50"
                  >
                    <Button
                      size="lg"
                      className={`${
                        isRecording ? "bg-red-500" : "bg-blue-500/80"
                      }   h-16 w-16 rounded-full cursor-pointer z-40`}
                      onClick={
                        isRecording ? handleStopRecording : startRecording
                      }
                    >
                      <Mic className="h-8 w-8" />
                    </Button>
                    <motion.div
                      animate={{
                        scale: [1, 1.5],
                        opacity: [0.6, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      className="absolute inset-0 rounded-full bg-red-500/50 pointer-events-none"
                    />
                    <motion.div
                      animate={{
                        scale: [1, 2],
                        opacity: [0.4, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.3,
                      }}
                      className="absolute inset-0 rounded-full bg-red-500/30 pointer-events-none"
                    />
                  </motion.div>
                  <motion.p
                    animate={{
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-white text-xl font-medium"
                  >
                    {isRecording ? "Click To Stop Recording" : "Click To Start Recording"}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
