'use client'
import React, { useState } from 'react'
import GHORecievedAlertOverlay from '../../../../components/GHORecievedAlertOverlay'

const NewGhoAlert = ({
  params
}: {
  params: {
    addr: string
  }
}) => {
  const [emulate, setEmulate] = useState(false)
  return (
    <div className="w-full h-full">
      <GHORecievedAlertOverlay
        emulate={emulate}
        setEmulate={setEmulate}
        address={params.addr}
      />
    </div>
  )
}

export default NewGhoAlert
