// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@resume/tailwind-config";

console.log("Shared Config:", sharedConfig);

const config: Pick<Config, "content" | "presets"> = {
  content: ["./app/**/*.tsx"],
  presets: [sharedConfig],
};

export default config;
