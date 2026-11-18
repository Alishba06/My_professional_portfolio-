import fs from 'node:fs';
import path from 'node:path';

/**
 * Standard Compliant PDF Generator for Alishba's Resume
 * Generates an elegant, professional A4 / Letter PDF with standard Helvetica fonts,
 * vector divider lines, bullet glyphs, and structured sections.
 */

class SimplePdfBuilder {
  constructor() {
    this.objects = [];
    this.pageContent = [];
  }

  addObject(content) {
    this.objects.push(content);
    return this.objects.length; // 1-based index
  }

  addText(text, x, y, font = '/F1', size = 12, color = [0, 0, 0]) {
    const [r, g, b] = color;
    // Escape parentheses and backslashes in PDF strings
    const safeText = text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    this.pageContent.push(
      `q ${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} rg BT ${font} ${size} Tf ${x.toFixed(2)} ${y.toFixed(2)} Td (${safeText}) Tj ET Q`
    );
  }

  addLine(x1, y1, x2, y2, color = [0.8, 0.8, 0.8], lineWidth = 1) {
    const [r, g, b] = color;
    this.pageContent.push(
      `q ${lineWidth} w ${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} RG ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S Q`
    );
  }

  addRect(x, y, w, h, fillColor = [0.95, 0.95, 0.95]) {
    const [r, g, b] = color;
    this.pageContent.push(
      `q ${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} rg ${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f Q`
    );
  }

  build() {
    const streamContent = this.pageContent.join('\n');
    const streamLength = Buffer.byteLength(streamContent, 'utf-8');

    // PDF Object Hierarchy:
    // 1: Info
    // 2: Catalog
    // 3: Pages
    // 4: Page
    // 5: Content Stream
    // 6: Font Bold
    // 7: Font Regular
    // 8: Font Oblique

    const obj1 = `<< /Title (Alishba - AI Agent Developer Resume)\n   /Author (Alishba)\n   /Subject (AI Agent Developer Resume)\n   /Creator (Alishba Portfolio Engine)\n   /Producer (Alishba Resume Generator)\n   /CreationDate (D:${new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)}Z)\n>>`;
    const obj2 = `<< /Type /Catalog\n   /Pages 3 0 R\n>>`;
    const obj3 = `<< /Type /Pages\n   /Kids [4 0 R]\n   /Count 1\n>>`;
    const obj4 = `<< /Type /Page\n   /Parent 3 0 R\n   /MediaBox [0 0 612 792]\n   /Contents 5 0 R\n   /Resources << /Font << /F1 6 0 R /F2 7 0 R /F3 8 0 R >> >>\n>>`;
    const obj5 = `<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream`;
    const obj6 = `<< /Type /Font\n   /Subtype /Type1\n   /BaseFont /Helvetica-Bold\n>>`;
    const obj7 = `<< /Type /Font\n   /Subtype /Type1\n   /BaseFont /Helvetica\n>>`;
    const obj8 = `<< /Type /Font\n   /Subtype /Type1\n   /BaseFont /Helvetica-Oblique\n>>`;

    const rawObjects = [obj1, obj2, obj3, obj4, obj5, obj6, obj7, obj8];

    let output = '%PDF-1.4\n';
    const offsets = [];

    for (let i = 0; i < rawObjects.length; i++) {
      offsets.push(Buffer.byteLength(output, 'utf-8'));
      output += `${i + 1} 0 obj\n${rawObjects[i]}\nendobj\n`;
    }

    const startXref = Buffer.byteLength(output, 'utf-8');
    output += `xref\n0 ${rawObjects.length + 1}\n0000000000 65535 f \n`;

    for (const offset of offsets) {
      output += `${String(offset).padStart(10, '0')} 00000 n \n`;
    }

    output += `trailer\n<< /Size ${rawObjects.length + 1}\n   /Root 2 0 R\n   /Info 1 0 R\n>>\nstartxref\n${startXref}\n%%EOF\n`;

    return Buffer.from(output, 'utf-8');
  }
}

export function generateResumePdf() {
  const pdf = new SimplePdfBuilder();

  // Page Dimensions: 612 x 792 (Letter)
  const left = 45;
  const right = 567;
  let y = 748;

  // 1. Header
  pdf.addText('ALISHBA', left, y, '/F1', 20, [0.05, 0.1, 0.2]); // Deep Navy
  y -= 17;
  pdf.addText('AI AGENT DEVELOPER // AI AUTOMATION', left, y, '/F1', 9.5, [0.0, 0.52, 0.68]); // Cyan/Teal
  y -= 15;
  pdf.addText('Karachi, Pakistan   |   github.com/Alishba06   |   linkedin.com/in/alishba-javed-4961b12bb   |   alishbainteligent46@gmail.com', left, y, '/F2', 7.5, [0.35, 0.4, 0.45]);
  y -= 10;

  // Top Divider Line
  pdf.addLine(left, y, right, y, [0.0, 0.52, 0.68], 1.5);
  y -= 16;

  // Helper for Section Titles
  const addSectionTitle = (title) => {
    pdf.addText(title, left, y, '/F1', 9.5, [0.08, 0.15, 0.25]);
    pdf.addLine(left, y - 3, right, y - 3, [0.82, 0.86, 0.9], 0.75);
    y -= 14;
  };

  // 2. Professional Summary
  addSectionTitle('PROFESSIONAL SUMMARY');
  const summaryLines = [
    'AI Agent Developer dedicated to building autonomous AI agents, workflow automation, and practical solutions that solve',
    'real-world industry problems. Hands-on expertise in Python, modern web frameworks (Next.js, React, TypeScript), and',
    'Generative AI foundation models (Google Gemini API, prompt engineering, structured JSON generation). Committed to',
    'Spec-Driven Development, iterative evaluation harnesses, and forward-deployed engineering methodologies.',
  ];
  for (const line of summaryLines) {
    pdf.addText(line, left, y, '/F2', 8.2, [0.2, 0.23, 0.28]);
    y -= 11;
  }
  y -= 5;

  // 3. Technical Skills
  addSectionTitle('CORE TECHNICAL SKILLS');
  const skills = [
    ['AI & Agent Orchestration:', 'AI Agents / Agentic AI, Generative AI, Prompt Engineering, Gemini / LLM concepts, Digital FTEs'],
    ['Engineering & Frameworks:', 'Python (OOP, Scripting, Automation), JavaScript, TypeScript, Next.js, React, Tailwind CSS, Streamlit'],
    ['Systems & Engineering:', 'Git & GitHub, Spec-Driven Development, Loop & Harness Engineering concepts, FDE concepts, Vercel'],
  ];
  for (const [category, details] of skills) {
    pdf.addText(category, left, y, '/F1', 8, [0.12, 0.2, 0.3]);
    pdf.addText(details, left + 130, y, '/F2', 8, [0.25, 0.28, 0.32]);
    y -= 11.5;
  }
  y -= 5;

  // 4. Learning Journey Roadmap
  addSectionTitle('STRUCTURED TECHNICAL ROADMAP & PROGRESSION');

  const stages = [
    {
      title: 'Stage 05 (2025 - 2026): Agentic AI, Digital FTEs & Forward Deployed Engineering (FDE)',
      points: [
        'Researching autonomous agent planning, tool execution loops, and iterative reasoning architectures.',
        'Exploring Digital FTE / AI Worker paradigms to design agents that automate multi-step operational workflows.',
        'Applying Spec-Driven Development and loop evaluation harnesses for structured, reliable agent execution.',
      ],
    },
    {
      title: 'Stage 04 (2024 - 2025): Generative AI & Foundation Models (Gemini)',
      points: [
        'Integrated Google Gemini API into Python applications for context management and multimodal inference.',
        'Engineered high-accuracy prompts utilizing few-shot conditioning, system constraints, and structured JSON outputs.',
        'Constructed rapid interactive AI demonstration prototypes and testing utilities using Streamlit.',
      ],
    },
    {
      title: 'Stage 03 (2024): Python Application Development & Automation',
      points: [
        'Built modular Python tools using object-oriented principles, automation scripts, and asynchronous logic.',
      ],
    },
    {
      title: 'Stage 02 (2023 - 2024): Modern Component-Driven Web Development',
      points: [
        'Developed scalable frontend applications utilizing React, Next.js (App Router), TypeScript, and Tailwind CSS.',
      ],
    },
    {
      title: 'Stage 01 (2023): Core IT, Python & Web Fundamentals',
      points: [
        'Mastered foundational programming principles, OOP logic in Python, semantic HTML/CSS, and Git/GitHub.',
      ],
    },
  ];

  for (const stage of stages) {
    pdf.addText(stage.title, left, y, '/F1', 8.2, [0.05, 0.35, 0.5]);
    y -= 10.5;
    for (const pt of stage.points) {
      pdf.addText('-', left + 6, y, '/F1', 8, [0.0, 0.52, 0.68]);
      pdf.addText(pt, left + 14, y, '/F2', 7.8, [0.22, 0.25, 0.29]);
      y -= 10;
    }
    y -= 2;
  }
  y -= 3;

  // 5. Selected Projects & Experiments
  addSectionTitle('KEY PRACTICAL PROJECTS & EXPERIMENTS');

  const projects = [
    {
      title: 'BMW NEXUS — Intelligent Mobility Showcase',
      tech: 'Next.js 14, Three.js, React, TypeScript, Web Audio',
      desc: 'Architected an ultra-premium automotive 3D web experience with an interactive WebGL car stage, shaders, and real-time audio.',
    },
    {
      title: 'Physical AI & Humanoid Robotics Portal with AI Assistant',
      tech: 'Next.js, Python, AI Chatbot, ROS 2, TypeScript',
      desc: 'Comprehensive learning guide and documentation portal for Physical AI & robotics featuring an embedded interactive AI chatbot.',
    },
  ];

  for (const proj of projects) {
    pdf.addText(proj.title, left, y, '/F1', 8.2, [0.1, 0.15, 0.22]);
    pdf.addText(`[ ${proj.tech} ]`, right - 220, y, '/F3', 7.5, [0.35, 0.42, 0.5]);
    y -= 10;
    pdf.addText('-', left + 6, y, '/F1', 8, [0.0, 0.52, 0.68]);
    pdf.addText(proj.desc, left + 14, y, '/F2', 7.8, [0.22, 0.25, 0.29]);
    y -= 12;
  }
  y -= 3;

  // 6. Education & Certifications
  addSectionTitle('EDUCATION & PROFESSIONAL INITIATIVES');
  pdf.addText('Governor Sindh Initiative for GenAI, Web3 & Cloud (GIAIC)', left, y, '/F1', 8.2, [0.1, 0.15, 0.22]);
  pdf.addText('Ongoing', right - 60, y, '/F3', 8, [0.4, 0.45, 0.5]);
  y -= 10;
  pdf.addText('-', left + 6, y, '/F1', 8, [0.0, 0.52, 0.68]);
  pdf.addText('Comprehensive specialized program focusing on Artificial Intelligence, Agentic Systems, TypeScript, Python, and Cloud Engineering.', left + 14, y, '/F2', 7.8, [0.22, 0.25, 0.29]);

  return pdf.build();
}

// Write to public/resume.pdf
const pdfBuffer = generateResumePdf();
const targetPath = path.resolve(process.cwd(), 'public', 'resume.pdf');
fs.writeFileSync(targetPath, pdfBuffer);
console.log(`Successfully generated professional resume: ${targetPath} (${pdfBuffer.length} bytes)`);
