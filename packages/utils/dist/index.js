// src/index.ts
import { default as default2 } from "debug";
import { default as default3 } from "chalk";

// src/functional/index.ts
function Pipe(...fns) {
  return (...args) => fns.reduce((arg, fn) => arg.length ? fn(...arg) : fn(arg), args);
}

// src/module/importModule.ts
import { pathToFileURL } from "url";
async function importModule(fileAbsPath) {
  let module;
  try {
    module = await import(pathToFileURL(fileAbsPath).href);
  } catch (error) {
    module = await import(fileAbsPath);
  }
  return module;
}
var packageJsonDefault = () => ({
  name: "",
  version: "",
  description: "",
  main: "",
  module: "",
  types: "",
  files: [],
  scripts: {},
  dependencies: {},
  devDependencies: {},
  peerDependencies: {},
  optionalDependencies: {},
  bundledDependencies: [],
  keywords: []
});
async function importPackageJson(fileAbsPath) {
  const module = (await importModule(fileAbsPath)).default;
  const pkg = {
    ...packageJsonDefault(),
    ...module
  };
  return pkg;
}

// src/common/withDefault.ts
function withDefault(value, defaultValue) {
  if (defaultValue !== null && !(defaultValue instanceof Array) && typeof defaultValue === "object") {
    let obj = {};
    Object.keys(defaultValue).forEach((key) => {
      obj[key] = withDefault(value?.[key], defaultValue[key]);
    });
    return obj;
  } else {
    return value ?? defaultValue;
  }
}
export {
  Pipe,
  default3 as chalk,
  default2 as debug,
  importModule,
  importPackageJson,
  packageJsonDefault,
  withDefault
};
