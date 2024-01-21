import clsx from 'clsx'
import React from 'react'

const GHORecievedAlertOverlay = ({
  isPreview,
  address
}: {
  isPreview?: boolean
  address?: string
}) => {
  return (
    <div
      className={clsx(
        'w-full h-full bg-transparent centered-row font-semibold',
        isPreview ? 'text-2xl' : 'text-[3.5vw]'
      )}
    >
      {address ?? '0.0000'}
    </div>
  )
}

export default GHORecievedAlertOverlay
