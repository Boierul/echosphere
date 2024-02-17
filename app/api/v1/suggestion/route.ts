import openai from '@/lib/openai';
import {NextRequest, NextResponse} from "next/server";

/* POST - ask ChatGPT for a posts suggestion description */
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        // Parse JSON from the request body
        const {content: prompt} = JSON.parse(await req.text());

        // ChatGPT query
        const chatGPTQuery = `Make this social media post sounds like a comment online that tells people how
        awesome Echosphere app is. Echosphere is a platform that allows random people online to share a post with
        the others, comment on posts and share overall impressions. Include some emojis.
        (keep it under 250 characters and do not add quotes around the text: ${prompt}. I repeat get rid of quotes.`;

        // Perform OpenAI chat completion
        const chatCompletion = await openai.chat.completions.create({
            messages: [{role: 'user', content: chatGPTQuery}],
            model: 'gpt-3.5-turbo',
        });

        console.log('\x1b[34m  [POST METHOD] - \x1b[33mOPENAI - api/v1/suggestion');

        return NextResponse.json(chatCompletion.choices[0].message);
    } catch (error) {
        // TODO: Refactor status codes for more appropriate ones
        NextResponse.json(
            {message: `Error has occurred while enhancing your prompt: ${error}`},
            {status: 500}
        )
    }
}
