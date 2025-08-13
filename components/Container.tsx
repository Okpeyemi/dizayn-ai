import React, { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode;
}


const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex-1 bg-primary-foreground mr-3 my-4 rounded-[20px] flex flex-col p-8 border border-muted">
        {children}
    </div>
  )
}

export default Container