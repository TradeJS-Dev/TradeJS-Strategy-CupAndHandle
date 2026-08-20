# @tradejs/strategy-cup-and-handle

TradeJS strategy plugin providing `CupAndHandle`.

## Strategy overview

`CupAndHandle` detects bullish cup-and-handle and bearish inverse formations
from replayable pivots. It validates rim similarity, cup depth and symmetry,
handle depth, and pattern age, then enters on breakout, close acceptance, or
retest with geometry-derived stops and targets.

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
prerelease and moves the npm `beta` tag only after the production-like Project
image passes. The current verified beta is promoted to one stable `latest`
release by the weekly automation; production never consumes prereleases.

Keywords: ai, claude, codex.
