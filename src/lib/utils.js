import { useState } from "react";
import axios from "axios";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

const INITIAL_PROMPT = `Soy un ia que ayuda a estudiantes y profesores reescribir
sus correos siguiendo la siguiente estructura:
Saludo, Presentación, Exposición del caso y Requerimiento, Despedida.
Envía un mensaje para comenzar y yo lo redactaré por ti.
Ten en cuenta que tienes 100 tokens de escritura como máximo.
`;

export const ChatGPT = () => {
  const [loading, setLoading] = useState(false);
  const getOpenAIResponse = async (message) => {
    setLoading(true);
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: INITIAL_PROMPT },
        { role: "user", content: message },
      ],
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    };
    const response = await axios.post(
      import.meta.env.VITE_OPENAI_API_URL,
      data,
      { headers }
    );
    setLoading(false);
    return response.data.choices[0].text;
  };

  return { getOpenAIResponse, loading };
};

export const ChatGPTAzure = () => {
  const [loading, setLoading] = useState(false);
  const openai = new OpenAIClient(
    import.meta.env.VITE_OPENAI_API_URL,
    new AzureKeyCredential(import.meta.env.VITE_OPENAI_API_KEY),
    {
      apiVersion: "2023-07-01-preview",
    }
  );
  const getOpenAIResponse = async (message) => {
    setLoading(true);
    const response = await openai.getChatCompletions(
      "gpt-35-turbo",
      [
        { role: "system", content: INITIAL_PROMPT },
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
    // console.log(response.choices);
    return response.choices[0].message.content;
  };
  return { getOpenAIResponse, loading };
};
