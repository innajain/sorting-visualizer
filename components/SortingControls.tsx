'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import pauseSvg from '@/public/pause_circle_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import playSvg from '@/public/play_circle_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import restartSvg from '@/public/replay_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'

export default function SortingControls({
  onPlayPauseRestart,
  isPlaying,
  isFinished,
}: {
  onPlayPauseRestart: () => void
  isPlaying: boolean
  isFinished: boolean
}) {
  return (
    <div className='flex flex-col items-center mt-6'>
      <button
        className='p-4 rounded-full shadow-lg transition-transform transform hover:scale-105'
        onClick={onPlayPauseRestart}
      >
        <Image
          src={isFinished ? restartSvg : isPlaying ? pauseSvg : playSvg}
          alt={isFinished ? 'Restart' : isPlaying ? 'Pause' : 'Play'}
          width={60}
          height={60}
        />
      </button>
    </div>
  )
}
