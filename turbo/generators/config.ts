import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("create-package", {
    description: "Generate package skeleton",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the package",
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/{{name}}/src/index.ts",
      },
      {
        type: "add",
        path: "packages/{{name}}/package.json",
        templateFile: "templates/package.json.hbs",
      },
      {
        type: "add",
        path: "packages/{{name}}/typescript-config.json",
        templateFile: "templates/typescript-config.ts.hbs",
      },
      {
        type: "add",
        path: "packages/{{name}}/README.md",
        templateFile: "templates/readme.md.hbs",
      },
    ],
  });
}
