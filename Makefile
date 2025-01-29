init-package:
	npm init -y
	npm install --save-dev vscode
	npm install -g vsce

build:
	vsce package
