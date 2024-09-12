import { ChainId } from "../../chain/index.js"
import { Native } from "../Native.js"

export const defaultQuoteCurrency = {
  [ChainId.CORE]: Native.onChain(ChainId.CORE),
} as const
