'use client'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'
import GHOLIveCounterOverlay from '../../components/GHOLIveCounterOverlay'
import { Button } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useAccount } from 'wagmi'
import toast from 'react-hot-toast'
import GHORecievedAlertOverlay from '../../components/GHORecievedAlertOverlay'
const Dashboard = () => {
  const [emulate, setEmulate] = React.useState(false)
  const { push } = useRouter()
  const { address } = useAccount()
  const handleLiveGhoCopy = () => {
    const url = `${window.location.origin}/overlay/live-gho-counter/${address}`
    navigator.clipboard.writeText(url)
    toast.success('Copied to clipboard')
  }
  const handleGHORecievedCopy = () => {
    const url = `${window.location.origin}/overlay/new-gho-alerts/${address}`
    navigator.clipboard.writeText(url)
    toast.success('Copied to clipboard')
  }
  return (
    <div className="p-20 bg-p-bg w-full h-full space-y-12">
      <div
        onClick={() => {
          push('/')
        }}
        className="cursor-pointer text-4xl font-bold flex flex-row items-center justify-start gap-x-4"
      >
        <ArrowBackIcon fontSize="inherit" />
        <div>Dashboard</div>
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="w-[500px] space-y-2">
          <div className="font-bold text-2xl">Live GHO Balance Overlay</div>
          <div className="font-semibold text-sm">
            This overlay shows live gho balance of your account
          </div>

          <Button
            variant="contained"
            onClick={handleLiveGhoCopy}
            startIcon={<ContentCopyIcon />}
          >
            Copy Overlay URL
          </Button>
        </div>

        <div>
          <div className="text-s-text font-bold">Preview</div>
          <div className="bg-s-bg w-[300px] h-[50px] rounded-md shadow-lg border-dotted border-s-text">
            <GHOLIveCounterOverlay address={address} isPreview />
          </div>
          {/* a box for preview */}
        </div>
      </div>

      <div className="flex flex-row justify-between items-center w-full">
        <div className="w-[500px] space-y-2">
          <div className="font-bold text-2xl">New GHO Recieved Overlay</div>
          <div className="font-semibold text-sm">
            This overlay will show a alert on recieving new gho on your account
            with the amount of gho received
          </div>
          <div className="flex flex-row items-center space-x-4">
            <Button
              variant="contained"
              onClick={handleGHORecievedCopy}
              startIcon={<ContentCopyIcon />}
            >
              Copy Overlay URL
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setEmulate(true)
              }}
              startIcon={<PlayArrowIcon />}
            >
              EMULATE
            </Button>
          </div>
        </div>
        <div>
          <div className="text-s-text font-bold">Preview</div>
          {/* a box for preview */}
          <div className="bg-s-bg w-[500px] h-[300px] rounded-md shadow-lg border-dotted border-s-text pt-2">
            <GHORecievedAlertOverlay
              emulate={emulate}
              setEmulate={setEmulate}
              address={address}
              isPreview
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
