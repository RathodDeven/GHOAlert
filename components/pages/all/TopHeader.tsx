import React from 'react'
import { APP_NAME } from '@/utils/config'
import { useTheme } from '../../wrappers/TailwindThemeProvider'
import { Button, IconButton } from '@mui/material'
import { ConnectKitButton } from 'connectkit'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useAccount } from 'wagmi'
import Link from 'next/link'
const TopHeader = () => {
  const { theme, toggleTheme } = useTheme()
  const { isConnected } = useAccount()
  return (
    <div className="flex flex-row items-center justify-between p-14 w-full">
      <div className="text-2xl font-bold">{APP_NAME}</div>
      <div className="centered-row space-x-4">
        {isConnected && (
          <Link
            href={'/dashboard'}
            className="text-p-text font-semibold text-md no-underline hover:text-s-text"
          >
            Dashboard
          </Link>
        )}
        <ConnectKitButton />
        <IconButton onClick={toggleTheme}>
          {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </div>
    </div>
  )
}

export default TopHeader
