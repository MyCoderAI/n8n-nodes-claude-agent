"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaudeCodeTest = void 0;
class ClaudeCodeTest {
    constructor() {
        this.description = {
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
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            const testInput = this.getNodeParameter('testInput', i, '');
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
exports.ClaudeCodeTest = ClaudeCodeTest;
//# sourceMappingURL=ClaudeCodeTest.node.js.map