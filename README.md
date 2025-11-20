# @coderai/n8n-nodes-claude-agent

This is an n8n community node that integrates [Claude Code](https://docs.claude.com/en/docs/agent-sdk/overview) autonomous AI agent capabilities into your n8n workflows.

[n8n](https://n8n.io/) is a fair-code licensed workflow automation platform that allows you to connect anything to everything via its open, extensible system.

[Claude Code](https://www.anthropic.com/claude) is Anthropic's AI assistant with advanced autonomous coding capabilities, able to understand codebases, edit files, run commands, and execute complex workflows.

## Features

- **Generate Code**: Create code snippets from natural language prompts in multiple programming languages
- **Execute Agent Tasks**: Run autonomous coding tasks with full agent capabilities including file reading/writing, command execution, and more
- **Flexible Permission Control**: Choose from multiple permission modes to control what Claude can do
- **Tool Selection**: Fine-tune which tools Claude can access during task execution
- **Environment Configuration**: Customize working directory, environment variables, and system prompts

## Installation

### Via n8n Community Nodes (Recommended)

1. Go to **Settings** > **Community Nodes** in your n8n instance
2. Click **Install a community node**
3. Enter `@coderai/n8n-nodes-claude-agent` in the npm package name field
4. Click **Install**

### Manual Installation

To install this node manually in your local n8n instance:

```bash
npm install @coderai/n8n-nodes-claude-agent
```

For Docker-based n8n installations, you can add this package to your `package.json` or install it via the n8n UI.

## Prerequisites

- An [Anthropic API key](https://console.anthropic.com/settings/keys)
- n8n version 1.0.0 or above

## Credentials

This node requires Claude API credentials:

1. Go to [Anthropic Console](https://console.anthropic.com/settings/keys)
2. Create a new API key
3. In n8n, create new "Claude API" credentials
4. Paste your API key

## Operations

### 1. Generate Code

Generate code snippets from natural language descriptions.

**Parameters:**
- **Prompt** (required): Describe what code you want to generate
- **Language**: Select the programming language (Python, JavaScript, TypeScript, Java, C++, C#, Go, Rust, PHP, Ruby, or Other)

**Example:**
```
Prompt: "Create a function that validates email addresses using regex"
Language: Python
```

**Output:**
```json
{
  "code": "import re\n\ndef validate_email(email):\n    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'\n    return re.match(pattern, email) is not None",
  "language": "python",
  "prompt": "Create a function that validates email addresses using regex",
  "messages": [...]
}
```

### 2. Execute Agent Task

Execute autonomous coding tasks with full agent capabilities.

**Parameters:**
- **Task Description** (required): Describe the autonomous task
- **Working Directory**: Directory where Claude will operate (defaults to current directory)
- **Allowed Tools**: Select which tools Claude can use:
  - Read: Read files
  - Write: Write/create files
  - Edit: Edit existing files
  - Execute: Run commands
  - Grep: Search in files
  - Glob: Find files by pattern
  - List: List directory contents
- **Permission Mode**: Control permission behavior:
  - Default: Standard behavior with prompts
  - Accept Edits: Auto-accept file edits
  - Bypass Permissions: Bypass all permission checks (⚠️ use with caution)
  - Plan: Planning mode without execution
- **Max Turns**: Maximum conversation turns (0 for unlimited)

**Additional Options:**
- **System Prompt**: Custom instructions for Claude
- **Max Thinking Tokens**: Limit thinking process tokens
- **Model Override**: Choose between Sonnet (default), Opus, or Haiku
- **Environment Variables**: JSON object with environment variables
- **Include Partial Messages**: Include partial message events in output

**Example:**
```
Task Description: "Analyze the authentication module and refactor it to use JWT tokens"
Working Directory: "/path/to/project"
Allowed Tools: Read, Write, Edit, Grep
Permission Mode: Accept Edits
```

**Output:**
```json
{
  "task": "Analyze the authentication module and refactor it to use JWT tokens",
  "summary": "Completed refactoring of authentication to JWT...",
  "messages": [...],
  "artifacts": [...],
  "toolCalls": [
    {"tool": "Read", "input": {...}},
    {"tool": "Edit", "input": {...}}
  ],
  "workingDirectory": "/path/to/project",
  "permissionMode": "acceptEdits",
  "allowedTools": ["Read", "Write", "Edit", "Grep"]
}
```

## Usage Examples

### Example 1: Generate API Client Code

```
Operation: Generate Code
Prompt: "Create a REST API client class with GET, POST, PUT, DELETE methods including error handling"
Language: TypeScript
```

### Example 2: Automated Code Review

```
Operation: Execute Agent Task
Task Description: "Review all Python files in the src/ directory and create a report of code quality issues, potential bugs, and improvement suggestions"
Working Directory: /path/to/project
Allowed Tools: Read, Grep, List
Permission Mode: Plan
```

### Example 3: Refactoring Task

```
Operation: Execute Agent Task
Task Description: "Refactor the user authentication module to implement OAuth 2.0"
Working Directory: /path/to/project/backend
Allowed Tools: Read, Write, Edit, Grep, Glob
Permission Mode: Accept Edits
Additional Options:
  - System Prompt: "Follow the project's coding standards defined in CONTRIBUTING.md"
  - Max Turns: 20
```

### Example 4: Test Generation

```
Operation: Execute Agent Task
Task Description: "Generate comprehensive unit tests for all functions in the utils.js file"
Working Directory: /path/to/project
Allowed Tools: Read, Write, Grep
Permission Mode: Accept Edits
```

## Permission Modes Explained

- **Default**: Claude will request permission for sensitive operations. Best for interactive use.
- **Accept Edits**: Automatically approves file edits but may still prompt for other operations. Good for refactoring tasks.
- **Bypass Permissions**: Skips all permission checks. ⚠️ Use only in controlled environments where you trust the task completely.
- **Plan**: Claude analyzes and plans but doesn't execute. Perfect for understanding what Claude would do before running.

## Security Considerations

⚠️ **Important**: When using this node, be aware that:

1. Claude Code can read, write, and execute files in the specified working directory
2. Use **Bypass Permissions** mode only in controlled, isolated environments
3. Always review the **Allowed Tools** to limit Claude's capabilities
4. Consider using **Plan** mode first to preview actions
5. Keep your API key secure and never commit it to version control

## Troubleshooting

### Node not appearing in n8n
- Ensure n8n is restarted after installation
- Check that the package is properly installed: `npm list n8n-nodes-claude-code`

### API Key errors
- Verify your API key is valid at [Anthropic Console](https://console.anthropic.com/settings/keys)
- Ensure credentials are properly configured in n8n

### Permission errors
- Check that the working directory is accessible
- Verify file permissions in the target directory
- Try using a less restrictive permission mode for testing

### Task timeout or incomplete
- Increase **Max Turns** if tasks are stopping prematurely
- Simplify complex tasks into smaller steps
- Check if the working directory is correct

## Resources

- [n8n Documentation](https://docs.n8n.io)
- [Claude Agent SDK Documentation](https://docs.claude.com/en/docs/agent-sdk/typescript)
- [Anthropic API Reference](https://docs.anthropic.com/en/api/getting-started)
- [n8n Community Forum](https://community.n8n.io)

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/MyCoderAI/n8n-nodes-claude-agent.git
cd n8n-nodes-claude-agent

# Install dependencies
npm install

# Build the node
npm run build

# Link for local testing
npm link
```

### Testing Locally

```bash
# In your n8n installation directory
npm link @coderai/n8n-nodes-claude-agent

# Start n8n
n8n start
```

### Linting

```bash
npm run lint
npm run lint:fix
```

## Version History

### 0.1.0
- Initial release
- Generate Code operation
- Execute Agent Task operation with full configuration options
- Support for multiple permission modes and tool selection

## License

[MIT](LICENSE.md)

## Support

For issues, questions, or contributions:
- [GitHub Issues](https://github.com/MyCoderAI/n8n-nodes-claude-agent/issues)
- [n8n Community](https://community.n8n.io)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Author

CoderAI - [GitHub](https://github.com/MyCoderAI)

---

Built with ❤️ for the n8n community
