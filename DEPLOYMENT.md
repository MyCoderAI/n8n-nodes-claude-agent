# Deployment Guide for @coderai/n8n-nodes-claude-agent

## Overview

The custom n8n node for Claude Code integration is ready for deployment. This node allows users to execute autonomous AI coding tasks and generate code within their n8n workflows.

## What Has Been Built

### Files Created:

1. **Node Files:**
   - `nodes/ClaudeCode/ClaudeCode.node.ts` - Main node implementation with two operations
   - `nodes/ClaudeCode/ClaudeCode.node.json` - Node metadata
   - `nodes/ClaudeCode/claude.svg` - Node icon

2. **Credentials:**
   - `credentials/ClaudeApi.credentials.ts` - API key authentication
   - `credentials/claude.svg` - Credential icon

3. **Configuration:**
   - `package.json` - Updated with proper npm configuration, keywords, and dependencies
   - `eslint.config.mjs` - Configured for non-cloud support (required for external dependencies)
   - `README.md` - Comprehensive documentation with examples
   - `DEPLOYMENT.md` - This file

### Features Implemented:

1. **Generate Code Operation:**
   - Natural language to code generation
   - Support for 11 programming languages
   - Returns generated code as output

2. **Execute Agent Task Operation:**
   - Autonomous task execution with full agent capabilities
   - Configurable working directory
   - Granular tool permissions (Read, Write, Edit, Execute, Grep, Glob, List)
   - Multiple permission modes (default, acceptEdits, bypassPermissions, plan)
   - Advanced options (system prompt, model override, environment variables, etc.)

## Build Status

✅ TypeScript compilation: **PASSING**  
✅ Linter: **PASSING**  
✅ All files built to `dist/` directory

## Publishing to npm

### Prerequisites

1. **npm Account:** You need an npm account. Create one at https://www.npmjs.com/signup
2. **npm CLI:** Ensure you have npm installed and are logged in:
   ```bash
   npm login
   ```

### Steps to Publish

1. **Verify Build:**
   ```bash
   cd /Users/miguelgonzalez/git/n8n-claude-code/n8n-nodes-claude-code
   npm run build
   npm run lint
   ```

2. **Test Locally (Optional but Recommended):**
   ```bash
   # Link the node
   npm link
   
   # In your n8n installation directory (e.g., ~/.n8n/custom/)
   npm link n8n-nodes-claude-code
   
   # Start n8n and test both operations
   n8n start
   ```

3. **Publish to npm:**
   ```bash
   # Make sure you're in the project directory
   cd /Users/miguelgonzalez/git/n8n-claude-code/n8n-nodes-claude-code
   
   # Use the release script
   npm run release
   ```

4. **Verify Publication:**
   - Check your package at: https://www.npmjs.com/package/@coderai/n8n-nodes-claude-agent
   - ✅ **PUBLISHED**: The package is live at v0.1.0!

### Important Notes

- **Cloud Support:** This node is configured with `strict: false` and uses `configWithoutCloudSupport` because it depends on the Claude Agent SDK. This means:
  - ✅ Can be installed via n8n Community Nodes
  - ✅ Works in self-hosted n8n instances
  - ❌ Cannot be verified for n8n Cloud (due to external dependency restrictions)

- **Version Updates:** To publish updates:
  ```bash
  npm version patch  # for bug fixes
  npm version minor  # for new features
  npm version major  # for breaking changes
  npm publish
  ```

## Installation by Users

Once published, users can install your node in two ways:

### Method 1: Via n8n UI (Recommended)
1. Go to **Settings** > **Community Nodes**
2. Click **Install a community node**
3. Enter: `@coderai/n8n-nodes-claude-agent`
4. Click **Install**

### Method 2: Via npm
```bash
npm install @coderai/n8n-nodes-claude-agent
```

## Usage

Users will need:
1. An Anthropic API key from https://console.anthropic.com/settings/keys
2. To create Claude API credentials in n8n
3. To add the Claude Code node to their workflow

Full usage examples are in the README.md file.

## Support and Maintenance

- **Repository:** https://github.com/MyCoderAI/n8n-nodes-claude-agent
- **Issues:** https://github.com/MyCoderAI/n8n-nodes-claude-agent/issues
- **n8n Community:** https://community.n8n.io

## License

MIT License - See LICENSE file for details

---

**Built with ❤️ for the n8n community**

