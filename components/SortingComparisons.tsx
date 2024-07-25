'use client'

import { useState, useCallback, useEffect } from 'react'
import SortingVisualizer from '@/components/SortingVisualizer'
import SortingControls from '@/components/SortingControls'
import { lst } from '@/math utilities/data'
import { quicksortStates } from '@/math utilities/quicksort'
import { bubbleSortStates } from '@/math utilities/bubbleSort'
import { mergeSortStates } from '@/math utilities/mergeSort'

type SortingFunction = (arr: number[]) => number[][]

export default function SortingComparisons({
  list,
  sortFunctions,
  interval_,
}: {
  list: number[]
  sortFunctions: { name: string; func: SortingFunction }[]
  interval_: number
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [start, setStart] = useState(false)
  const [currentStateIndices, setCurrentStateIndices] = useState(
    sortFunctions.map(() => 0)
  )
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  const sortedStates = sortFunctions.map(({ func }) => func(list.slice()))
  const totalStates = sortedStates.map((states) => states.length)

  useEffect(() => {
    setAudio(
      new Audio(
        '/swoosh-sound-effect-for-fight-scenes-or-transitions-2-149890.mp3'
      )
    )
  }, [])

  const handlePlayPauseRestart = useCallback(() => {
    if (isPlaying && start) {
      // Restart simulation
      setCurrentStateIndices(new Array(sortFunctions.length).fill(0))
      setStart(true)
    } else {
      setIsPlaying((prev) => !prev)
      if (!start) setStart(true)
    }
  }, [isPlaying, start, sortFunctions.length])

  useEffect(() => {
    if (isPlaying && start) {
      audio?.play().catch((error) => console.error('Playback error:', error))
    } else {
      audio?.pause()
    }
  }, [isPlaying, start, audio])

  const isSimulationFinished = currentStateIndices.every(
    (index, i) => index >= totalStates[i]
  )

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = []

    if (isPlaying && start) {
      sortFunctions.forEach((_, index) => {
        const interval = setInterval(() => {
          setCurrentStateIndices((prevIndices) => {
            const newIndices = [...prevIndices]
            if (newIndices[index] < totalStates[index]) {
              newIndices[index] += 1
            }
            return newIndices
          })
        }, interval_)
        intervals.push(interval)
      })
    }

    return () => intervals.forEach((interval) => clearInterval(interval))
  }, [isPlaying, start, totalStates, sortFunctions])

  return (
    <div className='flex flex-col items-center w-full h-full p-6 bg-black text-white gap-10'>
      <h1 className='text-3xl mb-6 text-center'>
        Sorting Algorithms Comparison
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-xl h-full'>
        {sortFunctions.map(({ name, func }, index) => (
          <div key={name} className='flex flex-col items-center'>
            <h2 className='text-xl mb-4'>{name}</h2>
            <SortingVisualizer
              list={list}
              sortFunction={func}
              isPlaying={isPlaying}
              start={start}
              currentStateIndex={currentStateIndices[index]}
              setCurrentStateIndex={(newIndex: number) => {
                setCurrentStateIndices((prevIndices) => {
                  const updatedIndices = [...prevIndices]
                  updatedIndices[index] = newIndex
                  return updatedIndices
                })
              }}
              interval={interval_}
            />
          </div>
        ))}
      </div>
      <SortingControls
        onPlayPauseRestart={handlePlayPauseRestart}
        isPlaying={isPlaying}
        isFinished={isSimulationFinished}
      />
    </div>
  )
}
