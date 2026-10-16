const mxn = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

/** Formatea un monto entero en pesos: 10000 → "$10,000". */
export function formatMXN(amount: number): string {
  return mxn.format(amount);
}
