"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const MATCHER = /(\S+):(\d+):(\d+): ([A-Z]\d+) (.+)/;
function parseLine(line) {
    const match = MATCHER.exec(line);
    if (!match || match.length < 2) {
        return null;
    }
    return {
        filePath: match[1],
        line: parseInt(match[2], 10),
        column: parseInt(match[3], 10),
        code: match[4],
        message: match[5],
    };
}
exports.parseLine = parseLine;
function parseLines(lines) {
    const result = [];
    for (const line of lines) {
        const lint = parseLine(line);
        if (lint) {
            result.push(lint);
        }
        else {
            core.warning(`Unexpected line: ${line}`);
        }
    }
    return result;
}
exports.parseLines = parseLines;
