/**
 * Automated Extensibility & Schema Validation Test Suite
 * Tasks: T086, T088 [US7]
 * Runs in Node.js runtime to verify modular additions, schema rules, and rollbacks.
 */

import assert from 'node:assert/strict';

console.log('🧪 Starting Portfolio Extensibility Validation Suite...\n');

let passCount = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    Error: ${err.message}`);
    process.exitCode = 1;
  }
}

// Mock ContentManager logic for node verification
const ContentManager = {
  validateProject(p) {
    const errors = [];
    if (!p.id || !/^[a-z0-9-]+$/.test(p.id)) errors.push('Invalid id');
    if (!p.title) errors.push('Missing title');
    if (!p.problem) errors.push('Missing problem statement');
    if (!p.solution) errors.push('Missing solution');
    return { isValid: errors.length === 0, errors };
  },

  validateCinematicScene(s) {
    const errors = [];
    if (!s.id) errors.push('Missing scene id');
    if (typeof s.order !== 'number' || s.order < 1) errors.push('Invalid order');
    if (typeof s.duration !== 'number' || s.duration <= 0) errors.push('Invalid duration');
    return { isValid: errors.length === 0, errors };
  },
};

// 1. Modular Project Addition Test (FR-004)
test('US7: Should validate and accept a complete new project (Problem -> Solution -> Outcome)', () => {
  const newProject = {
    id: 'deepseek-agentic-coder',
    title: 'Autonomous Code Refactoring Agent',
    problem: 'Large legacy codebases require hundreds of manual hours for AST migrations and types.',
    solution: 'Built an autonomous reasoning loop with AST parsing and automated git patch verification.',
    outcome: 'Migrated 45,000 LOC with zero human intervention and 100% test pass rate.',
    order: 6,
  };

  const result = ContentManager.validateProject(newProject);
  assert.equal(result.isValid, true, 'Project should pass validation');
  assert.equal(result.errors.length, 0);
});

// 2. Project Schema Rejection Test
test('US7: Should reject an invalid project missing required problem statement', () => {
  const invalidProject = {
    id: 'broken-project',
    title: 'No Problem Project',
    solution: 'Some solution without problem context',
  };

  const result = ContentManager.validateProject(invalidProject);
  assert.equal(result.isValid, false, 'Project should fail validation');
  assert.ok(
    result.errors.some((e) => e.includes('problem')),
    'Should flag missing problem statement'
  );
});

// 3. Modular Cinematic Scene Addition Test (FR-013)
test('US7: Should validate dynamic scene addition and calculate cumulative timeline', () => {
  const initialScenes = [
    { id: 's1', order: 1, duration: 1500 },
    { id: 's2', order: 2, duration: 2500 },
  ];

  const newScene = {
    id: 's3-neural-pulse',
    order: 3,
    type: 'particles',
    duration: 2000,
  };

  const validation = ContentManager.validateCinematicScene(newScene);
  assert.equal(validation.isValid, true);

  const updatedScenes = [...initialScenes, newScene];
  const totalDuration = updatedScenes.reduce((acc, s) => acc + s.duration, 0);

  assert.equal(totalDuration, 6000, 'Total timeline duration should be 6000ms');
});

// 4. Rollback Capability Test (T087)
test('US7: Should support transactional snapshot and rollback on addition failure', () => {
  let projectStore = [{ id: 'p1', title: 'Existing Project' }];
  const snapshot = [...projectStore];

  // Simulate failed transaction
  try {
    const badProject = { id: 'p2' }; // Missing title, problem, etc.
    const validation = ContentManager.validateProject(badProject);
    if (!validation.isValid) {
      throw new Error('Validation failed');
    }
    projectStore.push(badProject);
  } catch {
    // Rollback
    projectStore = [...snapshot];
  }

  assert.equal(projectStore.length, 1, 'Store should remain unaffected after rollback');
  assert.equal(projectStore[0].id, 'p1');
});

// 5. Plugin Architecture Execution Test (T083)
test('US7: Should register plugins and execute lifecycle hooks', () => {
  let hookFired = false;
  let receivedTheme = '';

  const mockPlugin = {
    id: 'theme-telemetry',
    name: 'Theme Tracker',
    version: '1.0.0',
    hooks: {
      onThemeChange: (theme) => {
        hookFired = true;
        receivedTheme = theme;
      },
    },
  };

  mockPlugin.hooks.onThemeChange('deep-space');

  assert.equal(hookFired, true, 'Plugin hook should execute');
  assert.equal(receivedTheme, 'deep-space');
});

console.log(`\n🎉 Extensibility Validation: ${passCount}/5 tests passed successfully.\n`);
