'use client'
import { chatWithGroq } from "@/actions/chatbot";
import React, { createContext, useContext, useReducer, useRef, ReactNode } from "react";

// Define message type
interface ChatMessage {
    role: "user" | "assistant";
    content: string;
    chatbot:string;
}

// Define state structure
interface ChatState {
    messages: ChatMessage[];
    input: string;
    isTyping: boolean;
}

// Define action types
type ChatAction =
    | { type: "ADD_MESSAGE"; payload: ChatMessage }
    | { type: "CLEAR_MESSAGES" }
    | { type: "SET_INPUT"; payload: string }
    | { type: "SET_TYPING"; payload: boolean };

// Reducer function
const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
    switch (action.type) {
        case "ADD_MESSAGE":
            return { ...state, messages: [...state.messages, action.payload] };
        case "CLEAR_MESSAGES":
            return { ...state, messages: [] };
        case "SET_INPUT":
            return { ...state, input: action.payload };
        case "SET_TYPING":
            return { ...state, isTyping: action.payload };
        default:
            return state;
    }
};

// Create context type
export interface ChatContextType {
    messages: ChatMessage[];
    input: string;
    isTyping: boolean;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
    addMessage: (role: "user" | "assistant", content: string,chatbot:string) => void;
    clearMessages: () => void;
    setInput: (text: string) => void;
    setTyping: (status: boolean) => void;
}

// Create Chat Context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider Component
export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(chatReducer, {
        messages: [],
        input: "",
        isTyping: false,
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Action functions
    const addMessage = async (role: "user" | "assistant", content: string,chatbot:string) => {
        // Immediately update UI with the new user message
        dispatch({ type: "ADD_MESSAGE", payload: { role, content, chatbot } });
    
        // If user is sending a message, process response
        if (role === "user") {
            setInput(""); // Clear input field
            setTyping(true); // Show typing indicator
    
            try {
                const response = await chatWithGroq(content,chatbot); // Get AI response
                dispatch({ type: "ADD_MESSAGE", payload: { role: "assistant", content: response,chatbot } });
            } catch (error) {
                console.error("Error fetching AI response:", error);
                dispatch({ type: "ADD_MESSAGE", payload: { role: "assistant", content: "Oops! Something went wrong.",chatbot } });
            } finally {
                setTyping(false); // Hide typing indicator
            }
        }
    };
    

    const clearMessages = () => {
        dispatch({ type: "CLEAR_MESSAGES" });
    };

    const setInput = (text: string) => {
        dispatch({ type: "SET_INPUT", payload: text });
    };

    const setTyping = (status: boolean) => {
        dispatch({ type: "SET_TYPING", payload: status });
    };

    return (
        <ChatContext.Provider
            value={{
                messages: state.messages,
                input: state.input,
                isTyping: state.isTyping,
                messagesEndRef,
                addMessage,
                clearMessages,
                setInput,
                setTyping,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

// Custom Hook to use Chat Context
export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};
