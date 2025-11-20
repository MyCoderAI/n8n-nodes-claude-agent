"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaudeApi = void 0;
class ClaudeApi {
    constructor() {
        this.name = 'claudeApi';
        this.displayName = 'Claude API';
        this.documentationUrl = 'https://docs.anthropic.com/en/api/getting-started';
        this.icon = 'file:claude.svg';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
                description: 'Your Anthropic API key. Get one at https://console.anthropic.com/settings/keys',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    'x-api-key': '={{$credentials.apiKey}}',
                    'anthropic-version': '2023-06-01',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://api.anthropic.com',
                url: '/v1/messages',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    model: 'claude-3-haiku-20240307',
                    max_tokens: 100,
                    messages: [
                        {
                            role: 'user',
                            content: 'test',
                        },
                    ],
                },
            },
        };
    }
}
exports.ClaudeApi = ClaudeApi;
//# sourceMappingURL=ClaudeApi.credentials.js.map