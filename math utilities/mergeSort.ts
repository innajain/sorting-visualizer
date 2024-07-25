export function mergeSortStates(arr: number[]): number[][] {
  const states: number[][] = []
  const copyArr = [...arr] // Create a copy of the array to avoid mutating the original
  mergeSortHelper(copyArr, 0, copyArr.length - 1, states)
  return states
}

function mergeSortHelper(
  arr: number[],
  left: number,
  right: number,
  states: number[][]
): void {
  if (left < right) {
    const mid = Math.floor((left + right) / 2)

    // Recursively sort the two halves
    mergeSortHelper(arr, left, mid, states)
    mergeSortHelper(arr, mid + 1, right, states)

    // Merge the sorted halves
    merge(arr, left, mid, right, states)
  }
}

function merge(
  arr: number[],
  left: number,
  mid: number,
  right: number,
  states: number[][]
): void {
  const n1 = mid - left + 1
  const n2 = right - mid

  // Create temporary arrays
  const L = arr.slice(left, left + n1)
  const R = arr.slice(mid + 1, mid + 1 + n2)

  let i = 0
  let j = 0
  let k = left

  // Merge the temporary arrays back into arr[left..right]
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i]
      i++
    } else {
      arr[k] = R[j]
      j++
    }
    k++
  }

  // Copy the remaining elements of L[], if any
  while (i < n1) {
    arr[k] = L[i]
    i++
    k++
  }

  // Copy the remaining elements of R[], if any
  while (j < n2) {
    arr[k] = R[j]
    j++
    k++
  }

  // Record the state of the array after merging
  states.push([...arr])
}
