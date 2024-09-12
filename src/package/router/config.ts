import { ChainId } from "../chain"
import {
  Token,
  USDT,
  WBTC,
  WETH9,
  WNATIVE,
  ASX,
  stCORE,
  WCORE_GLYPH,
  WCORE_OLD,
} from "../currency"

export const BASES_TO_CHECK_TRADES_AGAINST: {
  readonly [chainId: number]: Token[]
} = {
  [ChainId.CORE]: [
    WNATIVE[ChainId.CORE],
    WETH9[ChainId.CORE],
    ASX[ChainId.CORE],
    stCORE[ChainId.CORE],
    USDT[ChainId.CORE],
    WCORE_OLD[ChainId.CORE],
    WCORE_GLYPH[ChainId.CORE],
    WBTC[ChainId.CORE],
  ],
}
