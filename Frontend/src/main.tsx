import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import QueryClientProviderCom from "./providers/QueryClientProviderCom.tsx";

createRoot(document.getElementById("root")!).render(
  <QueryClientProviderCom>
    <App />
  </QueryClientProviderCom>
);
