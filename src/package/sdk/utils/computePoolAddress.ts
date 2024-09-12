import { defaultAbiCoder } from "@ethersproject/abi"
import { getCreate2Address } from "@ethersproject/address"
import { keccak256 } from "@ethersproject/solidity"
import { Token } from "../../currency"

import { FeeAmount } from "../constants"

/**
 * Computes a pool address
 * @param factoryAddress The Uniswap V3 factory address
 * @param tokenA The first token of the pair, irrespective of sort order
 * @param tokenB The second token of the pair, irrespective of sort order
 * @param fee The fee tier of the pool
 * @param initCodeHashManualOverride Override the init code hash used to compute the pool address if necessary
 * @returns The pool address
 */
export function computePoolAddress({
  factoryAddress,
  tokenA,
  tokenB,
  fee,
  initCodeHashManualOverride,
}: {
  factoryAddress: string
  tokenA: Token | string
  tokenB: Token | string
  fee: FeeAmount
  initCodeHashManualOverride: string
}): string {
  if (typeof tokenA !== "string" && typeof tokenB !== "string") {
    const [token0, token1] = tokenA.sortsBefore(tokenB)
      ? [tokenA, tokenB]
      : [tokenB, tokenA] // does safety checks
    return getCreate2Address(
      factoryAddress,
      keccak256(
        ["bytes"],
        [
          defaultAbiCoder.encode(
            ["address", "address", "uint24"],
            [token0.address, token1.address, fee]
          ),
        ]
      ),
      initCodeHashManualOverride
    )
  }

  return getCreate2Address(
    factoryAddress,
    keccak256(
      ["bytes"],
      [
        defaultAbiCoder.encode(
          ["address", "address", "uint24"],
          [tokenA, tokenB, fee]
        ),
      ]
    ),
    initCodeHashManualOverride
  )
}
