import { z } from 'zod';
export type RiskTier = 'safe' | 'active';
export interface Tool<I = unknown> {
  name: string; description: string; inputSchema: z.ZodType<I>;
  riskTier: RiskTier; run(input: I): Promise<string>;
}
export class ToolRegistry {
  private tools = new Map<string, Tool<any>>();
  register(t: Tool<any>) { this.tools.set(t.name, t); return this; }
  get(name: string) { return this.tools.get(name); }
  async execute(name: string, input: unknown): Promise<string> {
    const t = this.tools.get(name);
    if (!t) throw new Error(`unknown tool: ${name}`);
    const parsed = t.inputSchema.parse(input);   // validate at the boundary
    return t.run(parsed);
  }
}
