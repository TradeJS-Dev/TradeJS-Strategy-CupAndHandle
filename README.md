# @tradejs/strategy-cup-and-handle

TradeJS strategy plugin providing `CupAndHandle`.

## Strategy overview

`CupAndHandle` detects bullish cup-and-handle and bearish inverse formations
from replayable pivots. It validates rim similarity, cup depth and symmetry,
handle depth, and pattern age, then enters on breakout, close acceptance, or
retest with geometry-derived stops and targets.

The optional `CUPHANDLE_REQUIRE_PATH_QUALITY` guard requires both cup legs to
progress on more than half of their comparable closes. In deterministic
`AI_MODE: "gate"`, the strategy-local gate approves both LONG and SHORT signals
only when the nearest resistance has at least 19 hits and the target's
20-period beta to ETH is non-negative. Missing gate features fail closed.

## Logic at a glance

![CupAndHandle strategy logic](https://raw.githubusercontent.com/TradeJS-Dev/TradeJS-Strategy-CupAndHandle/main/docs/strategy-logic.svg)

## Signal on an example chart

The chart labels the two rims, rounded cup, bounded handle, and the rim breakout that turns the completed formation into a LONG signal.

![CupAndHandle signal on an illustrative ticker chart](https://raw.githubusercontent.com/TradeJS-Dev/TradeJS-Strategy-CupAndHandle/main/docs/signal-example.svg)

The illustration is schematic, not market data. Exact thresholds, confirmation
rules, and risk parameters come from the active TradeJS strategy config.

## Install

```bash
yarn add @tradejs/strategy-cup-and-handle
```

Register the package in `tradejs.config.ts`:

```ts
import { defineConfig } from "@tradejs/core/config";

export default defineConfig({
  strategies: ["@tradejs/strategy-cup-and-handle"],
});
```

The package exports `strategyEntries` for the TradeJS plugin loader together
with its strategy definitions, manifests, default configs, and public AI/ML
adapters. Strategy implementation changes are released from this repository,
independently of the TradeJS engine.

## Development

```bash
yarn install --immutable
yarn checks
```

Publishing is beta-first and delegated to the pinned
`TradeJS-Workflows@v1` reusable workflow. A relevant push publishes a unique
prerelease and moves the npm `beta` tag only after the repository checks pass
and the published tarball imports successfully in a clean npm consumer. The
current verified beta is promoted to one stable `latest`
release by the weekly automation; production never consumes prereleases.

Keywords: ai, claude, codex.

## Runtime host contract

All `@tradejs/*` runtime packages are peer dependencies. The consuming TradeJS Project owns their exact installed versions and package manifest, so this package never loads a hidden nested engine, types package, indicator package, or Strategy Kit. Repository builds use matching dev dependencies only.
