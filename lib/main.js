"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const kit = __importStar(require("@harveyr/github-actions-kit"));
const flake8_1 = require("./flake8");
function makeAnnotation(lint) {
    return {
        level: 'failure',
        startLine: lint.line,
        message: lint.message,
        path: lint.filePath,
    };
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const githubToken = core.getInput('github-token');
        const postAnnotations = core.getInput('post-annotations') === 'true';
        const patterns = core
            .getInput('patterns')
            .split(' ')
            .map(p => {
            return p.trim();
        })
            .filter(p => {
            return p.length > 0;
        });
        yield kit.execAndCapture('flake8', ['--version']);
        let text = '';
        if (patterns.length) {
            const { stdout, stderr } = yield kit.execAndCapture('flake8', patterns, {
                failOnStdErr: false,
            });
            text = stdout + stderr;
        }
        const lines = text.split('\n');
        const lints = flake8_1.parseLines(lines);
        const summary = patterns.length
            ? `flake8 found ${lints.length} issues`
            : `flake8 did not run (no patterns passed)`;
        yield kit.postCheckRun({
            githubToken,
            name: 'flake8',
            conclusion: lints.length ? 'failure' : 'success',
            summary,
            text,
            annotations: postAnnotations ? lints.map(makeAnnotation) : [],
        });
    });
}
run().catch(err => {
    core.setFailed(`${err}`);
});
