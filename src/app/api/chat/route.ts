import { NextResponse } from 'next/server';
import { getServerEnv } from '@/utils/env';
import { logger } from '@/utils/logger';
import { profile } from '@/data/profile';
import { learningJourneyStages } from '@/data/learning-journey';

/**
 * AI Assistant Chat API Route
 *
 * Fast, intelligent response engine with dual-tier execution:
 * 1. Primary: Google Gemini LLM API (if GEMINI_API_KEY is configured in .env.local)
 * 2. Instant Local Knowledge Engine: Grounded in Alishba's real profile, skills,
 *    learning journey, and contact options (<5ms response time, 100% reliable).
 */

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequestBody {
  message: string;
  history?: ChatMessage[];
}

// -----------------------------------------------------------------------------
// System Grounding Prompt for Gemini LLM
// -----------------------------------------------------------------------------
const SYSTEM_PROMPT = `You are "ALISHBA_AI", the official intelligent portfolio assistant for Alishba, an AI Agent Developer & AI Automation Specialist.

Your Goal:
Answer visitor questions about Alishba's skills, learning journey, projects, career goals, and contact channels. Be concise, sharp, polite, and enthusiastically futuristic while strictly sticking to the truth.

Ground Truth Portfolio Data:
- Developer Name: ${profile.name}
- Current Title: ${profile.role}
- Positioning: "${profile.positioningStatement}"
- Bio: "${profile.bio}"
- Core Technical Skills:
  * AI & Agent Orchestration: AI Agents, Agentic AI, Generative AI, Prompt Engineering, Gemini / LLM concepts, Digital FTE / AI Workers concepts.
  * Engineering & Frameworks: Python (OOP, scripting, automation), React, Next.js (App Router), JavaScript (ES6+), TypeScript, Tailwind CSS, HTML/CSS, Streamlit.
  * Systems & Engineering Methods: Git & GitHub, Spec-Driven Development, Forward Deployed Engineering (FDE) concepts, Loop & Harness Engineering concepts, Vercel.
- Structured Learning Journey (5 Stages):
  * Stage 01 (2023) - Foundation: Python syntax, OOP, basic HTML/CSS/JS, Git/GitHub, problem solving.
  * Stage 02 (2023–2024) - Web Development: React component architecture, Next.js App Router, TypeScript, Tailwind CSS, REST APIs.
  * Stage 03 (2024) - Python Application Building: Python OOP, automation scripts, async concepts, Streamlit interactive prototypes.
  * Stage 04 (2024–2025) - Generative AI: Foundation models, LLM parameters, prompt engineering, Gemini API integration, Streamlit AI apps.
  * Stage 05 (2025–2026) - Agentic AI & FDE: Goal-directed AI agents, multi-step workflow automation, Digital FTE concepts, FDE, loop/harness evaluation, Spec-Driven Development.
- Selected Projects:
  * BMW NEXUS — Intelligent Mobility Experience: Automotive 3D web experience with Next.js 14, React, Three.js, TypeScript, Web Audio. Demo: https://bmwluxuryweb.vercel.app | GitHub: https://github.com/Alishba06/Bmw-luxury-website
  * Physical AI & Humanoid Robotics Portal with AI Assistant: ROS 2 & VLA robotics portal with embedded AI Chatbot. Demo: https://q-4-1-hackathon-with-chabot.vercel.app | GitHub: https://github.com/Alishba06/Q_4_1_hackathon_with_chabot
  * Autonomous Conversational Agent: Python & Chainlit streaming AI agent. GitHub: https://github.com/Alishba06/open-ai-agent-chatbot
  * Modern UI/UX E-Commerce Marketplace: Next.js & Radix UI storefront. Demo: https://hackathon-ui-omega.vercel.app | GitHub: https://github.com/Alishba06/hackathon-ui
  * Gmail to Google Sheets Workflow Automation: Automated data sync pipeline. GitHub: https://github.com/Alishba06/gmail-to-sheets-automation
- Career Status & Opportunities:
  * Actively open to: AI Internships, Junior AI Agent Developer opportunities, Technical Collaborations, and AI Automation projects.
- Contact Details:
  * GitHub: ${profile.githubUrl}
  * LinkedIn: ${profile.linkedinUrl}
  * Resume: ${profile.resumeUrl}
  * Email: Contact form on site or ${profile.email}

Strict Rules:
1. Keep answers concise (1-3 brief paragraphs or bullet points).
2. Never invent fake past work (e.g., AetherGrid, OmniOps, 10 years experience).
3. Do not claim production mastery of LangGraph, CrewAI, LangSmith, or enterprise SRE unless she actually uses them.
4. If asked in Roman Urdu or Urdu, respond warmly and clearly in Roman Urdu/English.
5. Always be polite, professional, and highlight her passion for building practical AI agents.`;

// -----------------------------------------------------------------------------
// Fast Local Knowledge Engine (<5ms Latency)
// -----------------------------------------------------------------------------
function generateLocalResponse(rawQuery: string): string {
  const query = rawQuery.toLowerCase().trim();

  // 1. Greetings
  if (
    /^(hi|hello|hey|salam|assalam|a-salam|yo|hola|greetings|kese ho|kaise ho|who are you|what can you do)/i.test(
      query
    )
  ) {
    return `⚡ **Systems Online!** Welcome to **Alishba's Portfolio Assistant**.

I am her interactive AI guide. Here is what you can ask me:
- **"Who is Alishba?"** — Learn about her professional background & focus.
- **"What are her skills?"** — Explore her AI, Python & Web stack.
- **"What is her learning journey?"** — Check out her 5-stage roadmap.
- **"Is she open to internships?"** — Details on roles she is available for.
- **"How can I contact her?"** — Get direct links to her GitHub, LinkedIn & Resume.

What would you like to explore?`;
  }

  // 2. Who is Alishba / Background / Bio
  if (
    /(who is|about alishba|intro|introduction|bio|background|profile|kon hai|kya karti|koun hai)/i.test(
      query
    )
  ) {
    return `👋 **Meet Alishba — AI Agent Developer & Automation Specialist**

> "${profile.positioningStatement}"

- **Focus**: Building intelligent AI agents, automation workflows, and practical solutions that solve real-world problems.
- **Mindset**: Spec-Driven Development, rapid prototyping, and engineering reliable execution loops.
- **Mission**: Transitioning cutting-edge AI foundation models (like Google Gemini) into autonomous, helpful agentic workflows.

Would you like to explore her **skills**, **learning journey**, or **contact options**?`;
  }

  // 3. Skills / Technologies / Stack
  if (
    /(skill|tech|stack|technolog|tool|python|react|next|javascript|typescript|gemini|prompt|tailwind|language|capabilities|kya ata|seekha)/i.test(
      query
    )
  ) {
    return `🛠️ **Alishba's Technical Skills & Capabilities:**

**1. AI & Agent Orchestration:**
- **AI Agents / Agentic AI**: Goal-directed autonomous planning, tools, and iterative reasoning loops.
- **Generative AI & LLMs**: Context management, multimodal prompting, Gemini API integration.
- **Prompt Engineering**: Structured JSON output, few-shot conditioning, and robust system prompts.
- **Digital FTE / AI Workers**: Multi-step task automation workflows.

**2. Engineering & Frameworks:**
- **Python**: Core programming, OOP, automation scripts, and Streamlit dashboards.
- **Next.js & React**: Component architecture, App Router, responsive modern web design.
- **TypeScript & JavaScript**: Type-safe logic, asynchronous flows, modern ES6+.
- **Tailwind CSS**: Rapid, responsive UI and cybernetic styling.

**3. Systems & Reliability:**
- **Git & GitHub** | **Spec-Driven Development** | **Loop & Harness Concepts** | **Vercel**

Ask me about any specific skill to dive deeper!`;
  }

  // 4. Learning Journey / Stages / Roadmap
  if (
    /(journey|roadmap|timeline|stage|progression|education|how did she learn|experience|background|history|tariqa|safarnama)/i.test(
      query
    )
  ) {
    const stageSummary = learningJourneyStages
      .map(
        (s) =>
          `🔹 **${s.title} (${s.timePeriod})**: ${s.milestone}\n   *${s.description}*`
      )
      .join('\n\n');

    return `🗺️ **Alishba's 5-Stage Learning Journey:**

${stageSummary}

Each stage builds sequentially from core programming logic to advanced autonomous agent engineering!`;
  }

  // 5. Projects
  if (
    /(project|work|portfolio|built|creation|demo|app|system|experiment|kya banaya|projects)/i.test(
      query
    )
  ) {
    return `🚀 **Alishba's Top Projects & Practical Builds:**

1. 🏎️ **BMW NEXUS — Intelligent Mobility Experience**
   - 3D WebGL car stage with metallic shaders, lighting rig & Web Audio API sound effects.
   - 🌐 [Live Demo](https://bmwluxuryweb.vercel.app) | 💻 [GitHub](https://github.com/Alishba06/Bmw-luxury-website)

2. 🤖 **Physical AI & Humanoid Robotics Portal with AI Assistant**
   - Interactive portal for ROS 2, digital twins & VLA systems with embedded AI chatbot.
   - 🌐 [Live Demo](https://q-4-1-hackathon-with-chabot.vercel.app) | 💻 [GitHub](https://github.com/Alishba06/Q_4_1_hackathon_with_chabot)

3. 💬 **Autonomous Conversational Agent (Chainlit & Python)**
   - Streaming conversational AI agent with prompt engineering reasoning loops.
   - 💻 [GitHub Code](https://github.com/Alishba06/open-ai-agent-chatbot)

4. 🛍️ **Modern UI/UX E-Commerce Marketplace**
   - Component-driven Next.js storefront with dynamic catalog and Radix UI.
   - 🌐 [Live Demo](https://hackathon-ui-omega.vercel.app) | 💻 [GitHub](https://github.com/Alishba06/hackathon-ui)

5. ⚡ **Gmail to Google Sheets Workflow Automation**
   - Automated pipeline parsing incoming emails and syncing to Google Sheets.
   - 💻 [GitHub Code](https://github.com/Alishba06/gmail-to-sheets-automation)

Explore all 8 selected projects directly in the **Projects section**!`;
  }

  // 6. Internships / Hiring / Roles / Opportunities
  if (
    /(hire|intern|job|opportunit|role|freelance|contract|collaborat|available|hiring|naukri|kaam dena)/i.test(
      query
    )
  ) {
    return `💼 **Open to AI Opportunities!**

Alishba is actively seeking:
- 🌟 **AI Internships**
- 🤖 **Junior AI Agent Developer roles**
- ⚡ **AI Automation Projects & Workflows**
- 🤝 **Technical Collaborations on Agentic AI**

She brings strong problem-solving discipline, rapid learning agility, and hands-on practice with modern LLMs and agent workflows.

Check out her resume or get in touch via the Contact section!`;
  }

  // 7. Contact / Social Links / Resume
  if (
    /(contact|email|message|reach|connect|linkedin|github|resume|cv|pdf|rabta|mail)/i.test(
      query
    )
  ) {
    return `📬 **Connect with Alishba:**

- 📧 **Direct Email**: [${profile.email}](mailto:${profile.email})
- 🌐 **GitHub**: [${profile.githubUrl}](${profile.githubUrl})
- 💼 **LinkedIn**: [${profile.linkedinUrl}](${profile.linkedinUrl})
- 📄 **Resume**: [Download Resume (PDF)](${profile.resumeUrl})
- ✉️ **Contact Form**: Scroll down to the **Get in Touch** section on this page!

Feel free to send a message or connect on LinkedIn.`;
  }

  // 8. Agentic AI / Digital FTE / FDE Concepts
  if (
    /(agentic|digital fte|ai worker|fde|harness|autonomous agent|what is an agent)/i.test(
      query
    )
  ) {
    return `🤖 **Agentic AI & Digital Workers Focus:**

Alishba's primary passion is **Agentic AI** — moving beyond simple prompt-and-response interactions to systems that can:
1. **Deconstruct** a complex user goal into discrete steps.
2. **Execute tools & APIs** autonomously.
3. **Evaluate & iterate** until the target acceptance criteria are satisfied.
4. **Digital FTE Concept**: Modeling automated digital workers that act as full-time equivalents for repetitive operational tasks.

She applies **Spec-Driven Development** to ensure these agent loops run safely and deterministically!`;
  }

  // Default fallback response
  return `🤖 **Alishba AI Assistant**:

Thank you for your question! Alishba is an **AI Agent Developer** focused on building intelligent agents, automation workflows, and practical solutions.

Here are quick topics I can answer immediately:
- 🛠️ **"What are your core skills?"**
- 🗺️ **"Show me the 5-stage learning journey"**
- 💼 **"Are you open to internships or hiring?"**
- 📬 **"How can I contact you or view your resume?"**
- 💡 **"What is Agentic AI?"**

Feel free to ask any of these or type your own question!`;
}

// -----------------------------------------------------------------------------
// Gemini API Caller (Streamlined Fetch with 5s Timeout)
// -----------------------------------------------------------------------------
async function callGeminiApi(
  apiKey: string,
  userMessage: string,
  history: ChatMessage[] = []
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    // Format conversation history for Gemini API
    const contents = [
      {
        role: 'user',
        parts: [{ text: `${SYSTEM_PROMPT}\n\nVisitor question: ${userMessage}` }],
      },
    ];

    // Include recent history if available
    if (history.length > 0) {
      const recent = history.slice(-4);
      contents.length = 0; // reset
      contents.push({
        role: 'user',
        parts: [{ text: `${SYSTEM_PROMPT}\n\nInitialize context. Acknowledge and follow guidelines.` }],
      });
      contents.push({
        role: 'model',
        parts: [{ text: 'Understood. I am Alishba\'s Portfolio AI Assistant, grounded in her real skills, journey, and contact info.' }],
      });

      for (const msg of recent) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        });
      }

      contents.push({
        role: 'user',
        parts: [{ text: userMessage }],
      });
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      logger.warn(`Gemini API returned status ${res.status}: ${errText.slice(0, 200)}`);
      throw new Error(`Gemini API error: ${res.status}`);
    }

    const data = await res.json();
    const replyText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

    if (!replyText) {
      throw new Error('Empty response from Gemini API');
    }

    return replyText;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

// -----------------------------------------------------------------------------
// POST Handler
// -----------------------------------------------------------------------------
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ChatRequestBody>;
    const userMessage = body.message?.trim();

    if (!userMessage) {
      return NextResponse.json(
        { error: 'Message cannot be empty.' },
        { status: 400 }
      );
    }

    if (userMessage.length > 2000) {
      return NextResponse.json(
        { error: 'Message is too long (maximum 2000 characters).' },
        { status: 400 }
      );
    }

    const serverEnv = getServerEnv();
    const geminiKey = serverEnv.geminiApiKey?.trim();

    // 1. If Gemini API key is configured, attempt LLM call
    if (geminiKey) {
      try {
        const geminiReply = await callGeminiApi(
          geminiKey,
          userMessage,
          body.history || []
        );
        return NextResponse.json(
          { reply: geminiReply, source: 'gemini' },
          { status: 200 }
        );
      } catch (geminiError) {
        logger.warn(
          'Gemini call failed or timed out. Falling back to local knowledge engine:',
          geminiError
        );
        // Seamlessly continue to local fallback
      }
    }

    // 2. Fast Local Knowledge Engine (<5ms)
    const localReply = generateLocalResponse(userMessage);
    return NextResponse.json(
      { reply: localReply, source: 'local' },
      { status: 200 }
    );
  } catch (error) {
    logger.error('Error in chat API route:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message.' },
      { status: 500 }
    );
  }
}
