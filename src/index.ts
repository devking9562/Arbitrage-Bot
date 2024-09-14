import { CronJob } from "cron"
import dotenv from "dotenv"
import { ASX, Native, Type } from "./package/currency"
import { DataFetcher, LiquidityProviders, Router } from "./package/router"
import { ChainId } from "./package/chain"
import { createPublicClient, createWalletClient, http, parseEther } from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { coreDao } from "./package/viem"
import { ROUTE_PROCESSOR_3_ADDRESS } from "./package/route-processor"
import { RouteStatus } from "./package/tines"
import { PoolCode } from "./package/router/pools/PoolCode"
import { routeProcessor3Abi } from "./package/abi"

dotenv.config()

const account = privateKeyToAccount(
  (process.env.PRIVATE_KEY ?? "") as `0x${string}`
)

const publicClient = createPublicClient({
  chain: coreDao,
  transport: http("https://rpc-core.icecreamswap.com"),
})

const walletClient = createWalletClient({
  chain: coreDao,
  transport: http("https://rpc-core.icecreamswap.com"), 
  account,
})

const profitMargin = 25

let dataFetcher = new DataFetcher(ChainId.CORE, publicClient)

let poolCodesMap: Map<string, PoolCode>

const initialAmount = parseEther("10")

const init = async () => {
  job.start()
}

const getDEXBestRouteIn = (
  chain: ChainId,
  from: Type,
  to: Type,
  amount: bigint,
  poolCodesMap: Map<string, PoolCode>,
  providers?: LiquidityProviders[]
) => {
  const bestRoute = Router.findBestRoute(
    poolCodesMap,
    chain,
    from,
    amount,
    to,
    30000000000,
    100,
    providers
  )

  return {
    route: {
      status: bestRoute?.status,
      fromToken: from,
      toToken: to,
      primaryPrice: bestRoute?.primaryPrice,
      swapPrice: bestRoute?.swapPrice,
      amountIn: bestRoute?.amountIn,
      amountInBN: bestRoute?.amountInBI.toString(),
      amountOut: bestRoute?.amountOut,
      amountOutBN: bestRoute?.amountOutBI.toString(),
      priceImpact: bestRoute?.priceImpact,
      totalAmountOut: bestRoute?.totalAmountOut,
      totalAmountOutBN: bestRoute?.totalAmountOutBI.toString(),
      gasSpent: bestRoute?.gasSpent,
      legs: bestRoute?.legs,
    },
    args: Router.routeProcessor2Params(
      poolCodesMap,
      bestRoute,
      from,
      to,
      account.address,
      ROUTE_PROCESSOR_3_ADDRESS[chain]
    ),
  }
}

const swap = async (sellRoute: any, provider: LiquidityProviders) => {
  try {
    const buyRoute = getDEXBestRouteIn(
      ChainId.CORE,
      Native.onChain(ChainId.CORE),
      ASX[ChainId.CORE],
      BigInt(sellRoute.route.amountOutBN),
      poolCodesMap,
      [provider]
    )

    const outputAmount = BigInt(buyRoute.route.amountOutBN)

    console.log(outputAmount)

    if (outputAmount > (initialAmount * BigInt(profitMargin)) / BigInt(10000)) {
      const { request: sellRequest, result: sellResult } =
        await publicClient.simulateContract({
          account,
          abi: routeProcessor3Abi,
          address: ROUTE_PROCESSOR_3_ADDRESS[ChainId.CORE],
          functionName: "processRoute",
          args: [
            sellRoute.args.tokenIn,
            sellRoute.args.amountIn,
            sellRoute.args.tokenOut,
            sellRoute.args.amountOutMin,
            sellRoute.args.to,
            sellRoute.args.routeCode,
          ],
          value: sellRoute?.args?.value,
        })
      const { request: buyRequest, result: buyResult } =
        await publicClient.simulateContract({
          account,
          abi: routeProcessor3Abi,
          address: ROUTE_PROCESSOR_3_ADDRESS[ChainId.CORE],
          functionName: "processRoute",
          args: [
            buyRoute.args.tokenIn,
            buyRoute.args.amountIn,
            buyRoute.args.tokenOut,
            buyRoute.args.amountOutMin,
            buyRoute.args.to,
            buyRoute.args.routeCode,
          ],
          value: buyRoute?.args?.value,
        })
      console.log(sellResult, buyResult)
      if (buyResult > (initialAmount * BigInt(profitMargin)) / BigInt(10000)) {
        const sellHash = await walletClient.writeContract(sellRequest)
        const buyHash = await walletClient.writeContract(buyRequest)

        const [sellTx, buyTx] = await Promise.all([
          publicClient.waitForTransactionReceipt({ hash: sellHash }),
          publicClient.waitForTransactionReceipt({ hash: buyHash }),
        ])

        console.log(`${
          provider === LiquidityProviders.IcecreamSwapV3 ? "Glyph" : "Icecream"
        }:${sellHash}
${
  provider === LiquidityProviders.IcecreamSwapV3 ? "Icecream" : "Glyph"
}:${buyHash}`)

      }
    }
  } catch (err) {
    console.log(err)
  }
}

const job = new CronJob("*/10 * * * * *", async () => {
  try {
    dataFetcher.startDataFetching()
    await dataFetcher.fetchPoolsForToken(
      ASX[ChainId.CORE],
      Native.onChain(ChainId.CORE)
    )

    poolCodesMap = dataFetcher.getCurrentPoolCodeMap(
      ASX[ChainId.CORE],
      Native.onChain(ChainId.CORE)
    )

    const bestRoute1 = getDEXBestRouteIn(
      ChainId.CORE,
      ASX[ChainId.CORE],
      Native.onChain(ChainId.CORE),
      initialAmount,
      poolCodesMap,
      [LiquidityProviders.IcecreamSwapV3]
    )

    const bestRoute2 = getDEXBestRouteIn(
      ChainId.CORE,
      ASX[ChainId.CORE],
      Native.onChain(ChainId.CORE),
      initialAmount,
      poolCodesMap,
      [LiquidityProviders.GlyphSwap]
    )

    if (
      bestRoute1.route.status === RouteStatus.NoWay ||
      bestRoute2.route.status === RouteStatus.NoWay
    ) {
      return
    }

    const priceImpact =
      (bestRoute1.route.swapPrice ?? 0) / (bestRoute2.route.swapPrice ?? 0) - 1
    if (Math.abs(priceImpact) <= 0.001) return


})

init()
