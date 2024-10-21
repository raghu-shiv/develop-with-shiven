export const currencyData: {
  [key: string]: { symbol: string; converter: number };
} = {
  US: { symbol: "$", converter: 1 }, // USD
  EU: { symbol: "€", converter: 1 }, // EUR
  CN: { symbol: "¥", converter: 7.006 }, // CNY
  JP: { symbol: "¥", converter: 110.01 }, // JPY
  GB: { symbol: "£", converter: 0.799 }, // GBP
  IN: { symbol: "₹", converter: 89.99 }, // INR
  AU: { symbol: "A$", converter: 1.5 }, // AUD
  CA: { symbol: "C$", converter: 1.4 }, // CAD
  CH: { symbol: "CHF", converter: 0.899 }, // CHF
  HK: { symbol: "HK$", converter: 7.8 }, // HKD
  SG: { symbol: "S$", converter: 1.3003 }, // SGD
  KR: { symbol: "₩", converter: 1201.101 }, // KRW
  BR: { symbol: "R$", converter: 5.5045 }, // BRL
  MX: { symbol: "MX$", converter: 20.019 }, // MXN
  RU: { symbol: "₽", converter: 100.099 }, // RUB
  SA: { symbol: "﷼", converter: 3.8028 }, // SAR
  ZA: { symbol: "R", converter: 17.416 }, // ZAR
  // Add more countries and their respective currencies and amounts as needed
};
