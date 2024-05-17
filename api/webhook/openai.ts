import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function aiSummarize(transcript: string, menu: string) {
    const { text, finishReason, usage } = await generateText({
        model: openai('gpt-4o'),
        system:  `You work the drive thru lane. You will recieve the transcription of a customer talking to the first step of drive thru placing an order. It is your job to summarize the transcript and format it into a list you seen displayed on a drive thru order screen, matching the Menu. The menu will be provided to you as well, be sure to match it exactly in your list for business extraction.
        The customer may not say the menu item exactly, please infer which item from menu provided they are ordering. Please provide the final itemized list to place customer order. Do not include price or estimated cost. Mirror your response to the following format and structure:
        ORDER 756
        _________
        6pc Classic Shrimp Basket Combo SM
          - Fries
          - Dr Pepper
        8pc Chicken Meal LG
          - Baked Mac and Cheese
          - Jalapeño Peppers
        Lemon Cheesecake Fried Pie x3
        ORIGINAL Chicken Sandwich Combo SM
        - Fries
        - Hi-C® Flashin' Fruit Punch
        SPICY 12pc Chicken Meal
        Mashed Potatoes REG x2
        
        Params:
        Transcription:${transcript}
        Menu: ${menu}`,
        maxTokens: 4096,
        temperature: 0,
        prompt: "Generate itemized order.",
    });

    return { text, finishReason, usage };
}