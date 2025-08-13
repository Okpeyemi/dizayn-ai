import Container from '@/components/Container'
import InputMessage from '@/components/InputMessage'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const DashboardPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Container>
        <InputMessage />
      </Container>
    </div>
  )
}

export default DashboardPage