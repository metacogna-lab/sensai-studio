import { test } from 'node:test';
import assert from 'node:assert';
import { checkUrlScope, checkContentScope } from '../src/safety/scope.js';
import { scrubContactPii } from '../src/safety/scrub.js';

const subj = { name: 'X', role: 'VP', seedUrls: ['https://acme.example/team'] } as any;

test('seed host allowed', () => assert.ok(checkUrlScope('https://acme.example/team/x', subj).allowed));
test('professional domain allowed', () => assert.ok(checkUrlScope('https://www.linkedin.com/in/x', subj).allowed));
test('professional page-type path allowed', () => assert.ok(checkUrlScope('https://foo.tld/leadership', subj).allowed));
test('data-broker host denied', () => assert.ok(!checkUrlScope('https://spokeo.com/x', subj).allowed));
test('substring host does NOT false-allow', () => assert.ok(!checkUrlScope('https://randomblog.tld/x', subj).allowed));
test('PII content denied', () => assert.ok(!checkContentScope('X home address family').allowed));
test('professional content allowed', () => assert.ok(checkContentScope('X keynote strategy').allowed));
test('contact PII scrubbed', () => {
  const s = scrubContactPii('mail a@b.com call +1 415 555 1234');
  assert.ok(s.includes('[email redacted]') && s.includes('[phone redacted]'));
});
