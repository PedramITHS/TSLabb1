import { useState } from "react";
import { Toast } from "bootstrap";
interface LightsProps {
  switchOn: boolean;
}

export default function Lights(prop: LightsProps) {
  ///////////////////////Toast code////////////////////
  const toastTrigger = document.getElementById("toastTrigger");
  const toastLiveExample = document.getElementById("liveToast");

  if (toastTrigger && toastLiveExample) {
    const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
    });
  }
  ////////////////////////////////////////////////////////////

  const [lights, setLights] = useState<boolean>(prop.switchOn);
  const [current, setCurrent] = useState<string>("light");
  const [lightBulb, setLightBulb] = useState<string>("./lightbulb.svg");

  function Toggle() {
    const toggleLights = !lights;
    const currentLight = toggleLights
      ? "Set to dark mode"
      : " Set to light mode";
    const currentBulb = toggleLights
      ? "./lightbulb-fill.svg"
      : "./lightbulb.svg";
    setLightBulb(currentBulb);
    setCurrent(currentLight);
    setLights(toggleLights);
    document.body.style.backgroundColor = toggleLights ? "#595a5c" : "#9e9e9e";
  }

  return (
    <>
      <button
        id="toastTrigger"
        value={lights ? "dark" : "light"}
        type="button"
        className="btn btn-warning lights"
        onClick={Toggle}
      >
        {lights ? "Dark mode" : "Light mode"}
      </button>

      <div
        className="toast-container position-fixed bottom-0 end-0 p-3 mb-5"
        data-bs-delay="10000"
      >
        <div
          id="liveToast"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <img src={lightBulb} className="rounded me-2" alt="" />
            <strong className="me-auto">{current}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </>
  );
}
