import { ChainId } from "../../chain/index.js"

import { Token } from "../Token.js"
import { addressMapToTokenMap } from "../functions/address-map-to-token-map.js"

import {
  ASX_ADDRESS,
  USDT_ADDRESS,
  WBTC_ADDRESS,
  WETH9_ADDRESS,
  WNATIVE_ADDRESS,
  WCORE_GLYPH_ADDRESS,
  WCORE_OLD_ADDRESS,
  stCORE_ADDRESS,
} from "./token-addresses.js"

export const ASX = addressMapToTokenMap(
  {
    decimals: 18,
    symbol: "ASX",
    name: "ASX",
  },
  ASX_ADDRESS
) as Record<keyof typeof ASX_ADDRESS, Token>

export const WBTC = addressMapToTokenMap(
  {
    decimals: 8,
    symbol: "WBTC",
    name: "Wrapped BTC",
  },
  WBTC_ADDRESS
) as Record<keyof typeof WBTC_ADDRESS, Token>

export const WETH9 = addressMapToTokenMap(
  {
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
  },
  WETH9_ADDRESS
) as Record<keyof typeof WETH9_ADDRESS, Token>

export const WNATIVE = {
  [ChainId.CORE]: new Token({
    chainId: ChainId.CORE,
    address: WNATIVE_ADDRESS[ChainId.CORE],
    decimals: 18,
    symbol: "WCORE",
    name: "Wrapped Core",
  }),
} as const

export const USDT: Record<keyof typeof USDT_ADDRESS, Token> = {
  ...(addressMapToTokenMap(
    {
      decimals: 18,
      symbol: "USDT",
      name: "Tether USD",
    },
    USDT_ADDRESS
  ) as Record<keyof typeof USDT_ADDRESS, Token>),
}

export const stCORE = addressMapToTokenMap(
  {
    decimals: 18,
    symbol: "stCORE",
    name: "stCORE",
  },
  stCORE_ADDRESS
) as Record<keyof typeof stCORE_ADDRESS, Token>

export const WCORE_OLD = addressMapToTokenMap(
  {
    decimals: 18,
    symbol: "WCORE",
    name: "WCORE",
  },
  WCORE_OLD_ADDRESS
) as Record<keyof typeof WCORE_OLD_ADDRESS, Token>

export const WCORE_GLYPH = addressMapToTokenMap(
  {
    decimals: 18,
    symbol: "WCORE",
    name: "WCORE",
  },
  WCORE_GLYPH_ADDRESS
) as Record<keyof typeof WCORE_GLYPH_ADDRESS, Token>
