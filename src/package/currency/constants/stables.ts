import { ChainId } from "../../chain/index.js"
import { USDT } from "./tokens.js"

export const STABLES = {
  [ChainId.CORE]: [USDT[ChainId.CORE]],
} as const
