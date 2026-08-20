import { createStrategyConfigParser } from "@tradejs/strategy-kit/config";
import type { ValidatedStrategyRegistryEntry } from "@tradejs/strategy-kit/config";
import { config as DEFAULT_CONFIG, CupAndHandleConfig } from "./config";
import { createCupAndHandleCore } from "./core";
import { cupAndHandleManifest } from "./manifest";

export const CupAndHandleStrategyDefinition: ValidatedStrategyRegistryEntry<CupAndHandleConfig> =
  {
    defaults: DEFAULT_CONFIG,
    parseConfig: createStrategyConfigParser({
      strategyName: "CupAndHandle",
      defaults: DEFAULT_CONFIG,
    }),
    createCore: createCupAndHandleCore,
    manifest: cupAndHandleManifest,
  };
