import { faqs } from "@/constants";
import React from "react";
import Button from "./button";
import { useChat } from "@/context/chatbot";

const Option = ({modal}:{modal:string}) => {
  const { addMessage } = useChat();

  const handleClick = (faq:any) => {
    addMessage("user", faq.question,modal);
  };
  return (
    <div className={` flex w-full justify-center  flex-wrap gap-3 mt-4`}>
      {faqs.map((faq, index) => (
        <div key={index} className=" " onClick={() => handleClick(faq)}>
          <Button>{faq.question}</Button>
        </div>
      ))}
    </div>
  );
};

export default Option;
