#!/usr/bin/env node
const ok = (b) => (b ? '✅' : '❌'); const warn = '⚠️ ';
const env = process.env;
const nodeMajor = Number(process.versions.node.split('.')[0]);
const nodeOk = nodeMajor >= 18;
const basisOk = (env.LAWFUL_BASIS || '').trim().length >= 8;
const providerOk = ['anthropic','openai','openrouter','local'].includes(env.PROVIDER || 'local');
const sp = env.SEARCH_PROVIDER;
const searchKeyed = sp === 'brave' ? !!env.BRAVE_API_KEY
  : sp === 'tavily' ? !!env.TAVILY_API_KEY
  : sp === 'google_cse' ? (!!env.GOOGLE_CSE_KEY && !!env.GOOGLE_CSE_CX)
  : false;
console.log(`${ok(nodeOk)} Node >= 18 (${process.versions.node})`);
console.log(`${ok(providerOk)} PROVIDER known`);
console.log(`${ok(basisOk)} LAWFUL_BASIS asserted`);
console.log(`${ok(!!sp)} SEARCH_PROVIDER selected${sp ? ` (${sp})` : ''}`);
console.log(`${searchKeyed ? '✅' : warn} search provider key(s) present`);
console.log(`\nScope: public professional sources only; personal-life/PII refused; contact-PII scrubbed on store.`);
process.exit(nodeOk && providerOk && basisOk ? 0 : 1);
