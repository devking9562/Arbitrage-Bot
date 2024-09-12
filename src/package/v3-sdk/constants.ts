export enum FeeAmount {
  /** 0.01% */
  LOWEST = 1000,
  /** 0.1% */
  LOW = 3000,
  /** 0.3% */
  MEDIUM = 10000,
  /** 1% */
  HIGH = 50000,
}

/**
 * The default factory tick spacings by fee amount.
 */
export const TICK_SPACINGS: { [_amount in FeeAmount]: number } = {
  [FeeAmount.LOWEST]: 1,
  [FeeAmount.LOW]: 10,
  [FeeAmount.MEDIUM]: 60,
  [FeeAmount.HIGH]: 200,
}
