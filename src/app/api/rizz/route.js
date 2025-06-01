import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { input, tone } = await request.json();

    const prompt = `Respond in a ${tone} tone to this: "${input}"`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // or 'gpt-4o', 'gpt-3.5-turbo', whatever you wanna use
      messages: [
        { role: 'system', content: 'You are a helpful AI wingman.' },
        { role: 'user', content: prompt },
      ],
    });

    const output = completion.choices[0].message.content;

    return NextResponse.json({ output });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch from OpenAI' }, { status: 500 });
  }
}
