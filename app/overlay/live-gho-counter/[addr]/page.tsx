'use client'
import React from 'react'
import GHOLIveCounterOverlay from '../../../../components/GHOLIveCounterOverlay'

const page = ({
  params
}: {
  params: {
    addr: string
  }
}) => {
  return (
    <div className="w-full h-full">
      <GHOLIveCounterOverlay address={params.addr} />
    </div>
  )
}

export default page
