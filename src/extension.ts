import * as vscode from "vscode";

import { createCommand } from "./commands";
import { RefactoringActionProvider } from "./action-providers";

import addBracesToArrowFunction from "./refactorings/add-braces-to-arrow-function";
import addBracesToIfStatement from "./refactorings/add-braces-to-if-statement";
import convertForToForeach from "./refactorings/convert-for-to-foreach";
import convertIfElseToSwitch from "./refactorings/convert-if-else-to-switch";
import convertSwitchToIfElse from "./refactorings/convert-switch-to-if-else";
import convertIfElseToTernary from "./refactorings/convert-if-else-to-ternary";
import convertTernaryToIfElse from "./refactorings/convert-ternary-to-if-else";
import convertToArrowFunction from "./refactorings/convert-to-arrow-function";
import convertToTemplateLiteral from "./refactorings/convert-to-template-literal";
import convertLetToConst from "./refactorings/convert-let-to-const";
import extract from "./refactorings/extract";
import extractInterface from "./refactorings/extract-interface";
import flipIfElse from "./refactorings/flip-if-else";
import flipTernary from "./refactorings/flip-ternary";
import inline from "./refactorings/inline";
import liftUpConditional from "./refactorings/lift-up-conditional";
import mergeIfStatements from "./refactorings/merge-if-statements";
import mergeWithPreviousIfStatement from "./refactorings/merge-with-previous-if-statement";
import moveStatementDown from "./refactorings/move-statement-down";
import moveStatementUp from "./refactorings/move-statement-up";
import negateExpression from "./refactorings/negate-expression";
import reactConvertToPureComponent from "./refactorings/react/convert-to-pure-component";
import reactAddBracesToJsxAttribute from "./refactorings/react/add-braces-to-jsx-attribute";
import reactRemoveBracesFromJsxAttribute from "./refactorings/react/remove-braces-from-jsx-attribute";
import removeBracesFromArrowFunction from "./refactorings/remove-braces-from-arrow-function";
import removeBracesFromIfStatement from "./refactorings/remove-braces-from-if-statement";
import removeDeadCode from "./refactorings/remove-dead-code";
import removeRedundantElse from "./refactorings/remove-redundant-else";
import renameSymbol from "./refactorings/rename-symbol";
import replaceBinaryWithAssignment from "./refactorings/replace-binary-with-assignment";
import splitDeclarationAndInitialization from "./refactorings/split-declaration-and-initialization";
import splitIfStatement from "./refactorings/split-if-statement";
import simplifyTernary from "./refactorings/simplify-ternary";
import { ExtractClassActionProvider } from "./refactorings/extract-class/ExtractClassActionProvider";
import { ExtractClassCommand } from "./refactorings/extract-class/ExtractClassCommand";
import { ABRACADABRA_EXTRACT_CLASS_COMMAND } from "./refactorings/extract-class/EXTRACT_CLASS_COMMAND";

const TS_LANGUAGES = ["typescript", "typescriptreact"];
const REACT_LANGUAGES = ["javascriptreact", "typescriptreact"];
const ALL_LANGUAGES = [
  "javascript",
  "javascriptreact",
  "typescript",
  "typescriptreact",
  "vue"
];

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("abracadabra.quickFix", () => {
      vscode.commands.executeCommand("editor.action.quickFix");
    })
  );

  [
    addBracesToArrowFunction,
    addBracesToIfStatement,
    convertForToForeach,
    convertIfElseToSwitch,
    convertIfElseToTernary,
    convertLetToConst,
    convertSwitchToIfElse,
    convertTernaryToIfElse,
    convertToArrowFunction,
    convertToTemplateLiteral,
    extract,
    extractInterface,
    flipIfElse,
    flipTernary,
    inline,
    liftUpConditional,
    mergeIfStatements,
    mergeWithPreviousIfStatement,
    moveStatementDown,
    moveStatementUp,
    negateExpression,
    reactAddBracesToJsxAttribute,
    reactConvertToPureComponent,
    reactRemoveBracesFromJsxAttribute,
    removeBracesFromArrowFunction,
    removeBracesFromIfStatement,
    removeDeadCode,
    removeRedundantElse,
    renameSymbol,
    replaceBinaryWithAssignment,
    simplifyTernary,
    splitDeclarationAndInitialization,
    splitIfStatement
  ].forEach(({ command }) =>
    context.subscriptions.push(
      vscode.commands.registerCommand(
        `abracadabra.${command.key}`,
        createCommand(command.operation)
      )
    )
  );

  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand(
      ABRACADABRA_EXTRACT_CLASS_COMMAND,
      ExtractClassCommand.execute
    )
  );

  TS_LANGUAGES.forEach((language) => {
    vscode.languages.registerCodeActionsProvider(
      language,
      new RefactoringActionProvider([extractInterface]),
      {
        providedCodeActionKinds: [vscode.CodeActionKind.RefactorRewrite]
      }
    );
  });

  REACT_LANGUAGES.forEach((language) => {
    vscode.languages.registerCodeActionsProvider(
      language,
      new RefactoringActionProvider([
        reactAddBracesToJsxAttribute,
        reactRemoveBracesFromJsxAttribute
      ]),
      {
        providedCodeActionKinds: [vscode.CodeActionKind.RefactorRewrite]
      }
    );
  });

  ALL_LANGUAGES.forEach((language) => {
    vscode.languages.registerCodeActionsProvider(
      language,
      new RefactoringActionProvider([
        addBracesToArrowFunction,
        addBracesToIfStatement,
        convertForToForeach,
        convertIfElseToSwitch,
        convertSwitchToIfElse,
        convertIfElseToTernary,
        convertTernaryToIfElse,
        convertToArrowFunction,
        convertToTemplateLiteral,
        convertLetToConst,
        flipIfElse,
        flipTernary,
        liftUpConditional,
        mergeIfStatements,
        mergeWithPreviousIfStatement,
        negateExpression,
        removeBracesFromArrowFunction,
        removeBracesFromIfStatement,
        removeDeadCode,
        removeRedundantElse,
        replaceBinaryWithAssignment,
        simplifyTernary,
        splitDeclarationAndInitialization,
        splitIfStatement
      ]),
      {
        providedCodeActionKinds: [vscode.CodeActionKind.RefactorRewrite]
      }
    );

    vscode.languages.registerCodeActionsProvider(
      language,
      new ExtractClassActionProvider(),
      { providedCodeActionKinds: [vscode.CodeActionKind.RefactorExtract] }
    );
  });
}

export function deactivate() {}
