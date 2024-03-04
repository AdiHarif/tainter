
import { window, TextEditorDecorationType, Range } from "vscode";

import { RangeTree, RangeForest } from "./range_forest";

const decorationStyle = {
    backgroundColor: "rgba(255, 255, 0, 0.1)",
    border: "solid rgba(255, 255, 0, 0.15) 0.1em",
    borderRadius: "0.25em"
};

export class DecorationManager {
    private decorations: Array<TextEditorDecorationType> = [];

    clearDecorations() {
        this.decorations.forEach(d => window.activeTextEditor?.setDecorations(d, []));
        this.decorations = [];
    }

    private decorateRangeForest(forest: RangeForest) {
        const decoratedRanges: Array<Array<Range>> = [];
        const accumulateRanges = (tree: RangeTree, depth: number) => {
            if (depth >= decoratedRanges.length) {
                decoratedRanges.push([]);
            }
            decoratedRanges[depth].push(tree.root);
            tree.subRanges.forEach(subRange => accumulateRanges(subRange, depth + 1));
        }

        forest.trees.forEach(tree => accumulateRanges(tree, 0));
        decoratedRanges.forEach((ranges, i) => {
            this.decorations.push(window.createTextEditorDecorationType(decorationStyle));
            window.activeTextEditor?.setDecorations(this.decorations[i], ranges);
        });
    }

    decorateRanges(ranges: Array<Range>) {
        this.clearDecorations();
        const forest = new RangeForest();
        ranges.forEach(range => forest.addRange(range));
        this.decorateRangeForest(forest);
    }
}
