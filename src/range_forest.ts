
import { Range } from 'vscode';

export class RangeTree {

    constructor(public root: Range, public subRanges: Array<RangeTree> = []) {
    }

    addSubRange(range: Range) {
        if (this.root.contains(range)) {
            for (const subRange of this.subRanges) {
                if (subRange.root.contains(range) || range.contains(subRange.root)) {
                    subRange.addSubRange(range);
                    return;
                }
            }
            this.subRanges.push(new RangeTree(range));
        }
        else {
            this.subRanges = [new RangeTree(this.root, this.subRanges)];
            this.root = range;
        }
    }
}

export class RangeForest {
    public trees: Array<RangeTree> = [];

    addRange(range: Range) {
        for (const tree of this.trees) {
            if (tree.root.contains(range) || range.contains(tree.root)) {
                tree.addSubRange(range);
                return;
            }
        }
        this.trees.push(new RangeTree(range));
    }
}
