import axios from "axios";

// import.meta.env.VITE_OPENAI_API_KEY
// import.meta.env.VITE_OPENAI_API_URL

const INITIAL_PROMPT = `Redacta un correo electrónico siguiendo el "método Montoya" para escribir a un profesor.
Asegúrate de incluir las siguientes secciones:
Saludo, Presentación, Exposición del caso y Requerimiento.`;

// https://javascriptcentric.medium.com/how-to-use-openai-with-react-212d7d632854
export const getChatGPTResponse = async (message) => {
  return message;
};
