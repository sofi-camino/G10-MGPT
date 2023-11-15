import { useState } from "react";
import axios from "axios";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

const API_URL = import.meta.env.VITE_OPENAI_API_URL || "your-api-url";
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "your-api-key";

const INITIAL_PROMPT = (formalityType = "formal") =>
  `I can write a maximum of 100 tokens per message.
I am an AI that helps students and teachers rewrite
their emails following the following structure:
Greeting, Presentation, Case Exposure and Requirement, Farewell.
Send a message to start and I will write / rewrite it for you.
The rewriting I do will be of type ${formalityType} and
I will rewrite it in the same language that you write to me.
I will not respond to your messages, I will only rewrite them or change the wording.
`;

export const ChatGPT = () => {
  const [loading, setLoading] = useState(false);
  const getOpenAIResponse = async (message, formalityType) => {
    setLoading(true);
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: INITIAL_PROMPT(formalityType) },
        { role: "user", content: message },
      ],
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    };
    const response = await axios.post(API_URL, data, { headers });
    setLoading(false);
    return response.data.choices[0].text;
  };

  return { getOpenAIResponse, loading };
};

export const ChatGPTAzure = () => {
  const [loading, setLoading] = useState(false);
  /* getOpenAIResponse: 
  (message: string, formalityType: "formal" | "normal" | "colloquial")
   => Promise<string> */
  const getOpenAIResponse = async (message, formalityType) => {
    setLoading(true);
    const openai = new OpenAIClient(API_URL, new AzureKeyCredential(API_KEY), {
      apiVersion: "2023-07-01-preview",
    });
    const response = await openai.getChatCompletions(
      "gpt-35-turbo",
      [
        { role: "system", content: INITIAL_PROMPT(formalityType) },
        { role: "user", content: message },
      ],
      {
        maxTokens: 150,
        temperature: 0.7,
        topP: 0.95,
        frequencyPenalty: 0,
        presencePenalty: 0,
      }
    );
    setLoading(false);
    return response.choices[0].message.content;
  };
  return { getOpenAIResponse, loading };
};
