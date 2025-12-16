import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, config } = await req.json();
    
    // Use external API if configured, otherwise fall back to Lovable AI
    if (config?.apiKey && config?.provider !== 'lovable') {
      let apiUrl: string;
      let headers: Record<string, string>;
      let body: any;

      // Configure based on provider
      switch (config.provider) {
        case 'chatgpt':
          apiUrl = 'https://api.openai.com/v1/chat/completions';
          headers = {
            'Authorization': `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json',
          };
          body = {
            model: config.model || 'gpt-4o-mini',
            messages: [
              { role: 'system', content: config.systemPrompt },
              ...messages
            ],
          };
          break;

        case 'grok':
          apiUrl = 'https://api.x.ai/v1/chat/completions';
          headers = {
            'Authorization': `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json',
          };
          body = {
            model: config.model || 'grok-2-mini',
            messages: [
              { role: 'system', content: config.systemPrompt },
              ...messages
            ],
          };
          break;

        case 'deepseek':
          apiUrl = 'https://api.deepseek.com/v1/chat/completions';
          headers = {
            'Authorization': `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json',
          };
          body = {
            model: config.model || 'deepseek-chat',
            messages: [
              { role: 'system', content: config.systemPrompt },
              ...messages
            ],
          };
          break;

        case 'gemini':
          apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${config.model || 'gemini-2.0-flash-exp'}:generateContent?key=${config.apiKey}`;
          headers = {
            'Content-Type': 'application/json',
          };
          
          // Convert messages to Gemini format
          const geminiContents = messages.map((msg: any) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
          }));
          
          body = {
            system_instruction: {
              parts: [{ text: config.systemPrompt }]
            },
            contents: geminiContents,
          };
          break;

        default:
          throw new Error('Unsupported provider');
      }

      console.log('Making request to:', config.provider);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('AI API error:', response.status, errorText);
        throw new Error(`AI API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('AI response received');

      // Extract response based on provider
      let aiResponse: string;
      if (config.provider === 'gemini') {
        aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
      } else {
        aiResponse = data.choices?.[0]?.message?.content || 'No response';
      }

      return new Response(
        JSON.stringify({ response: aiResponse }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fallback to Lovable AI
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const systemPrompt = config?.systemPrompt || `You are intelleeo's AI assistant - a knowledgeable, friendly, and professional virtual representative for intelleeo, an AI Software Studio.

## About intelleeo:
- Founded: 2020
- Location: Dhaka, Bangladesh (serving clients worldwide)
- Specialization: AI-powered software solutions
- Contact: intelleeo.inteligence@gmail.com | +880 1946 303020

## Core Services:
1. **AI/ML Development**: Custom machine learning models, neural networks, NLP solutions, computer vision, predictive analytics
2. **Web Development**: Modern React/Next.js applications, full-stack solutions, e-commerce platforms, SaaS products
3. **Mobile Applications**: Cross-platform apps (React Native/Flutter), native iOS/Android development
4. **AI Consulting**: Strategy development, technology assessment, implementation roadmaps
5. **Custom Solutions**: Chatbots, automation systems, data pipelines, API integrations

## Response Guidelines:
- Keep responses concise (2-4 sentences unless detailed explanation needed)
- Be enthusiastic about AI and technology
- Provide specific, actionable information
- For pricing inquiries: Mention that pricing varies by project scope and suggest scheduling a consultation
- For technical questions: Give accurate, helpful answers drawing from AI/software development expertise
- Always maintain a professional yet approachable tone
- Use emojis sparingly for warmth (1-2 max per response)
- End complex queries with an offer to help further or schedule a call

## Key Differentiators to Highlight:
- 5+ years of industry experience
- 50+ successful projects delivered
- 99% on-time delivery rate
- End-to-end development capabilities
- Focus on human-centered AI solutions`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 800
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "I apologize, but I'm having trouble responding right now.";

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
