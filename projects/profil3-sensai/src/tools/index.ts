import { ToolRegistry } from './registry.js';
import { makeWebSearch } from './websearch.js';
import { makeFetchUrl } from './fetchurl.js';
import type { Subject } from '../mission/index.js';
import type { Config } from '../config/index.js';
export function buildRegistry(subject: Subject, cfg: Config) {
  return new ToolRegistry().register(makeWebSearch(subject, cfg)).register(makeFetchUrl(subject, cfg));
}
export { ToolRegistry } from './registry.js';
