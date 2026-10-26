import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI SDK if API key is present
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey
    ? new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      })
    : null;

  // 1. Config / Health route
  app.get('/api/config', (_req, res) => {
    res.json({
      hasApiKey: Boolean(apiKey),
      status: 'ready',
      version: '1.0.0',
    });
  });

  // 2. Generate full campaign plan
  app.post('/api/generate-campaign', async (req, res) => {
    try {
      const {
        businessName,
        productDescription,
        industry,
        targetAudience,
        marketingObjective,
        platform,
        campaignTone,
        budget,
        duration,
      } = req.body;

      if (!businessName || !productDescription || !targetAudience) {
        return res.status(400).json({
          error: 'Missing required fields: businessName, productDescription, targetAudience are required.',
        });
      }

      if (!ai) {
        return res.status(503).json({
          error: 'CONFIG_MISSING',
          message: 'GEMINI_API_KEY is not configured on the server. Please configure it in your secrets environment to activate live generation.',
        });
      }

      const prompt = `
You are MarketMate.AI, an enterprise marketing strategist, brand architect, and growth consultant.
Transform this business brief into a comprehensive, high-conversion, professional marketing campaign plan.

BRIEF:
- Business/Brand Name: ${businessName}
- Industry/Niche: ${industry || 'General Business'}
- Product/Service Description: ${productDescription}
- Target Audience: ${targetAudience}
- Marketing Objective: ${marketingObjective || 'Brand Awareness'}
- Primary Channel/Platform: ${platform || 'Instagram'}
- Campaign Tone: ${campaignTone || 'Creative & Inspiring'}
- Budget Range: ${budget || 'Lean / Organic bootstrapping'}
- Campaign Duration: ${duration || '4 Weeks'}

Generate realistic, high-quality, actionable strategic outputs. Every caption must have a strong hook, storytelling body, and crisp CTA. The calendar must specify actual actionable concepts.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are MarketMate.AI, a world-class marketing director. Provide detailed, pragmatic, non-generic marketing blueprints in strict structured JSON.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overview: {
                type: Type.STRING,
                description: '2-3 crisp sentences summarizing the core campaign strategy and mission',
              },
              audienceInsights: {
                type: Type.STRING,
                description: 'Specific demographic, psychographic, behavioral traits, and friction points of the target market',
              },
              usp: {
                type: Type.STRING,
                description: 'Sharp, distinct unique selling proposition statement that differentiates this offer',
              },
              themeAndSlogan: {
                type: Type.OBJECT,
                properties: {
                  theme: {
                    type: Type.STRING,
                    description: 'The overarching creative theme title of the campaign',
                  },
                  slogan: {
                    type: Type.STRING,
                    description: 'Memorable, rhythmic campaign punchline/slogan',
                  },
                },
                required: ['theme', 'slogan'],
              },
              contentIdeas: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '4 distinct, engaging social media creative content concepts',
              },
              captions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    hook: { type: Type.STRING, description: 'Attention-grabbing first line' },
                    body: { type: Type.STRING, description: 'Engaging value-driven story or explanation' },
                    callToAction: { type: Type.STRING, description: 'Clear direct action step' },
                  },
                  required: ['hook', 'body', 'callToAction'],
                },
                description: '3 complete ready-to-use social captions formatted with hook, body, and CTA',
              },
              hashtags: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '6 to 8 relevant discovery and brand hashtags including the hash sign',
              },
              contentCalendar: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.STRING, description: 'Cadence timing e.g. Day 1 (Mon)' },
                    contentFocus: { type: Type.STRING, description: 'Specific subject or theme' },
                    format: { type: Type.STRING, description: 'Asset type e.g. Carousel, Short Video, Story Poll' },
                  },
                  required: ['day', 'contentFocus', 'format'],
                },
                description: '4 to 6 scheduled content calendar entries',
              },
              channelRecommendations: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '3 specific marketing channel tactics tailored to the brand',
              },
              budgetAllocation: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '3-4 realistic percentage breakdowns of budget investment across channels/creative/ads',
              },
              kpis: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '3-4 realistic, measurable key performance indicators to monitor',
              },
              nextSteps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '3 concrete immediate action steps to launch',
              },
            },
            required: [
              'overview',
              'audienceInsights',
              'usp',
              'themeAndSlogan',
              'contentIdeas',
              'captions',
              'hashtags',
              'contentCalendar',
              'channelRecommendations',
              'budgetAllocation',
              'kpis',
              'nextSteps',
            ],
          },
        },
      });

      const rawText = response.text;
      if (!rawText) {
        throw new Error('AI returned an empty response.');
      }

      const planData = JSON.parse(rawText);

      return res.json({
        id: `plan-${Date.now()}`,
        createdAt: new Date().toISOString(),
        businessName,
        industry: industry || 'General',
        platform: platform || 'Instagram',
        campaignTone: campaignTone || 'Creative',
        isSample: false,
        ...planData,
      });
    } catch (err: any) {
      console.error('Error generating campaign:', err);
      const errStr = String(err?.message || err);
      const isBillingOrQuota = errStr.includes('403') || errStr.includes('billing') || errStr.includes('quota') || errStr.includes('RESOURCE_EXHAUSTED');
      
      return res.status(200).json({
        isFallback: true,
        error: isBillingOrQuota ? 'BILLING_OR_API_LIMIT' : 'GENERATION_ERROR',
        message: isBillingOrQuota
          ? 'Live API Notice: The project Gemini API key requires an active billing project or has reached quota limits. Loading the complete interactive sample demonstration below so you can explore all 12 campaign cards, live editing, and exports.'
          : (err.message || 'Failed to generate campaign plan.'),
      });
    }
  });

  // 3. Standalone micro-tool execution
  app.post('/api/run-tool', async (req, res) => {
    try {
      const { toolName, context, parameters } = req.body;

      if (!toolName || !context) {
        return res.status(400).json({ error: 'toolName and context are required.' });
      }

      if (!ai) {
        return res.status(503).json({
          error: 'CONFIG_MISSING',
          message: 'GEMINI_API_KEY is not configured on the server.',
        });
      }

      const prompt = `
You are the MarketMate.AI specialist tool: "${toolName}".
User Context/Input:
${context}

${parameters ? `Additional Parameters: ${JSON.stringify(parameters)}` : ''}

Deliver an expert, highly actionable, concise output for this specific marketing task.
Format clearly with line breaks, bullet points, and headers where helpful.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are an elite copywriter and digital strategist delivering punchy, immediate marketing assets.',
        },
      });

      return res.json({
        result: response.text || 'No output produced.',
        toolName,
      });
    } catch (err: any) {
      console.error('Error running tool:', err);
      const errStr = String(err?.message || err);
      const isBillingOrQuota = errStr.includes('403') || errStr.includes('billing') || errStr.includes('quota');
      return res.status(200).json({
        result: isBillingOrQuota
          ? `[Notice: Live Gemini API requires billing or reached quota]\n\nStrategic Preview for ${req.body?.toolName || 'Tool'}:\nBased on your brief: Focus on clear, concrete customer pain points and a strong single call to action.\n1. Core Hook: "Turn daily friction into your distinct competitive advantage."\n2. Primary Action: Direct users to a high-converting landing page with social proof.\n3. Distribution: Prioritize short-form video reels and targeted community channels.`
          : `Error: ${err.message || 'Failed to execute tool.'}`,
        isFallback: true,
        toolName: req.body?.toolName,
      });
    }
  });

  // 4. Contact form submission
  app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    // Record contact inquiry in memory or log
    console.log(`[Contact Submission] from ${name} (${email}): ${message}`);
    return res.json({
      success: true,
      message: 'Thank you for your message. Our product team will review your inquiry.',
    });
  });

  // 5. Setup Vite middleware or static serving
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MarketMate.AI server is listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
