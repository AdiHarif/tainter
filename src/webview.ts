
import * as fs from 'fs';
import * as path from 'path';

import * as vscode from 'vscode';

import * as svgson from 'svgson';

let extensionDir;
let panel;

function getHtmlContent(panel, extensionDir) {
    const htmlContent = fs.readFileSync(`${extensionDir}/static/index.html`, 'utf-8')
    return htmlContent.replace(/script src="([^"]*)"/g, (match, src) => {
        const realSource = panel.webview.asWebviewUri(vscode.Uri.file(path.join(extensionDir, src)))
        return `script src="${realSource}"`
    })
}


function handleSvg(svg: string) {
    svg = svg.substring(svg.indexOf(',') + 1);
    fs.writeFileSync(`${extensionDir}/test.svg`, svg);
    // const obj = svgson.parseSync(svg);
    // fs.writeFileSync(`${extensionDir}/test.json`, JSON.stringify(obj, null, '\t'));
    // const newSvg = svgson.stringify(obj);
    // panel.webview.postMessage({
    //     type: 'updateSvg',
    //     data: newSvg
    // })
}

export async function tainterTest(context: vscode.ExtensionContext) {
    extensionDir = context.extensionPath;
    panel = vscode.window.createWebviewPanel('tainter', 'Tainter 🦆', vscode.ViewColumn.Active,
        {
            enableScripts: true,
            // localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'static'))]
        });

    panel.webview.onDidReceiveMessage(({ type, data }) => {
        if (type == 'svg') {
            handleSvg(data)
        }
        if (type == 'highlightedText') {
            fs.writeFileSync(`${extensionDir}/test.txt`, data);
        }
    });

    panel.webview.html = getHtmlContent(panel, `${context.extensionPath}`);
    vscode.commands.executeCommand('editor.action.clipboardCopyWithSyntaxHighlightingAction')
    panel.webview.postMessage({
        type: 'update'
    })
    // const text = await vscode.env.clipboard.readText();
    // fs.writeFileSync(`${extensionPath}/test.txt`, text);
}