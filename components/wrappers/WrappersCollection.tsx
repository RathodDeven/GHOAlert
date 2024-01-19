import React from 'react'
import ThemeProvider from './TailwindThemeProvider'
import MuiThemeWrapper from './MuiThemeWrapper'
import ConnectKitWrapper from './ConnectKitWrapper'
import UILayout from './UILayout'

const WrappersCollection = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <MuiThemeWrapper>
        <ConnectKitWrapper>
          <UILayout>{children}</UILayout>
        </ConnectKitWrapper>
      </MuiThemeWrapper>
    </ThemeProvider>
  )
}

export default WrappersCollection
