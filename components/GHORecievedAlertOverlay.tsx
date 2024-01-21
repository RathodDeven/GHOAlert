import clsx from 'clsx'
import React, { useEffect } from 'react'
import {
  GHO_SEPOLIA_TOKEN_ABI,
  GHO_SEPOLIA_TOKEN_ADDRESS
} from '../utils/ghoContract/contract'
import { useContractEvent } from 'wagmi'
import { useSpring, animated } from 'react-spring'
import { shortenString } from '../utils/helper-function'
import { getHandleFromAddress } from '../utils/lens'

const GHORecievedAlertOverlay = ({
  isPreview,
  address,
  emulate,
  setEmulate
}: {
  isPreview?: boolean
  address?: string
  emulate?: boolean
  setEmulate?: any
}) => {
  const [props, set] = useSpring(() => ({ scale: 0 }))
  const [textProps, setText] = useSpring(() => ({ opacity: 0, marginTop: 50 }))
  const [toShowAddress, setAddress] = React.useState<string>('rathod')
  const [value, setValue] = React.useState<string>('10')

  const handleListener = async (events: any) => {
    const event = events[0]
    if (event?.args?.to?.toLowerCase() === address?.toLowerCase()) {
      const fromAddress = event?.args?.from?.toLowerCase()
      const value = event?.args?.value

      const handle = await getHandleFromAddress(fromAddress)

      if (handle) setAddress(handle.replace('lens/', ''))
      else setAddress(fromAddress)
      const newValue = Number(Number(value) / 10 ** 18)

      setValue(newValue.toFixed(2))

      console.log('show alert')
      await showAlert()
    }
  }
  const unwatch = useContractEvent({
    address: GHO_SEPOLIA_TOKEN_ADDRESS,
    abi: GHO_SEPOLIA_TOKEN_ABI,
    listener: handleListener,
    chainId: 11155111,
    eventName: 'Transfer'
  })

  useEffect(() => {
    return () => {
      if (unwatch) unwatch()
    }
  }, [])

  useEffect(() => {
    if (emulate) {
      setEmulate(false)
      showAlert()
    }
  }, [emulate])

  const showAlert = async () => {
    // play money audio
    const audio = new Audio('/cashier-sound.mp3')
    audio.play()

    set({ scale: 1, from: { scale: 0 }, config: { duration: 500 } })
    setText({
      opacity: 1,
      marginTop: 0,
      from: { opacity: 0, marginTop: 50 },
      config: { duration: 500 }
    })

    setTimeout(() => {
      set({ scale: 0, from: { scale: 1 }, config: { duration: 500 } })
      setText({
        opacity: 0,
        marginTop: 50,
        from: { opacity: 1, marginTop: 0 },
        config: { duration: 500 }
      })
    }, 2500) // adjust timing as needed
  }
  return (
    <div>
      <div
        className={clsx(
          'w-full h-full bg-transparent flex flex-col justify-center items-center font-semibold',
          isPreview ? 'text-2xl' : 'text-[5vw]'
        )}
      >
        <animated.img
          src="/gho.gif"
          alt="gho-alert"
          className={clsx(
            'object-cover rounded-3xl',
            isPreview ? 'w-[300px] ' : 'w-[70vw]'
          )}
          style={{
            transform: props.scale.to((scale) => `scale(${scale})`)
          }}
        />
        <animated.div
          style={{
            opacity: textProps.opacity.to((opacity) => opacity),
            marginTop: textProps.marginTop.to((marginTop) => `${marginTop}px`)
          }}
        >
          {shortenString(toShowAddress ?? '0x0000', 15)} tipped {value} GHO
        </animated.div>
      </div>
    </div>
  )
}

export default GHORecievedAlertOverlay
