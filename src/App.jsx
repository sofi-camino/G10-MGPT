import { useState } from "react";
import { ChatGPT, ChatGPTAzure } from "./lib/utils";
import openai_image from "./assets/openai.png";
import { SlowText } from "./components/SlowText";

const EXAMPLE_PROMPT = `Hola profe, le pregunto al tiro, para mañana martes, la asistencia para las demás presentaciones es obligatoria o solo es necesario que asistamos a la nuestra?
Saludos
Juan carlos.
`;

// const EXAMPLE_PROMPT = `Hey teacher,
// I'm asking you right away, for tomorrow Tuesday, is attendance for the other presentations mandatory or is it only necessary for us to attend ours?
// `;

const SELECT_OPTIONS = [
  { value: "very formal", label: "Formal" },
  { value: "colloquial", label: "Casual" },
  {
    value: "very colloquial like 'cuico zorron de chile'",
    label: "Coloquial",
  },
];

function App() {
  // const { getOpenAIResponse, loading } = ChatGPT();
  const { getOpenAIResponse, loading } = ChatGPTAzure(); // for azure api
  const [textInput, setTextInput] = useState(EXAMPLE_PROMPT);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [selectedOption, setSelectedOption] = useState("formal");
  const handleClick = () => {
    getOpenAIResponse(textInput, selectedOption)
      .then((res) => {
        // console.log(res)
        setError("");
        setResponse(res);
      })
      .catch((error) => {
        console.log(error);
        setError(
          "Ha ocurrido un error con la API de ChatGPT. Revisa la consola de tu navegador para más información."
        );
      });
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12 py-12 bg-neutral-700 text-white min-h-screen">
      <h2 className="text-2xl font-bold">Montoya GPT - G10</h2>

      <select
        className="p-3 border-2 rounded-md bg-neutral-600 border-neutral-500 cursor-pointer"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {SELECT_OPTIONS.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="flex flex-row">
        <textarea
          className="p-3 border-2 h-64 w-[600px] rounded-md bg-neutral-600 border-neutral-500 resize-none rounded-r-none"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          spellCheck="false"
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
