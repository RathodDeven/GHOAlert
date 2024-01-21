'use client'
import { Button } from '@mui/material'
import { ConnectKitButton } from 'connectkit'
import React, { useEffect, useState } from 'react'
import { useAccount, useContractWrite } from 'wagmi'
import {
  GHO_SEPOLIA_TOKEN_ABI,
  GHO_SEPOLIA_TOKEN_ADDRESS
} from '../utils/ghoContract/contract'
import { utils } from 'ethers'
import toast from 'react-hot-toast'
import { waitForTransaction } from '@wagmi/core'

const GHOBox = () => {
  const { isConnected } = useAccount()
  const [walletAddress, setWalletAddress] = useState()
  const [amount, setAmount] = useState<number>(1)
  const { isLoading, write, isSuccess } = useContractWrite({
    abi: GHO_SEPOLIA_TOKEN_ABI,
    address: GHO_SEPOLIA_TOKEN_ADDRESS,
    functionName: 'transfer',
    args: [walletAddress, amount > 0 ? utils.parseEther(String(amount)) : '0']
  })

  const handleSend = async () => {
    try {
      if (!walletAddress || !amount || !isConnected) return

      write()
    } catch (e) {
      toast.error(String(e))
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Transaction Created')
    }
  }, [isSuccess])

  return (
    <div className="px-32 centered-row">
      <div className="bg-s-bg w-[500px] p-4 space-y-3 rounded-2xl shadow-lg">
        <div className="start-row gap-x-4 text-sm font-bold">
          <div>Send GHO</div>
          <div className="text-s-text">Mint GHO</div>
        </div>
        <div className="bg-p-bg rounded-xl p-4 space-y-1">
          <div className="font-bold text-xs text-s-text ">
            {/* Wallet address, .eth name or lens/ handle */}
            To Wallet address
          </div>
          <input
            type="text"
            placeholder="0x000000..."
            value={walletAddress}
            onChange={(e) => {
              // @ts-ignore
              setWalletAddress(e?.target?.value)
            }}
            className="appearance-none text-2xl font-bold border-none bg-transparent text-p-text outline-none"
          />
        </div>
        <div className="bg-p-bg rounded-xl p-4 space-y-1">
          <div className="font-bold text-xs text-s-text ">Amount</div>
          <input
            type="number"
            className="appearance-none text-2xl font-bold border-none bg-transparent text-p-text outline-none"
            placeholder="0"
            value={amount}
            onChange={(e) => {
              // @ts-ignore
              setAmount(e?.target?.value)
            }}
          />
        </div>

        {isConnected ? (
          <Button
            variant="contained"
            onClick={handleSend}
            disabled={isLoading}
            className="w-full rounded-xl py-3 text-lg"
          >
            {isLoading ? 'Sending' : 'Send'}
          </Button>
        ) : (
          <ConnectKitButton.Custom>
            {({
              isConnected,
              isConnecting,
              show,
              hide,
              address,
              ensName,
              chain
            }) => {
              return (
                <Button
                  variant="contained"
                  onClick={show}
                  className="w-full rounded-xl py-3 text-lg"
                >
                  {'Connect Wallet'}
                </Button>
              )
            }}
          </ConnectKitButton.Custom>
        )}
      </div>
    </div>
  )
}

export default GHOBox
