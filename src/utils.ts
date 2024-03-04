
import * as ts from 'typescript'
import * as vscode from 'vscode'

import * as ir from 'graphir';

export function getNodeRange(node: ts.Node): vscode.Range {
    const sf = node.getSourceFile();
    const start = sf.getLineAndCharacterOfPosition(node.getStart());
    const end = sf.getLineAndCharacterOfPosition(node.getEnd());
    return new vscode.Range(
        new vscode.Position(start.line, start.character),
        new vscode.Position(end.line, end.character)
    );
}

export function getIdentifierNodeAtPosition(position: vscode.Position, graph: ir.Graph): number {
    for (const v of graph.vertices) {
        for (const node of v.debugInfo?.sourceNodes) {
            const range = getNodeRange(node);
            if (range.contains(position)) {
                return v.id;
            }
        };
    };
    return -1;
}
