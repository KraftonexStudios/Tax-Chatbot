'use client'

import { useRecording } from "@/hooks/use-recording";
import {  useEffect } from "react";

const AudioRecorder = () => {
 
    const { isRecording, audioURL, startRecording,stopRecording } = useRecording();

    useEffect(() => {
        if (isRecording) {
        } else {
        }
    }, [isRecording]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <button onClick={startRecording} disabled={isRecording} onDoubleClick={stopRecording}>
        {isRecording ? "Recording..." : "Recording"}
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      {audioURL && (
        <audio controls>
          <source src={URL.createObjectURL(audioURL)} type="audio/wav" />
        </audio>
      )}
    </div>
  );
};

export default AudioRecorder;
