import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ClaudeApi implements ICredentialType {
	name = 'claudeApi';
	displayName = 'Claude API';
	documentationUrl = 'https://docs.anthropic.com/en/api/getting-started';
	icon = 'file:claude.svg' as const;
	properties: INodeProperties[] = [
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

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
				'anthropic-version': '2023-06-01',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.anthropic.com',
			url: '/v1/messages',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: {
				model: 'claude-3-5-sonnet-20241022',
				max_tokens: 10,
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

