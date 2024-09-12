import { ChainId } from "../chain"
import { http, type PublicClientConfig } from "viem"
import { coreDao } from "viem/chains"

export { coreDao }

export const config: Record<ChainId, PublicClientConfig> = {
  [ChainId.CORE]: {
    chain: coreDao,
    transport: http(`https://rpc.ankr.com/core`),
  },
} as const
