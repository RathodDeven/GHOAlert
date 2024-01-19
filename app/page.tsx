'use client'
import './globals.css'
import { APP_NAME } from '../utils/config'
import CelebrationIcon from '@mui/icons-material/Celebration'
import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import TopHeader from '../components/pages/all/TopHeader'

export default function Home() {
  return (
    <div>
      <TopHeader />
      <div className="text-xl font-bold py-10">Your Project : {APP_NAME} </div>
      <div className="text-xl font-bold py-10">
        Mui Icon :{' '}
        <div className="text-blue-400">
          <CelebrationIcon />
        </div>{' '}
      </div>
      <div className="text-xl font-bold py-10">
        Mui Button:
        <>
          <Button variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </>
      </div>
      <div className="text-xl font-bold py-10 bg-s-bg">Your Project </div>
      <div className="text-xl font-bold py-10">Your Project </div>
      <div className="text-xl font-bold py-10">Your Project </div>
      <div className="text-xl font-bold py-10">Your Project </div>
      <div className="text-xl font-bold py-10">Your Project </div>
    </div>
  )
}
