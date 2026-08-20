import { defineStrategyPlugin } from "@tradejs/core/config";
import type { ValidatedStrategyRegistryEntry } from "@tradejs/strategy-kit/config";
import type { StrategyConfig } from "@tradejs/types";
import { config as cupAndHandleDefaultConfig } from "./CupAndHandle/config";
import { CupAndHandleStrategyDefinition } from "./CupAndHandle/strategy";

export const strategyEntries: ValidatedStrategyRegistryEntry<any>[] = [
  CupAndHandleStrategyDefinition,
];

const defaultConfigs: Record<string, StrategyConfig> = {
  CupAndHandle: cupAndHandleDefaultConfig,
};

export const getBuiltInStrategyDefaultConfig = (
  strategyName: string,
): StrategyConfig | undefined => defaultConfigs[strategyName];

export { CupAndHandleStrategyDefinition } from "./CupAndHandle/strategy";
export { cupAndHandleDefaultConfig };
export { cupAndHandleManifest } from "./CupAndHandle/manifest";
export { cupAndHandleAiAdapter } from "./CupAndHandle/adapters/ai";

export default defineStrategyPlugin({ strategyEntries });
