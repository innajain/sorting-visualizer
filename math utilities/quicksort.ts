export function quicksortStates(arr: number[]): number[][] {
  const states: number[][] = []
  quicksortHelper(arr, 0, arr.length - 1, states)
  return states
}

function quicksortHelper(
  arr: number[],
  low: number,
  high: number,
  states: number[][]
): void {
  if (low < high) {
    const pi = partition(arr, low, high)
    states.push([...arr]) // Record the state of the array
    quicksortHelper(arr, low, pi - 1, states)
    quicksortHelper(arr, pi + 1, high, states)
  }
}

function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high]
  let i = low - 1

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }

  ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
  return i + 1
}
