export function bubbleSortStates(arr: number[]): number[][] {
  const states: number[][] = []
  const copyArr = [...arr] // Create a copy of the array to avoid mutating the original
  bubbleSortHelper(copyArr, states)
  return states
}

function bubbleSortHelper(arr: number[], states: number[][]): void {
  const n = arr.length
  let swapped: boolean

  for (let i = 0; i < n - 1; i++) {
    swapped = false
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        swapped = true
      }
    }
    // Record the state of the array after each pass
    states.push([...arr])
    if (!swapped) {
      // If no elements were swapped, the array is already sorted
      break
    }
  }
}
