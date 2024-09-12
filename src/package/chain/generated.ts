export default [
  {
    chainId: 1116,
    explorers: [
      {
        name: "CORE",
        url: "https://scan.coredao.org",
        standard: "EIP3091",
      },
    ],
    nativeCurrency: {
      name: "Core",
      symbol: "CORE",
      decimals: 18,
    },
    name: "Core",
    shortName: "core",
  },
] as const
