// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

import * as vscode from 'vscode';

import { execSync } from 'child_process';
import * as fs from 'fs';

import * as ir from 'graphir';
import * as extractor from 'ts-graph-extractor';

import * as utils from './utils';
import { DecorationManager } from './decoration';

const decorationsManager = new DecorationManager();

let extensionPath = '';
let storagePath = '';

function clearDecorations() {
	decorationsManager.clearDecorations();
}

async function taint() {
	/**
	 * TODO:
	 * 
	 * 1. get the current selected function
	 * 2. extract ir graph 
	 * 3. run dl analysis
	 * 4. get the position the variable containing the current selection (assuming the selection is zero length)
	 * 5. query analysis result
	 * 6. highlight results
	 */

	const sourceFile = vscode.window.activeTextEditor!.document.fileName;
	const graph = extractor.extractFromPath(sourceFile);
	await ir.exportIrToRelations(graph, storagePath);
	await ir.exportIrToDot(graph, storagePath);
	const sourceNode = utils.getIdentifierNodeAtPosition(vscode.window.activeTextEditor!.selection.active, graph);
	fs.writeFileSync(`${storagePath}/in.facts`, sourceNode.toString());

	console.log(process.cwd())
	const analysisPath = `${extensionPath}/submodules/GraphIR-Static-Analysis`;
	const souffleCommand = `souffle -F${storagePath} ${analysisPath}/taint_analysis.dl -D${storagePath}/analysis_out`
	execSync(souffleCommand);
	const taintedVertices = fs.readFileSync(`${storagePath}/analysis_out/out.facts`).toString().split('\n').map(s => parseInt(s)).filter(n => !isNaN(n));
	const taintedRanges : Array<vscode.Range> = [];
	taintedVertices.forEach(id => {
		graph.vertices[id].debugInfo?.sourceNodes.forEach(node => {
			taintedRanges.push(
				utils.getNodeRange(node)
			)
		});
	});

	console.log(taintedRanges.map(r => `${r.start.line}:${r.start.character}-${r.end.line}:${r.end.character} - ${vscode.window.activeTextEditor?.document.getText(r)}`).join('\n'));

	taintedRanges.sort((a, b) => {
		const aSize = vscode.window.activeTextEditor!.document.offsetAt(a.end) - vscode.window.activeTextEditor!.document.offsetAt(a.start);
		const bSize = vscode.window.activeTextEditor!.document.offsetAt(b.end) - vscode.window.activeTextEditor!.document.offsetAt(b.start);
		return bSize - aSize;
	});
	decorationsManager.decorateRanges(taintedRanges);
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	extensionPath = context.extensionPath;
	storagePath = context.storageUri!.fsPath;
	fs.mkdirSync(storagePath, { recursive: true });
	fs.mkdirSync(`${storagePath}/analysis_out`, { recursive: true });


	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tainter" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('Tainter.taint', taint)
	let clearDisposable = vscode.commands.registerCommand('Tainter.clearDecorations', clearDecorations)

	context.subscriptions.push(disposable, clearDisposable,)
}

// This method is called when your extension is deactivated
export function deactivate() {}
