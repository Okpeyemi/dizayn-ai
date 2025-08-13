"use client";

import Container from "@/components/Container";
import Sidebar from "@/components/Sidebar";
import DesignInput from "@/components/DesignInput";
import { ChevronLeft, Edit, Download, Loader2, Eye, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: {
    text?: string;
    image?: string;
    generatedImage?: string;
    prompt?: string;
    revisedPrompt?: string;
  };
  timestamp: Date;
}

const page = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<{ prompt: string; revised: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleBack = () => {
    window.history.back();
  };

  const handleEdit = () => {
    console.log("Edit clicked");
  };

  const showPrompt = (prompt: string, revised: string) => {
    setSelectedPrompt({ prompt, revised });
    setShowPromptModal(true);
  };

  // Fonction principale qui gère tout le processus
  const handleDesignSubmit = async (prompt: string, images: string[]) => {
    const userMessageId = Date.now().toString();
    
    // Ajouter le message de l'utilisateur
    const userMessage: ChatMessage = {
      id: userMessageId,
      type: 'user',
      content: {
        text: prompt,
        image: images[0]
      },
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsGenerating(true);
    
    try {
      let finalPrompt = prompt;
      const referenceImage = images[0];

      // Si on a une image de référence, on l'analyse d'abord
      if (referenceImage) {
        console.log("Analyse de l'image de référence...");
        
        const analyzeResponse = await fetch('/api/analyze-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageUrl: referenceImage
          })
        });

        const analyzeData = await analyzeResponse.json();
        
        if (analyzeData.prompt) {
          finalPrompt = prompt 
            ? `Inspiré de cette image: ${analyzeData.prompt}\n\nDemande personnalisée: ${prompt}`
            : analyzeData.prompt;
        }
      }

      if (!finalPrompt.trim()) {
        alert('Veuillez ajouter une description ou une image de référence');
        return;
      }

      // Génération de l'image
      console.log("Génération de l'image...");
      
      const generateResponse = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: finalPrompt
        })
      });

      const generateData = await generateResponse.json();
      
      if (generateData.imageUrl) {
        // Ajouter la réponse de l'assistant
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: {
            generatedImage: generateData.imageUrl,
            prompt: finalPrompt,
            revisedPrompt: generateData.revisedPrompt
          },
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Aucune image générée');
      }

    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la génération du design');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'design-generated.png';
    link.click();
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Container>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-transparent flex items-center">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 hover:bg-muted p-2 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>

              <h1 className="text-lg font-medium font-dm-sans text-foreground">
                Générateur de Design IA
              </h1>
            </div>

            <button
              onClick={handleEdit}
              className="flex items-center space-x-2 hover:bg-muted p-2 rounded-lg transition-colors"
            >
              <Edit className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Zone de chat */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              
              {/* Message d'accueil */}
              {messages.length === 0 && !isGenerating && (
                <div className="text-center mb-8">
                  <h2 className="text-6xl font-bold font-rakkas text-foreground mb-4">
                    Créez votre design avec l'IA
                  </h2>
                  <p className="text-muted-foreground font-dm-sans text-lg">
                    Ajoutez une image de référence et/ou décrivez ce que vous voulez créer
                  </p>
                </div>
              )}

              {/* Messages du chat */}
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-2xl ${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-2xl p-4`}>
                      
                      {/* Message utilisateur */}
                      {message.type === 'user' && (
                        <div className="space-y-3 font-dm-sans">
                          {message.content.image && (
                            <img
                              src={message.content.image}
                              alt="Image de référence"
                              className="max-w-xs rounded-lg"
                            />
                          )}
                          {message.content.text && (
                            <p className="text-sm">{message.content.text}</p>
                          )}
                        </div>
                      )}

                      {/* Message assistant */}
                      {message.type === 'assistant' && (
                        <div className="space-y-3 font-dm-sans">
                          {message.content.generatedImage && (
                            <div>
                              <img
                                src={message.content.generatedImage}
                                alt="Design généré"
                                className="max-w-md rounded-lg shadow-lg"
                              />
                              <div className="flex items-center justify-between mt-2">
                                <button
                                  onClick={() => showPrompt(message.content.prompt!, message.content.revisedPrompt!)}
                                  className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded flex items-center space-x-1"
                                >
                                  <Eye className="w-3 h-3" />
                                  <span>Voir le prompt</span>
                                </button>
                                <button
                                  onClick={() => downloadImage(message.content.generatedImage!)}
                                  className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded flex items-center space-x-1"
                                >
                                  <Download className="w-3 h-3" />
                                  <span>Télécharger</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Indicateur de génération */}
                {isGenerating && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl p-4">
                      <div className="flex items-center font-dm-sans space-x-2 text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Génération en cours...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input de design fixe en bas */}
          <div className="">
            <div className="max-w-4xl mx-auto">
              <DesignInput
                onSubmit={handleDesignSubmit}
                placeholder="Décrivez le design que vous voulez créer..."
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Modal pour afficher le prompt */}
      {showPromptModal && selectedPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-2xl mx-4 h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Prompt utilisé</h3>
              <button
                onClick={() => setShowPromptModal(false)}
                className="p-2 hover:bg-muted rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4 font-dm-sans">
              <div>
                <h4 className="font-medium mb-2">Prompt original :</h4>
                <div className="bg-muted p-3 rounded text-sm">
                  {selectedPrompt.prompt}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Prompt révisé par DALL-E :</h4>
                <div className="bg-muted p-3 rounded text-sm">
                  {selectedPrompt.revised}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
