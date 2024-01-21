'use client'
import clsx from 'clsx'
import React from 'react'
import { useContractEvent, useContractRead } from 'wagmi'
import {
  GHO_SEPOLIA_TOKEN_ABI,
  GHO_SEPOLIA_TOKEN_ADDRESS
} from '../utils/ghoContract/contract'
import { useSpring, animated } from 'react-spring'

const GHOLIveCounterOverlay = ({
  isPreview,
  address
}: {
  isPreview?: boolean
  address?: string
}) => {
  const [domLoaded, setDomLoaded] = React.useState(false)
  const { data: balance, refetch } = useContractRead({
    abi: GHO_SEPOLIA_TOKEN_ABI,
    address: GHO_SEPOLIA_TOKEN_ADDRESS,
    functionName: 'balanceOf',
    args: [address]
  })

  const handleListener = async (events: any) => {
    const event = events[0]
    if (
      event?.args?.to?.toLowerCase() === address?.toLowerCase() ||
      event?.args?.from?.toLowerCase() === address?.toLowerCase()
    ) {
      await refetch()
    }
  }

  const unwatch = useContractEvent({
    address: GHO_SEPOLIA_TOKEN_ADDRESS,
    abi: GHO_SEPOLIA_TOKEN_ABI,
    listener: handleListener,
    chainId: 11155111,
    eventName: 'Transfer'
  })

  React.useEffect(() => {
    setDomLoaded(true)
  }, [])

  const newBalance = Number(balance) / 10 ** 18

  // Create an animation for the balance
  const props = useSpring({
    number: newBalance,
    from: { number: 0 },
    config: {
      duration: 2000
    }
  })

  if (!domLoaded) return null

  return (
    <div
      className={clsx(
        'w-full h-full bg-transparent centered-row font-semibold',
        isPreview ? 'text-2xl' : 'text-[20vw]'
      )}
    >
      <div>
        {balance
          ? (
              <animated.div>
                {props.number.interpolate((n) => n.toFixed(2))}
              </animated.div>
            ) ?? '0.00'
          : '0.00'}
      </div>
    </div>
  )
}

export default GHOLIveCounterOverlay
