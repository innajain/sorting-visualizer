'use client'

import SortingComparisons from '@/components/SortingComparisons'
import { lst } from '@/math utilities/data'
import { quicksortStates } from '@/math utilities/quicksort'
import { bubbleSortStates } from '@/math utilities/bubbleSort'
import { mergeSortStates } from '@/math utilities/mergeSort'

export default function Page() {
  // Define the sorting functions and their labels
  const sortingFunctions = [
    { name: 'Quick Sort', func: quicksortStates },
    { name: 'Merge Sort', func: mergeSortStates },
    { name: 'Bubble Sort', func: bubbleSortStates },
  ]

  return (
    <main className='flex flex-col items-center w-full h-full'>
      <SortingComparisons
        list={lst}
        sortFunctions={sortingFunctions}
        interval_={200}
      />
    </main>
  )
}
