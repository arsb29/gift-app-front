import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { Root } from "@/components/Root.tsx";
import { init } from "@/init.ts";
import "./index.css";
import "./mockEnv.ts";

const root = ReactDOM.createRoot(document.getElementById("root")!);

try {
  init(retrieveLaunchParams().startParam === "debug" || import.meta.env.DEV);

  root.render(
    <StrictMode>
      <Root />
    </StrictMode>,
  );
} catch (e) {
  console.error(e);
}
