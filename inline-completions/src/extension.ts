import * as vscode from 'vscode';
import OpenAI from 'openai';

const openai = new OpenAI("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");
console.log("log0");



export function activate(_: vscode.ExtensionContext) {
    console.log("log1");
    const provider: vscode.CompletionItemProvider = {
        provideInlineCompletionItems: async (document, position, context, token) => {
            
            // Only execute if last line of the line is ':'
            if(document.lineAt(position.line).text.trim().endsWith(':') === false) {
                console.log("log2");
                return { items: [] };

              }
                console.log("log3");
            
                const contextRange = 5;
                const lineNumber = position.line;
                const startLine = Math.max(0, lineNumber - contextRange); // Calculate the starting line number
                const endLine = lineNumber; // Current line number

                const textInRange = document.getText(
                    new vscode.Range(startLine, 0, endLine, position.character)
                );
                
                const textBeforeCursor = document.getText(
                    new vscode.Range(position.with(undefined, 0), position)
                    
                );
                console.log("log4");         
                
                const completion = await openai.chat.completions.create({
                    messages: [
                        { role: 'system', content: 'Complete the code' },
                        { role: 'user', content: textInRange },

                    ],
                    model: 'gpt-3.5-turbo',
                    stop: ['//', '#'],
                });
                console.log("log5");

                const generatedCode = completion.choices[0].message.content;
                const output = `\n// Mernifier Completion\n${generatedCode}\n`;

                return {
                    items: [
                        {
                            text: output,
                            insertText: output,
                            range: new vscode.Range(position.translate(0, output.length), position),
                        },
                    ],
                };
            
        },
    };

    vscode.languages.registerInlineCompletionItemProvider({ pattern: '**' }, provider);
}
