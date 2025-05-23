import { createRoot } from "react-dom/client";
import Auth from "./Auth.tsx";

import "@radix-ui/themes/styles.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<Auth />);
