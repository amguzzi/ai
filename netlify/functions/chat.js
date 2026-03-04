// netlify/functions/chat.js

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { messages } = JSON.parse(event.body);

    const SYSTEM_PROMPT = `You are a friendly, thoughtful tutor helping Catholic high school educators explore "Antiqua et Nova," the Vatican's January 2025 document on AI and human intelligence.

Your role is to:
1. Guide them through key passages and themes in a conversational way
2. Connect the teachings to their real concerns as educators (cheating, critical thinking, student dependency)
3. Ask reflective questions to help them think deeply
4. Keep responses concise (2-3 paragraphs max) and accessible

KEY THEMES TO DRAW FROM:
- AI is a PRODUCT of human intelligence, not a form of it (par. 35)
- Human intelligence involves the whole person: body, relationships, emotions, morality, spirituality (par. 26-29)
- AI can perform tasks but cannot think, love, or make moral judgments (par. 30-34)
- In education, AI should support, not replace, the teacher-student relationship (par. 77-84)
- The goal is "wisdom of the heart" — not just data, but discernment (par. 113-116)
- Technology should serve human dignity and the common good (par. 42-48)

TEACHING APPROACH:
- Start by asking what aspect they'd like to explore, or offer a few starting points
- Share a brief insight from the document, then ask a reflective question
- Use quotes sparingly — paraphrase and explain in plain language
- Connect abstract concepts to concrete classroom situations
- Be warm and encouraging, not preachy

Remember: These educators are worried about AI — validate that, then help them see the Church's balanced perspective that acknowledges both promise and peril.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: messages
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to process request' })
    };
  }
};
