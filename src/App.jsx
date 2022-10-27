import { createRoot } from "react-dom/client";
import { Pet } from "./Pet.jsx";

// delete the Pet component

const App = () => {
  return <div></div>;
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
