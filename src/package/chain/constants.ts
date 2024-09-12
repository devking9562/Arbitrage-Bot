export const ChainId = {
  CORE: 1116,
} as const
export type ChainId = (typeof ChainId)[keyof typeof ChainId]

// export const isChainId = (chainId: number): chainId is ChainId => Object.values(ChainId).includes(chainId as ChainId)

export const ChainKey = {
  [ChainId.CORE]: "core",
} as const
export type ChainKey = (typeof ChainKey)[keyof typeof ChainKey]
