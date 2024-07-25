export function normalizeList(list: number[]) {
  const max = Math.max(...list)
  const min = Math.min(...list)
  return list.map((item) => (item - min) / (max - min))
}
