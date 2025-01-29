const vscode = require("vscode");

/**
 * Toggle folding for all blocks at the same indentation level as the current cursor line.
 */
function toggleDynamicFold() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage("No active editor found.");
    return;
  }

  const document = editor.document;
  const cursorLine = editor.selection.active.line;
  const currentLineText = document.lineAt(cursorLine).text;

  // Calculate the indentation level of the current line
  const currentIndentation = currentLineText.match(/^\s*/)[0].length;

  // Request all folding ranges in the document
  vscode.commands
    .executeCommand("vscode.executeFoldingRangeProvider", document.uri)
    .then((foldingRanges) => {
      if (!foldingRanges) {
        vscode.window.showErrorMessage("No folding ranges found.");
        return;
      }

      // Filter folding ranges that match the current indentation level
      const matchingRanges = foldingRanges.filter((range) => {
        const startIndentation = document
          .lineAt(range.start)
          .text.match(/^\s*/)[0].length;
        return startIndentation === currentIndentation;
      });

      if (matchingRanges.length === 0) {
        vscode.window.showInformationMessage(
          "No matching blocks to fold/unfold at this level."
        );
        return;
      }

      // Check if any of the matching ranges are already folded
      const isAnyFolded = matchingRanges.some((range) => {
        return editor.visibleRanges.every((visibleRange) => {
          return (
            visibleRange.start.line > range.start ||
            visibleRange.end.line < range.end
          );
        });
      });

      // Determine the command to execute based on the current folding state
      const command = isAnyFolded ? "editor.unfold" : "editor.fold";

      // Apply the fold/unfold command to all matching ranges
      for (const range of matchingRanges) {
        vscode.commands.executeCommand(command, {
          selectionLines: [range.start],
        });
      }
    });
}

module.exports = {
  activate: (context) => {
    context.subscriptions.push(
      vscode.commands.registerCommand(
        "extension.toggleDynamicFold",
        toggleDynamicFold
      )
    );
  },
  deactivate: () => {},
};
