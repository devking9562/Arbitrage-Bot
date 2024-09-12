import { ChainId } from "../../chain"
// import { PrismaClient } from "@prisma/client";
import { PublicClient } from "viem"

import { LiquidityProviders } from "./LiquidityProvider"
import { UniswapV2BaseProvider } from "./UniswapV2Base"

export class GlyphSwapProvider extends UniswapV2BaseProvider {
  constructor(
    chainId: ChainId,
    web3Client: PublicClient
    // databaseClient?: PrismaClient
  ) {
    const factory = {
      [ChainId.CORE]: "0x3e723c7b6188e8ef638db9685af45c7cb66f77b9",
    } as const

    const initCodeHash = {
      [ChainId.CORE]:
        "0xee028118a054757b5daded92bc998b195fc653d33f3214aaabeec98d7599f6b8",
    } as const

    super(chainId, web3Client, factory, initCodeHash)
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.GlyphSwap
  }
  getPoolProviderName(): string {
    return "GlyphSwap"
  }
}
