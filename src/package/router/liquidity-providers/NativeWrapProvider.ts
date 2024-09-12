import { BridgeUnlimited, RToken } from "../../tines"
/* eslint-disable @typescript-eslint/no-exxmpty-function */
import type { ChainId } from "../../chain"
import {
  Native,
  WCORE_GLYPH,
  WCORE_GLYPH_ADDRESS,
  WCORE_OLD,
  WCORE_OLD_ADDRESS,
  WNATIVE,
  WNATIVE_ADDRESS,
} from "../../currency"
import { PublicClient } from "viem"

import { NativeWrapBridgePoolCode } from "../pools/NativeWrapBridge"
import type { PoolCode } from "../pools/PoolCode"
import { LiquidityProvider, LiquidityProviders } from "./LiquidityProvider"

export class NativeWrapProvider extends LiquidityProvider {
  poolCodes: PoolCode[]

  constructor(chainId: ChainId, client: PublicClient) {
    super(chainId, client)
    const native = Native.onChain(chainId)
    const nativeRToken: RToken = {
      address: "",
      name: native.name,
      symbol: native.symbol,
      chainId: chainId,
      decimals: 18,
    }
    const bridge = new BridgeUnlimited(
      WNATIVE_ADDRESS[chainId],
      nativeRToken,
      WNATIVE[chainId] as RToken,
      0,
      50_000
    )
    const bridge1 = new BridgeUnlimited(
      WCORE_OLD_ADDRESS[chainId],
      nativeRToken,
      WCORE_OLD[chainId] as RToken,
      0,
      50_000
    )
    const bridge2 = new BridgeUnlimited(
      WCORE_GLYPH_ADDRESS[chainId],
      nativeRToken,
      WCORE_GLYPH[chainId] as RToken,
      0,
      50_000
    )
    this.poolCodes = [
      new NativeWrapBridgePoolCode(bridge, LiquidityProviders.NativeWrap),
      new NativeWrapBridgePoolCode(bridge1, LiquidityProviders.NativeWrap),
      new NativeWrapBridgePoolCode(bridge2, LiquidityProviders.NativeWrap),
    ]
    this.lastUpdateBlock = -1
  }

  getType(): LiquidityProviders {
    return LiquidityProviders.NativeWrap
  }

  getPoolProviderName(): string {
    return "NativeWrap"
  }

  startFetchPoolsData() {}
  async fetchPoolsForToken(): Promise<void> {}
  getCurrentPoolList(): PoolCode[] {
    return this.poolCodes
  }
  stopFetchPoolsData() {}
}
