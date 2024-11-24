import { useState } from "react";

interface LightsProps {
  switchOn: boolean;
}

export default function Lights({ switchOn }: LightsProps) {
  const [lights, setLights] = useState<boolean>(true);

  function Toggle() {
    const toggleLights = !lights;
    setLights(toggleLights);
    document.body.style.backgroundColor = toggleLights ? "#595a5c" : "#9e9e9e";
  }

  return (
    <>
      <button
        value={switchOn ? "dark" : "light"}
        type="button"
        className="btn btn-warning"
        onClick={Toggle}
      >
        {lights ? "Dark mode" : "Light mode"}
      </button>
    </>
  );
}
