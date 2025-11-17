import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class ClaudeCodeTest implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Claude Code Test',
		name: 'claudeCodeTest',
		icon: 'file:claude.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Test node without SDK',
		defaults: {
			name: 'Claude Code Test',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Test Input',
				name: 'testInput',
				type: 'string',
				default: '',
				description: 'Test input field',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const testInput = this.getNodeParameter('testInput', i, '') as string;
			
			returnData.push({
				json: {
					result: `Test successful: ${testInput}`,
				},
				pairedItem: { item: i },
			});
		}

		return [returnData];
	}
}

