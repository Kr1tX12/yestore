import React from 'react'
import { SelectedProvider } from './SelectedContext'
import { SingleSelectedProvider } from './SingleSelectedContext'

const FileSystemProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SelectedProvider>
        <SingleSelectedProvider>
            {children}
        </SingleSelectedProvider>
    </SelectedProvider>
  )
}

export default FileSystemProvider