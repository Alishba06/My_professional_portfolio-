import test from 'node:test';
import assert from 'node:assert/strict';

function validateContactSubmission(body) {
  const name = body?.name?.trim();
  const email = body?.email?.trim();
  const message = body?.message?.trim();

  if (!name || name.length < 2 || name.length > 100) {
    return { valid: false, error: 'Name must be between 2 and 100 characters.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email) || email.length > 254) {
    return { valid: false, error: 'A valid email address is required.' };
  }

  if (!message || message.length < 10 || message.length > 5000) {
    return {
      valid: false,
      error: 'Transmission message must be between 10 and 5000 characters.',
    };
  }

  return { valid: true };
}

test('Contact Form Validation: Valid Submission', () => {
  const valid = {
    name: 'Dr. Jane Smith',
    email: 'jane.smith@enterprise.ai',
    message: 'We are seeking an autonomous agent specialist for our healthcare workflow.',
  };

  const result = validateContactSubmission(valid);
  assert.equal(result.valid, true);
});

test('Contact Form Validation: Invalid Email Rejection', () => {
  const invalid = {
    name: 'Dr. Jane Smith',
    email: 'not-an-email',
    message: 'Valid message length requirement met here.',
  };

  const result = validateContactSubmission(invalid);
  assert.equal(result.valid, false);
  assert.ok(result.error.includes('valid email'));
});

test('Contact Form Validation: Too Short Message Rejection', () => {
  const invalid = {
    name: 'Dr. Jane Smith',
    email: 'jane@enterprise.ai',
    message: 'Short',
  };

  const result = validateContactSubmission(invalid);
  assert.equal(result.valid, false);
  assert.ok(result.error.includes('between 10 and 5000 characters'));
});
