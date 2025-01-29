# dynamic-fold

A VSCode / Cursor plugin to mimic emacs block collapsing feature.

I've used emacs for 25+ years before switching to Agentic AI Cursor which is unfortunately based on VSCode. Until I can get Agentic AI feature easily into Emacs, I'm migrating my Emacs setup to Cursor. Amongst the many limitations of VsCode/Cursor there seem to be a general lack in "collapsing" or "toggling" of code blocks capabilities.

In emacs I used extensively this keybinding

```
;; toggle function bodies
(defun toggle-selective-display (column)
  (interactive "P")
  (set-selective-display
   (or column
       (unless selective-display
	 (1+ (current-column))))))
(global-set-key (kbd "C-p") 'toggle-selective-display)
```

to position the curson at a specific column and collapse ALL the blocks in the file at that indentation level.

So for VSCode I got Cursor write me this js file to do the same. It's still in beta as I've tested it just a tiny bit as of now.

## Installation

Clone the repo and build (`make build`). Use `make init-package` to install few needed npm packages if your don't already have them.

Use `Extensions: Install from VSIX` action to install from the "compiled" vsix local file.

Add to `keybindings.json` this

```
{
  "key": "ctrl+p",
  "command": "extension.toggleDynamicFold",
  "when": "editorTextFocus"
}
```

which hooks `Ctrl + P` to the action.
