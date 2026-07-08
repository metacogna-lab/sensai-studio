/** Provider-agnostic model backbone with a fallback chain. Transport is an
 *  integration point so the harness ships inert. No secrets are logged. */
import type { Config } from '../config/index.js';

export interface Message { role: 'system' | 'user' | 'assistant' | 'tool'; content: string; }
export interface Completion { text: string; usage: { in: number; out: number }; }

export class Backbone {
  constructor(private cfg: Config, private fallbacks: Config[] = []) {}
  async complete(messages: Message[]): Promise<Completion> {
    let lastErr: unknown;
    for (const cfg of [this.cfg, ...this.fallbacks]) {
      try { return await this.call(cfg, messages); } catch (e) { lastErr = e; }
    }
    throw new Error(`all providers failed: ${String(lastErr)}`);
  }
  private async call(cfg: Config, _messages: Message[]): Promise<Completion> {
    throw new Error(`transport not wired for provider "${cfg.provider}". Implement fetch in src/llm/index.ts`);
  }
}
