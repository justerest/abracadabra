import {
  convertSwitchToIfElse,
  hasSwitchToConvert
} from "./convert-switch-to-if-else";

import { RefactoringWithActionProvider } from "../../types";

const config: RefactoringWithActionProvider = {
  command: {
    key: "convertSwitchToIfElse",
    operation: convertSwitchToIfElse,
    title: "Convert Switch To If Else"
  },
  actionProvider: {
    message: "Convert switch to if else",
    createVisitor: hasSwitchToConvert,
    isPreferred: true
  }
};

export default config;
