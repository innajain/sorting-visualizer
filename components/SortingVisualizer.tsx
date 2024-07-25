import { normalizeList } from '@/math utilities/normalizeList'
import React, { useEffect, useState } from 'react'

type SortingVisualizerProps = {
  list: number[]
  sortFunction: (arr: number[]) => number[][]
  isPlaying: boolean
  start: boolean
  currentStateIndex: number
  setCurrentStateIndex: (index: number) => void
  interval: number
}

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({
  list,
  sortFunction,
  isPlaying,
  start,
  currentStateIndex,
  setCurrentStateIndex,
  interval,
}) => {
  const [lstNums, setLstNums] = useState<number[]>(
    normalizeList(list).map((item) => item * 100)
  )
  const sortedStates = React.useMemo(
    () => sortFunction(list.slice()),
    [list, sortFunction]
  )

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined
    const audio = new Audio(
      '/swoosh-sound-effect-for-fight-scenes-or-transitions-2-149890.mp3'
    )
    let isAudioPlaying = false

    if (isPlaying && start) {
      intervalId = setInterval(() => {
        if (currentStateIndex >= sortedStates.length) {
          clearInterval(intervalId)
          return
        }
        setLstNums(sortedStates[currentStateIndex])

        if (!isAudioPlaying) {
          isAudioPlaying = true
          audio.play().catch((error) => console.error('Playback error:', error))
        }

        setCurrentStateIndex(currentStateIndex + 1)
      }, interval)
    }

    // Handle when the audio has ended
    audio.addEventListener('ended', () => {
      isAudioPlaying = false
    })

    return () => {
      if (intervalId) clearInterval(intervalId)
      audio.removeEventListener('ended', () => {
        isAudioPlaying = false
      })
    }
  }, [isPlaying, start, currentStateIndex, sortedStates, setCurrentStateIndex])

  const progressPercent = (
    (currentStateIndex / sortedStates.length) *
    100
  ).toFixed(2)

  return (
    <div className='w-full h-full flex flex-col items-center'>
      <div className='w-full flex items-end gap-[3px] h-full'>
        {lstNums.map((item, i) => (
          <div
            key={i}
            style={{ width: '1%', height: `${item}%` }}
            className='bg-green-600 rounded-sm shadow-lg'
          ></div>
        ))}
      </div>
      <div className='w-full mt-4'>
        <div className='bg-gray-800 rounded-full h-2'>
          <div
            className='bg-blue-600 h-2 rounded-full transition-all duration-300'
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className='text-center mt-2 text-gray-400'>{progressPercent}%</div>
      </div>
    </div>
  )
}

export default SortingVisualizer
