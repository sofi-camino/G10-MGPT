import { useState } from "react";
import { getChatGPTResponse } from "./lib/utils";
import openai_image from "./assets/openai.png";

const EXAMPLE_PROMPT = `Hola,
La verdad es que no le entendí nada a tu última clase. ¿Podrías explicar eso otra vez? Si no, me rindo.
Saludos, Mario Droguett
`

function App() {
  const [text, setText] = useState(EXAMPLE_PROMPT);
  const [response, setResponse] = useState("");
  const handleClick = () => {
    getChatGPTResponse(text).then((res) => {
      setResponse(res);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12 py-12 bg-neutral-600 text-white h-screen">
      <h2 className="text-2xl font-bold">Montoya GPT - G10</h2>

      <div className="flex flex-row">
        <textarea
          className="p-2 border-2 h-64 w-96 rounded-md bg-neutral-500 border-neutral-400 resize-none rounded-r-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          onClick={handleClick}
          className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md rounded-l-none"
        >
          Enviar
        </button>
      </div>
      <div className="flex flex-row space-x-5">
        <div className="flex flex-col items-center">
          <img src={openai_image} alt="robot" className="h-10 w-10" />
          <h2 className="text-lg font-semibold">ChatGPT</h2>
        </div>
        <div className="p-2 border-2 h-64 w-96 rounded-md text-left font-mono bg-neutral-500 border-neutral-400 overflow-y-scroll">
          {response}
        </div>
      </div>
    </div>
  );
}

export default App;
