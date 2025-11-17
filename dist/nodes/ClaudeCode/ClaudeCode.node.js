"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaudeCode = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const claude_code_1 = require("@anthropic-ai/claude-code");
class ClaudeCode {
    constructor() {
        this.description = {
            displayName: 'Claude Code',
            name: 'claudeCode',
            icon: 'file:claude.svg',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"]}}',
            description: 'Execute autonomous AI coding tasks using Claude Code',
            defaults: {
                name: 'Claude Code',
            },
            inputs: ['main'],
            outputs: ['main'],
            usableAsTool: true,
            credentials: [
                {
                    name: 'claudeApi',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Generate Code',
                            value: 'generateCode',
                            description: 'Generate code from a natural language prompt',
                            action: 'Generate code from prompt',
                        },
                        {
                            name: 'Execute Agent Task',
                            value: 'executeTask',
                            description: 'Execute an autonomous coding task with full agent capabilities',
                            action: 'Execute autonomous agent task',
                        },
                    ],
                    default: 'executeTask',
                },
                {
                    displayName: 'Prompt',
                    name: 'prompt',
                    type: 'string',
                    typeOptions: {
                        rows: 4,
                    },
                    displayOptions: {
                        show: {
                            operation: ['generateCode'],
                        },
                    },
                    default: '',
                    required: true,
                    description: 'Describe what code you want to generate',
                    placeholder: 'Create a Python function that calculates the fibonacci sequence',
                },
                {
                    displayName: 'Language',
                    name: 'language',
                    type: 'options',
                    displayOptions: {
                        show: {
                            operation: ['generateCode'],
                        },
                    },
                    options: [
                        {
                            name: 'C#',
                            value: 'csharp',
                        },
                        {
                            name: 'C++',
                            value: 'cpp',
                        },
                        {
                            name: 'Go',
                            value: 'go',
                        },
                        {
                            name: 'Java',
                            value: 'java',
                        },
                        {
                            name: 'JavaScript',
                            value: 'javascript',
                        },
                        {
                            name: 'Other',
                            value: 'other',
                        },
                        {
                            name: 'PHP',
                            value: 'php',
                        },
                        {
                            name: 'Python',
                            value: 'python',
                        },
                        {
                            name: 'Ruby',
                            value: 'ruby',
                        },
                        {
                            name: 'Rust',
                            value: 'rust',
                        },
                        {
                            name: 'TypeScript',
                            value: 'typescript',
                        },
                    ],
                    default: 'python',
                    description: 'The programming language for the generated code',
                },
                {
                    displayName: 'Task Description',
                    name: 'taskDescription',
                    type: 'string',
                    typeOptions: {
                        rows: 4,
                    },
                    displayOptions: {
                        show: {
                            operation: ['executeTask'],
                        },
                    },
                    default: '',
                    required: true,
                    description: 'Describe the autonomous task you want Claude Code to execute',
                    placeholder: 'Refactor the authentication module to use JWT tokens',
                },
                {
                    displayName: 'Working Directory',
                    name: 'workingDirectory',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['executeTask'],
                        },
                    },
                    default: '',
                    description: 'The working directory where Claude Code will operate (defaults to current directory)',
                    placeholder: '/path/to/project',
                },
                {
                    displayName: 'Allowed Tools',
                    name: 'allowedTools',
                    type: 'multiOptions',
                    displayOptions: {
                        show: {
                            operation: ['executeTask'],
                        },
                    },
                    options: [
                        {
                            name: 'Edit',
                            value: 'Edit',
                            description: 'Edit existing files',
                        },
                        {
                            name: 'Execute',
                            value: 'Execute',
                            description: 'Execute commands',
                        },
                        {
                            name: 'Glob',
                            value: 'Glob',
                            description: 'Find files by pattern',
                        },
                        {
                            name: 'Grep',
                            value: 'Grep',
                            description: 'Search in files',
                        },
                        {
                            name: 'List',
                            value: 'List',
                            description: 'List directory contents',
                        },
                        {
                            name: 'Read',
                            value: 'Read',
                            description: 'Read files',
                        },
                        {
                            name: 'Write',
                            value: 'Write',
                            description: 'Write/create files',
                        },
                    ],
                    default: ['Read', 'Write', 'Edit', 'Grep', 'Glob', 'List'],
                    description: 'Tools that Claude Code is allowed to use during execution',
                },
                {
                    displayName: 'Permission Mode',
                    name: 'permissionMode',
                    type: 'options',
                    displayOptions: {
                        show: {
                            operation: ['executeTask'],
                        },
                    },
                    options: [
                        {
                            name: 'Default',
                            value: 'default',
                            description: 'Standard permission behavior (prompts for confirmations)',
                        },
                        {
                            name: 'Accept Edits',
                            value: 'acceptEdits',
                            description: 'Automatically accept file edits',
                        },
                        {
                            name: 'Bypass Permissions',
                            value: 'bypassPermissions',
                            description: 'Bypass all permission checks (use with caution)',
                        },
                        {
                            name: 'Plan',
                            value: 'plan',
                            description: 'Planning mode - no actual execution',
                        },
                    ],
                    default: 'default',
                    description: 'How Claude Code should handle permissions',
                },
                {
                    displayName: 'Max Turns',
                    name: 'maxTurns',
                    type: 'number',
                    displayOptions: {
                        show: {
                            operation: ['executeTask'],
                        },
                    },
                    default: 0,
                    description: 'Maximum number of conversation turns (0 for unlimited)',
                },
                {
                    displayName: 'Additional Options',
                    name: 'additionalOptions',
                    type: 'collection',
                    placeholder: 'Add Option',
                    default: {},
                    displayOptions: {
                        show: {
                            operation: ['executeTask'],
                        },
                    },
                    options: [
                        {
                            displayName: 'Environment Variables (JSON)',
                            name: 'env',
                            type: 'string',
                            typeOptions: {
                                rows: 3,
                            },
                            default: '{}',
                            description: 'Environment variables as JSON object',
                            placeholder: '{"NODE_ENV": "production"}',
                        },
                        {
                            displayName: 'Include Partial Messages',
                            name: 'includePartialMessages',
                            type: 'boolean',
                            default: false,
                            description: 'Whether to include partial message events in the output',
                        },
                        {
                            displayName: 'Max Thinking Tokens',
                            name: 'maxThinkingTokens',
                            type: 'number',
                            default: 0,
                            description: 'Maximum tokens for thinking process (0 for default)',
                        },
                        {
                            displayName: 'Model Override',
                            name: 'model',
                            type: 'options',
                            options: [
                                {
                                    name: 'Sonnet (Default)',
                                    value: 'sonnet',
                                },
                                {
                                    name: 'Opus',
                                    value: 'opus',
                                },
                                {
                                    name: 'Haiku',
                                    value: 'haiku',
                                },
                            ],
                            default: 'sonnet',
                            description: 'Override the default Claude model',
                        },
                        {
                            displayName: 'System Prompt',
                            name: 'systemPrompt',
                            type: 'string',
                            typeOptions: {
                                rows: 3,
                            },
                            default: '',
                            description: 'Custom system prompt to guide Claude Code behavior',
                        },
                    ],
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const credentials = await this.getCredentials('claudeApi');
        if (!credentials || !credentials.apiKey) {
            throw new n8n_workflow_1.ApplicationError('Claude API credentials are required');
        }
        process.env.ANTHROPIC_API_KEY = credentials.apiKey;
        for (let i = 0; i < items.length; i++) {
            try {
                const operation = this.getNodeParameter('operation', i);
                if (operation === 'generateCode') {
                    const prompt = this.getNodeParameter('prompt', i);
                    const language = this.getNodeParameter('language', i);
                    const fullPrompt = language !== 'other'
                        ? `Generate ${language} code: ${prompt}`
                        : prompt;
                    const messages = [];
                    const result = (0, claude_code_1.query)({
                        prompt: fullPrompt,
                        options: {
                            permissionMode: 'plan',
                            systemPrompt: `You are a code generation assistant. Generate clean, well-documented, and efficient code based on the user's request. Only provide the code, no explanations unless requested.`,
                        },
                    });
                    for await (const message of result) {
                        messages.push(message);
                    }
                    let generatedCode = '';
                    for (const msg of messages) {
                        const message = msg;
                        if (message.type === 'text' && message.text) {
                            generatedCode += message.text;
                        }
                    }
                    returnData.push({
                        json: {
                            code: generatedCode,
                            language,
                            prompt,
                            messages,
                        },
                        pairedItem: { item: i },
                    });
                }
                else if (operation === 'executeTask') {
                    const taskDescription = this.getNodeParameter('taskDescription', i);
                    const workingDirectory = this.getNodeParameter('workingDirectory', i, '');
                    const allowedTools = this.getNodeParameter('allowedTools', i, []);
                    const permissionMode = this.getNodeParameter('permissionMode', i, 'default');
                    const maxTurns = this.getNodeParameter('maxTurns', i, 0);
                    const additionalOptions = this.getNodeParameter('additionalOptions', i, {});
                    let env = {};
                    if (additionalOptions.env) {
                        try {
                            env = JSON.parse(additionalOptions.env);
                        }
                        catch (error) {
                            throw new n8n_workflow_1.ApplicationError(`Invalid JSON in Environment Variables: ${error}`);
                        }
                    }
                    const queryOptions = {
                        permissionMode,
                        allowedTools,
                    };
                    if (workingDirectory) {
                        queryOptions.cwd = workingDirectory;
                    }
                    if (maxTurns > 0) {
                        queryOptions.maxTurns = maxTurns;
                    }
                    if (additionalOptions.systemPrompt) {
                        queryOptions.systemPrompt = additionalOptions.systemPrompt;
                    }
                    if (additionalOptions.maxThinkingTokens && Number(additionalOptions.maxThinkingTokens) > 0) {
                        queryOptions.maxThinkingTokens = additionalOptions.maxThinkingTokens;
                    }
                    if (additionalOptions.model && additionalOptions.model !== 'sonnet') {
                        queryOptions.model = additionalOptions.model;
                    }
                    if (Object.keys(env).length > 0) {
                        queryOptions.env = env;
                    }
                    if (additionalOptions.includePartialMessages) {
                        queryOptions.includePartialMessages = true;
                    }
                    const messages = [];
                    const result = (0, claude_code_1.query)({
                        prompt: taskDescription,
                        options: queryOptions,
                    });
                    for await (const message of result) {
                        messages.push(message);
                    }
                    const textMessages = messages
                        .map((m) => m)
                        .filter((m) => m.type === 'text')
                        .map((m) => m.text);
                    const artifacts = [];
                    const toolCalls = [];
                    for (const msg of messages) {
                        const message = msg;
                        if (message.type === 'artifact') {
                            artifacts.push(msg);
                        }
                        else if (message.type === 'tool_use') {
                            toolCalls.push({
                                tool: message.name,
                                input: message.input,
                            });
                        }
                    }
                    returnData.push({
                        json: {
                            task: taskDescription,
                            summary: textMessages.join('\n'),
                            messages,
                            artifacts,
                            toolCalls,
                            workingDirectory: queryOptions.cwd || process.cwd(),
                            permissionMode,
                            allowedTools,
                        },
                        pairedItem: { item: i },
                    });
                }
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            error: error.message,
                        },
                        pairedItem: { item: i },
                    });
                    continue;
                }
                throw error;
            }
        }
        return [returnData];
    }
}
exports.ClaudeCode = ClaudeCode;
//# sourceMappingURL=ClaudeCode.node.js.map