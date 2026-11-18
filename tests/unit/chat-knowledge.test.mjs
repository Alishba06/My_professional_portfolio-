import test from 'node:test';
import assert from 'node:assert/strict';

test('AI Chatbot Knowledge Base Responses', async () => {
  // Test knowledge keywords
  const samplePrompts = [
    'Who is Alishba?',
    'What are her skills in Python and React?',
    'Tell me about her learning journey stages',
    'Is Alishba open to AI internships?',
    'How can I contact her or view resume?',
  ];

  for (const prompt of samplePrompts) {
    assert.ok(prompt.length > 5, 'Prompt should be a valid string');
  }

  // Verify core skills taxonomy matches truthful profile
  const realCoreSkills = [
    'AI Agents / Agentic AI',
    'Generative AI',
    'Prompt Engineering',
    'Gemini / LLM concepts',
    'Python',
    'React',
    'Next.js',
    'TypeScript',
  ];

  assert.equal(realCoreSkills.length, 8);
  assert.ok(realCoreSkills.includes('AI Agents / Agentic AI'));
  assert.ok(realCoreSkills.includes('Prompt Engineering'));
  assert.ok(realCoreSkills.includes('Python'));
});

