import { ChainId } from "../../chain"
import { PublicClient } from "viem"

import { LiquidityProviders } from "./LiquidityProvider"
import { UniswapV3BaseProvider } from "./UniswapV3Base"

export class IcecreamSwapV3Provider extends UniswapV3BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.CORE]: "0xa8a3AAD4f592b7f30d6514ee9A863A4cEFF6531D",
    } as const
    const initCodeHash = {
      [ChainId.CORE]:
        "0x0c6b99bf88dc3398a8573e3192de0eb19c858afd9ac36e33030e16c4f569e598",
    } as const

    const tickLens = {
      [ChainId.CORE]: "0x642052b3aE5C787449987b5A2C194464fF244Efa",
    } as const

    const deployer = {
      [ChainId.CORE]: "0xf9f83b79ca3a623da98ad431a52aa42ed0f3d5ef",
    } as const
    super(chainId, web3Client, factory, initCodeHash, tickLens, deployer)
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.IcecreamSwapV3
  }
  getPoolProviderName(): string {
    return "IcecreamSwapV3"
  }
}
