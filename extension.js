// File: extension.js
// A VSCode extension to mark files as reviewed or trash with persistent decorations

const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

let reviewedFiles = new Set();
let trashFiles = new Set();
let storageFile = null;
let badgesEnabled = true;

class FileMarkerDecorationProvider {
    constructor() {
        this._onDidChangeFileDecorations = new vscode.EventEmitter();
        this.onDidChangeFileDecorations = this._onDidChangeFileDecorations.event;
    }

    provideFileDecoration(uri) {
        if (!badgesEnabled) return undefined;

        if (reviewedFiles.has(uri.fsPath)) {
            return {
                badge: '✔',
                tooltip: 'Marked as Reviewed',
                badgeColor: new vscode.ThemeColor('charts.green') // ✅ not affecting filename
            };
        } else if (trashFiles.has(uri.fsPath)) {
            return {
                badge: '🗑',
                tooltip: 'Marked for Deletion',
                badgeColor: new vscode.ThemeColor('charts.red') // ✅ not affecting filename
            };
        }
        return undefined;
    }

    refresh() {
        this._onDidChangeFileDecorations.fire();
    }
}

function loadState(workspaceRoot) {
    storageFile = path.join(workspaceRoot, '.fileaudit.json');
    if (fs.existsSync(storageFile)) {
        try {
            const data = JSON.parse(fs.readFileSync(storageFile, 'utf8'));
            reviewedFiles = new Set(data.reviewed || []);
            trashFiles = new Set(data.trash || []);
        } catch (e) {
            console.error('Failed to load file audit state:', e);
        }
    }
}

function saveState() {
    if (!storageFile) return;
    const data = {
        reviewed: Array.from(reviewedFiles),
        trash: Array.from(trashFiles)
    };
    fs.writeFileSync(storageFile, JSON.stringify(data, null, 2));
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    const rootPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (rootPath) {
        loadState(rootPath);
    }

    const provider = new FileMarkerDecorationProvider();
    context.subscriptions.push(
        vscode.window.registerFileDecorationProvider(provider)
    );

    const markReviewed = vscode.commands.registerCommand('fileAudit.markReviewed', (uri) => {
        reviewedFiles.add(uri.fsPath);
        trashFiles.delete(uri.fsPath);
        saveState();
        vscode.window.showInformationMessage(`✔ Marked ${uri.fsPath} as Reviewed`);
        provider.refresh();
    });

    const markTrash = vscode.commands.registerCommand('fileAudit.markTrash', (uri) => {
        trashFiles.add(uri.fsPath);
        reviewedFiles.delete(uri.fsPath);
        saveState();
        vscode.window.showInformationMessage(`🗑 Marked ${uri.fsPath} for Deletion`);
        provider.refresh();
    });

    const clearMarks = vscode.commands.registerCommand('fileAudit.clearMarks', (uri) => {
        reviewedFiles.delete(uri.fsPath);
        trashFiles.delete(uri.fsPath);
        saveState();
        vscode.window.showInformationMessage(`🟡 Cleared mark from ${uri.fsPath}`);
        provider.refresh();
    });

    const toggleBadges = vscode.commands.registerCommand('fileAudit.toggleBadges', () => {
        badgesEnabled = !badgesEnabled;
        vscode.window.showInformationMessage(`File audit badges ${badgesEnabled ? 'enabled' : 'disabled'}`);
        provider.refresh();
    });

    context.subscriptions.push(markReviewed, markTrash, clearMarks, toggleBadges);

    // Initial refresh
    provider.refresh();
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};
