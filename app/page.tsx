'use client'
import './globals.css'
import TopHeader from '../components/pages/all/TopHeader'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import GHOBox from '../components/GHOBox'
export default function Home() {
  return (
    <div className="w-full h-full bg-p-bg">
      <TopHeader />
      <div className="p-14">
        <div className="between-row">
          <div className="space-y-12 w-[550px]">
            <div className="text-7xl font-bold">
              Pushing GHO adoption for Streamers
            </div>
            <div className="space-y-4">
              <div className="font-semibold text-xl start-row gap-x-2">
                <ArrowForwardIcon className="pt-1" />
                <div>
                  Easy to integrate Stream Overlays For GHO related alerts
                </div>
              </div>
              <div className="font-semibold text-xl start-row gap-x-2">
                <ArrowForwardIcon className="pt-1" />
                <div>Works on any Streaming Software</div>
              </div>
              <div className="font-semibold text-xl start-row gap-x-2">
                <ArrowForwardIcon className="pt-1" />
                <div>No Installation Required</div>
              </div>
            </div>
          </div>
          <GHOBox />
        </div>
      </div>
    </div>
  )
}
