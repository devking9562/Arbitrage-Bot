import { ChainId } from "../../chain/index.js"

import { type Type } from "../Type.js"
import {
  ASX,
  USDT,
  WBTC,
  WCORE_OLD,
  WCORE_GLYPH,
  WETH9,
  WNATIVE,
  stCORE,
} from "./tokens.js"

const CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY = {
  [ChainId.CORE]: {
    WCORE: WNATIVE[ChainId.CORE],
    ETH: WETH9[ChainId.CORE],
    WETH: WETH9[ChainId.CORE],
    WBTC: WBTC[ChainId.CORE],
    USDT: USDT[ChainId.CORE],
    ASX: ASX[ChainId.CORE],
    stCORE: stCORE[ChainId.CORE],
    WCORE_OLD: WCORE_OLD[ChainId.CORE],
    WCORE_GLYPH: WCORE_GLYPH[ChainId.CORE],
  },
} as const

export type ShortCurrencyNameChainId =
  keyof typeof CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY

export type ShortCurrencyName =
  keyof (typeof CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY)[ShortCurrencyNameChainId]

export const isShortCurrencyNameSupported = (
  chainId: ChainId
): chainId is ShortCurrencyNameChainId =>
  chainId in CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY

export const isShortCurrencyName = (
  chainId: ChainId,
  shortCurrencyName: string
): shortCurrencyName is ShortCurrencyName => {
  return (
    isShortCurrencyNameSupported(chainId) &&
    shortCurrencyName in CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY[chainId]
  )
}

export const currencyFromShortCurrencyName = (
  chainId: ChainId,
  shortCurrencyName: ShortCurrencyName
): Type => {
  if (!isShortCurrencyNameSupported(chainId))
    throw new Error(
      `Unsupported chain id ${chainId} for short currency name ${shortCurrencyName}`
    )
  if (!(shortCurrencyName in CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY[chainId]))
    throw new Error(
      `Unsupported short currency name ${shortCurrencyName} on chain ${chainId}`
    )
  return CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY[chainId][shortCurrencyName]
}
