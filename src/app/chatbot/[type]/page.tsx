"use client";

import { ChevronLeft, Mic, Send,  } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useChat } from "@/context/chatbot";
import RecordingOverlay from "@/components/global/recording-overlay";
import { useEffect, useState } from "react";
import Option from "@/components/global/options";
import { useParams } from "next/navigation";
import { features } from "@/constants";
import GradientText from "@/components/global/grdient-text";
import Link from "next/link";

export default function ChatInterface() {
  const { type } = useParams();
  const feature = features.find((f) => f.href === `/${type}`);

 

  const { messages, addMessage, input, setInput, isTyping, messagesEndRef } =
    useChat();
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, messagesEndRef]); // Added messagesEndRef to dependencies

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;
    if (feature) addMessage("user", input, feature?.href);
  };

  return (
    <div className="flex flex-col min-h-screen  bg-black text-white">
        <div className="absolute top-10 left-10">
            <Link href={'/chatbot'} >
        <ChevronLeft />
            </Link>
        </div>
      <main className="flex flex-col h-screen justify-center items-center max-w-4xl mx-auto w-full p-4">

        <GradientText element="H1" className="text-4xl font-bold mb-10">
          {feature?.title}
        </GradientText>

        <Card className="bg-zinc-900 border-zinc-800 w-full">
          <div
            className={` ${
              messages.length > 0 ? "h-[60vh]" : "hidden"
            }  overflow-y-auto p-4 space-y-4`}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-800 text-gray-100"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 text-gray-100 rounded-lg p-3 max-w-[80%]">
                  <div className="flex space-x-2">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce delay-100">●</span>
                    <span className="animate-bounce delay-200">●</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-zinc-800"
          >
            <div className="relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message..."
                className="min-h-[50px] w-full bg-zinc-800 border-zinc-700 text-white resize-none pr-24"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <div className="absolute right-2 bottom-2 flex space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                  onClick={() => setOverlayOpen(true)}
                >
                  <Mic className="h-5 w-5" />
                </Button>

                <Button type="submit" size="icon" disabled={!input.trim()}>
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </div>
          </form>
        </Card>

        <p className="text-xs text-center mt-4 text-gray-400">
          AI may make mistakes. Please use with discretion.
        </p>
        {messages.length !== 0 ? null : <Option modal={ feature?.href|| '/itr-form-recommendation'} />}
      </main>

      <RecordingOverlay
        isOpen={overlayOpen}
        setClose={() => setOverlayOpen(false)}
        modal={feature?.href || "/itr-form-recommendation"}
      />
    </div>
  );
}
