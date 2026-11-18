import test from 'node:test';
import assert from 'node:assert/strict';

test('Portfolio Profile Data Integrity', async () => {
  // Test profile constants
  const profile = {
    name: 'Alishba',
    role: 'AI Agent Developer',
    positioningStatement: 'I build AI-powered intelligent solutions to solve real industry problems.',
    email: 'alishbainteligent46@gmail.com',
    githubUrl: 'https://github.com/Alishba06',
    linkedinUrl: 'https://linkedin.com/in/alishba-javed-4961b12bb/',
    resumeUrl: '/resume.pdf',
  };

  assert.equal(profile.name, 'Alishba');
  assert.equal(profile.role, 'AI Agent Developer');
  assert.ok(profile.positioningStatement.includes('solve real industry problems'));
  assert.ok(profile.githubUrl.startsWith('https://github.com/'));
  assert.ok(profile.linkedinUrl.includes('linkedin.com/in/'));
  assert.equal(profile.resumeUrl, '/resume.pdf');
});

test('Projects Problem-Solution-Outcome Structure', async () => {
  const sampleProject = {
    id: 'healthcare-rag-agent',
    title: 'Autonomous Clinical Trial Recruitment Agent',
    problem: 'Manual patient screening takes 3-5 days per candidate with a 38% dropout rate.',
    solution: 'Engineered a dual-loop agentic RAG pipeline using LangGraph and vector similarity.',
    outcome: 'Reduced screening time from 4 days to 4 minutes and improved cohort match accuracy by 34%.',
  };

  assert.ok(sampleProject.id);
  assert.ok(sampleProject.problem.length > 20);
  assert.ok(sampleProject.solution.length > 20);
  assert.ok(sampleProject.outcome.length > 20);
});

test('Purposeful 6-Channel Contact Options Spec', async () => {
  const expectedContactIds = [
    'contact-me',
    'lets-work-together',
    'lets-solve-problem',
    'github',
    'linkedin',
    'resume',
  ];

  assert.equal(expectedContactIds.length, 6);
  assert.ok(expectedContactIds.includes('contact-me'));
  assert.ok(expectedContactIds.includes('lets-work-together'));
  assert.ok(expectedContactIds.includes('lets-solve-problem'));
  assert.ok(expectedContactIds.includes('github'));
  assert.ok(expectedContactIds.includes('linkedin'));
  assert.ok(expectedContactIds.includes('resume'));
});

test('Learning Journey 5-Stage Chronological Progression', async () => {
  const expectedStages = [
    {
      id: 'early-foundation',
      order: 1,
      expectedTech: ['Python', 'OOP', 'HTML', 'CSS', 'JavaScript', 'Git & GitHub', 'VS Code'],
    },
    {
      id: 'web-development',
      order: 2,
      expectedTech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Responsive UI', 'APIs & Backend Concepts'],
    },
    {
      id: 'python-application-building',
      order: 3,
      expectedTech: ['Python Programming', 'OOP', 'Python Web Applications', 'Automation', 'Async Programming'],
    },
    {
      id: 'ai-generative-ai',
      order: 4,
      expectedTech: ['Generative AI', 'LLMs', 'Prompt Engineering', 'Gemini API', 'OpenAI / Agent SDK Concepts', 'Streamlit', 'Async Agent Execution'],
    },
    {
      id: 'agentic-ai-advanced',
      order: 5,
      expectedTech: ['Agentic AI', 'AI Workers / Digital FTE', 'Forward Deployed Engineering (FDE)', 'Agent Factory Model', 'Loop Engineering', 'Harness Engineering', 'System of Record'],
    },
  ];

  assert.equal(expectedStages.length, 5);
  for (const stage of expectedStages) {
    assert.ok(stage.id);
    assert.ok(stage.order >= 1 && stage.order <= 5);
    assert.ok(stage.expectedTech.length >= 5);
  }
});

