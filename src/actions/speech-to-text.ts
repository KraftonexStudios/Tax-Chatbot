'use server'

export const transcribeAudioGroq = async (audioBlob: Blob|null): Promise<string | null> => {
    try {
        if (!audioBlob) {
            return null;    
        }
        const formData = new FormData();
        const audioFile = new File([audioBlob], "audio.wav", { type: "audio/wav" });
        formData.append("file", audioFile);
        // Attach the audio file
        formData.append("model", "distil-whisper-large-v3-en"); // Specify the model
        
        const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            },
            body: formData,
        });
        
        // Check if the request was successful
        if (!response.ok) {
            const errorResponse = await response.text();
            console.error("Groq API Error:", errorResponse);
            return null;
        }
        
        const data = await response.json();
        console.log("Groq API Response:", data);
        return data.text || null;
        
        
// Return transcribed text
    } catch (error) {
        console.log("Error transcribing audio:", error);
        return null;
    }
};
