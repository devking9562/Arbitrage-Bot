import { ChainId } from "../chain"
import {
  ASX,
  USDT,
  WBTC,
  WCORE_OLD,
  WCORE_GLYPH,
  WETH9,
  WNATIVE,
  stCORE,
} from "../currency"

export const SUGGESTED_TOKEN_BASES = {
  [ChainId.CORE]: [
    WNATIVE[ChainId.CORE],
    WETH9[ChainId.CORE],
    WBTC[ChainId.CORE],
    USDT[ChainId.CORE],
    WCORE_OLD[ChainId.CORE],
    WCORE_GLYPH[ChainId.CORE],
    stCORE[ChainId.CORE],
    ASX[ChainId.CORE],
  ],
}
