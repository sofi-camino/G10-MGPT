import { useState } from "react";
import { ChatGPT, ChatGPTAzure } from "./lib/utils";
import openai_image from "./assets/openai.png";
import { SlowText } from "./components/SlowText";

const EXAMPLE_PROMPT = `Hola,
La verdad es que no le entendí nada a tu última clase. ¿Podrías explicar eso otra vez? Si no, me rindo.
Saludos, Juan Pablo
`;

function App() {
  // const { getOpenAIResponse, loading } = ChatGPT();
  const { getOpenAIResponse, loading } = ChatGPTAzure(); // for azure api
  const [text, setText] = useState(EXAMPLE_PROMPT);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const handleClick = () => {
    getOpenAIResponse(text)
      .then((res) => {
        // console.log(res)
        setError("");
        setResponse(res);
      })
      .catch((error) => {
        console.log(error);
        setError(
          "Ha ocurrido un error con la API de ChatGPT. Revisa la consola para más información."
        );
      });
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12 py-12 bg-neutral-700 text-white min-h-screen">
      <h2 className="text-2xl font-bold">Montoya GPT - G10</h2>

      <div className="flex flex-row">
        <textarea
          className="p-3 border-2 h-64 w-[600px] rounded-md bg-neutral-600 border-neutral-500 resize-none rounded-r-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          onClick={handleClick}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-md rounded-l-none"
        >
          Enviar
        </button>
      </div>
      <div className="flex flex-row space-x-5">
        <div className="flex flex-col items-center">
          <img src={openai_image} alt="robot" className="h-10 w-10" />
          <h2 className="text-lg font-semibold">ChatGPT</h2>
        </div>
        <div className="p-3 border-2 min-h-64 w-[600px] rounded-md text-justify bg-neutral-600 border-neutral-500 transition-all">
          {loading && "Cargando..."}
          {!loading && <SlowText speed={20} text={response} />}
        </div>
      </div>
      <div>
        {error !== "" && (
          <span className="bg-red-400 p-4 rounded-xl">{error}</span>
        )}
      </div>
    </div>
  );
}

export default App;
