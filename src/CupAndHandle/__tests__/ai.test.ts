import { config as DEFAULT_CONFIG } from "../config";
import { cupAndHandleAiAdapter } from "../adapters/ai";

describe("CupAndHandle AI adapter", () => {
  it("copies pattern context into the AI payload and prompt", () => {
    const context = {
      patternKind: "cup_and_handle",
      signalDirection: "LONG",
      cupDepthAtr: 3.2,
      handleDepthRatio: 0.3,
    };
    const signal = {
      additionalIndicators: { cupAndHandleContext: context },
    } as any;
    const payload = cupAndHandleAiAdapter.buildPayload?.({
      signal,
      basePayload: {
        signal: {} as any,
        figures: {},
        indicators: {},
        additionalIndicators: { baseContext: {} },
      },
    });

    expect((payload?.additionalIndicators as any).cupAndHandleContext).toEqual(
      context,
    );
    expect(
      cupAndHandleAiAdapter.buildHumanPromptAddon?.({
        signal,
        payload: payload as any,
      }),
    ).toContain("handleDepthRatio=0.3");
  });

  it("maps runtime AI settings from strategy config", () => {
    expect(
      cupAndHandleAiAdapter.mapEntryRuntimeFromConfig?.({
        ...DEFAULT_CONFIG,
        AI_ENABLED: true,
        AI_MODE: "llm",
        MIN_AI_QUALITY: 3,
      } as any),
    ).toEqual({ enabled: true, mode: "llm", minQuality: 3 });
  });

  it.each(["LONG", "SHORT"] as const)(
    "approves %s at the exact causal-cup-progress own-gate boundary",
    (direction) => {
      const analysis = cupAndHandleAiAdapter.postProcessLocalAnalysis?.({
        signal: {
          direction,
          prices: { takeProfitPrice: 120, stopLossPrice: 90 },
        } as any,
        payload: {
          additionalIndicators: {
            baseContext: {
              structure: {
                liquidityZones: {
                  nearestResistance: { hitCount: 19 },
                },
              },
              relative: { targetVsEth: { betaToEth20: 0 } },
            },
          },
        } as any,
        analysis: { quality: 1 },
      });

      expect(analysis).toMatchObject({
        approved: true,
        direction,
        quality: 4,
        gateDecision: "approved",
      });
      expect(analysis?.qualityReason).toContain(
        "rule=cup_and_handle_causal_cup_progress_own_gate_2_2026_08_25",
      );
    },
  );

  it.each([
    [18, 0],
    [19, -0.000_001],
    [undefined, 0],
    [19, undefined],
  ])(
    "rejects outside the own-gate pocket (hitCount=%s, betaToEth20=%s)",
    (hitCount, betaToEth20) => {
      const analysis = cupAndHandleAiAdapter.postProcessLocalAnalysis?.({
        signal: {
          direction: "SHORT",
          prices: { takeProfitPrice: 80, stopLossPrice: 110 },
        } as any,
        payload: {
          additionalIndicators: {
            baseContext: {
              structure: {
                liquidityZones: {
                  nearestResistance: { hitCount },
                },
              },
              relative: { targetVsEth: { betaToEth20 } },
            },
          },
        } as any,
        analysis: { quality: 5, direction: "SHORT" },
      });

      expect(analysis).toMatchObject({
        approved: false,
        direction: null,
        quality: 3,
        gateDecision: "rejected",
      });
      expect((analysis as any)?.rejectReason).toContain(
        "rule=cup_and_handle_causal_cup_progress_own_gate_2_2026_08_25",
      );
    },
  );
});
