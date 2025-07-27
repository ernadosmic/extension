# File Audit Markers

A VSCode extension that helps you organize and track your files by marking them as reviewed or for deletion directly in the Explorer.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![VSCode](https://img.shields.io/badge/vscode-%5E1.70.0-green.svg)

## Features

- **📁 Visual File Markers**: Add badges to files in the Explorer to track their status
- **✅ Mark as Reviewed**: Mark files you've reviewed with a green checkmark badge
- **🗑️ Mark for Deletion**: Mark files for deletion with a trash badge
- **🔄 Clear Marks**: Remove any existing marks from files
- **👁️ Toggle Display**: Show/hide all markers with a single click
- **💾 Persistent State**: Your file markers are saved and restored between VSCode sessions

## How It Works

The extension adds visual badges to files in the VSCode Explorer:

- **✔** Green badge for reviewed files
- **🗑** Trash badge for files marked for deletion

All markers are stored in a `.fileaudit.json` file in your workspace root, ensuring your file audit state persists between sessions.

## Usage

### Marking Files

1. **Right-click** on any file in the Explorer
2. Choose from the context menu:
   - **🟢 Mark as Reviewed** - Marks the file as reviewed
   - **🔴 Mark for Deletion** - Marks the file for deletion
   - **🟡 Clear Mark** - Removes any existing mark

### Toggle Visibility

- Click the **Toggle File Audit Markers** button in the Explorer toolbar to show/hide all badges

## Installation

### From VSIX File

1. Download the `vscode-file-audit-1.0.0.vsix` file
2. Open VSCode
3. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
4. Type "Extensions: Install from VSIX..."
5. Select the downloaded `.vsix` file

### Manual Installation

1. Clone or download this repository
2. Copy the extension folder to your VSCode extensions directory:
   - **Windows**: `%USERPROFILE%\.vscode\extensions\`
   - **macOS**: `~/.vscode/extensions/`
   - **Linux**: `~/.vscode/extensions/`
3. Restart VSCode

## Commands

The extension provides the following commands:

| Command                  | Description                                 |
| ------------------------ | ------------------------------------------- |
| `fileAudit.markReviewed` | Mark selected file as reviewed              |
| `fileAudit.markTrash`    | Mark selected file for deletion             |
| `fileAudit.clearMarks`   | Clear all marks from selected file          |
| `fileAudit.toggleBadges` | Toggle visibility of all file audit markers |

## Storage

File audit data is stored in `.fileaudit.json` in your workspace root. This file contains:

```json
{
  "reviewed": ["/path/to/reviewed/file.js"],
  "trash": ["/path/to/file/for/deletion.js"]
}
```

> **Note**: Add `.fileaudit.json` to your `.gitignore` if you don't want to share audit markers with your team.

## Use Cases

- **Code Reviews**: Mark files as reviewed during pull request reviews
- **Cleanup Projects**: Identify files that can be safely deleted
- **File Organization**: Keep track of which files you've processed in large codebases
- **Refactoring**: Mark files that need attention or can be removed

## Requirements

- VSCode version 1.70.0 or higher

## Known Issues

- Markers are workspace-specific and don't sync across different machines
- Large workspaces may experience slight performance impact when toggling markers

## Contributing

Found a bug or have a feature request? Please create an issue in the repository.

## License

This extension is released under the MIT License.

## Changelog

### 1.0.0

- Initial release
- File marking with persistent badges
- Context menu integration
- Toggle visibility functionality
- Workspace-specific storage

---

**Enjoy organizing your files!** 🎉
