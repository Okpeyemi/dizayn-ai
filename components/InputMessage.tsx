"use client"

import React from 'react'
import DesignInput from './DesignInput'

const InputMessage = () => {
  const handlePromptSubmit = (prompt: string) => {
    console.log('Prompt soumis:', prompt)
    // Ajoutez ici votre logique de traitement du prompt
  }

  return (
    <div className="flex-1 bg-primary-foreground mr-3 my-4 rounded-[20px] flex flex-col items-center justify-center p-8 border border-muted">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl font-bold text-foreground font-rakkas mb-10">
          Qu'est-ce qu'on fait aujourd'hui ?
        </h1>
        
        <DesignInput onSubmit={handlePromptSubmit} />
      </div>
    </div>
  )
}

export default InputMessage