import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import QueryClientProviderCom from "./providers/QueryClientProviderCom.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <QueryClientProviderCom>
    <Toaster position="bottom-right" theme="light" />
    <App />
  </QueryClientProviderCom>
);
