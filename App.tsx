import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import { Message, Sender, Attachment, Language } from './types';
import { getGeminiResponse } from './services/geminiService';
import { Icons, UI_STRINGS, APP_NAME } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>(Language.EN);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String.split(',')[1]);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleSendMessage = useCallback(async (text: string, files?: File[]) => {
    const attachments: Attachment[] = [];
    if (files) {
      for (const file of files) {
        try {
          const base64 = await fileToBase64(file);
          attachments.push({
            name: file.name,
            mimeType: file.type,
            data: base64,
          });
        } catch (e) {
          console.error("Error converting file to base64:", e);
        }
      }
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: Sender.USER,
      text,
      attachments,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const geminiResponse = await getGeminiResponse(
        text, 
        messages, 
        attachments.map(a => ({ data: a.data, mimeType: a.mimeType }))
      );

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: Sender.BOT,
        text: geminiResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      console.error("Chat Error:", error);
      let errorText = UI_STRINGS.genericError[language];
      
      if (error.message === "QUOTA_EXHAUSTED") {
        errorText = UI_STRINGS.quotaError[language];
      }

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: Sender.BOT,
        text: errorText,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, language]);

  const handleNewChat = useCallback(() => {
    const confirmMsg = language === Language.AR 
      ? "هل أنت متأكد من بدء جلسة جديدة؟ سيتم مسح التاريخ الحالي."
      : "Start a new guidance session? Current chat history will be cleared.";
    if (window.confirm(confirmMsg)) {
      setMessages([]);
    }
  }, [language]);

  const handleSectionClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === Language.EN ? Language.AR : Language.EN);
  };

  return (
    <div className={`flex h-screen w-full overflow-hidden bg-slate-50 ${language === Language.AR ? 'rtl' : 'ltr'}`}>
      <Sidebar 
        onSectionClick={handleSectionClick} 
        onNewChat={handleNewChat} 
        language={language}
        onToggleLanguage={toggleLanguage}
      />
      
      <main className="flex-1 relative flex flex-col min-w-0 h-full">
        {/* Mobile Header */}
        <header className="md:hidden bg-[#0c1a32] text-white p-4 flex items-center justify-between z-20 shadow-md">
           <div className={`flex items-center gap-2 ${language === Language.AR ? 'flex-row-reverse' : 'flex-row'}`}>
             <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center shadow-lg shadow-indigo-600/20">
               <span className="font-bold text-xs text-white">APR</span>
             </div>
             <h1 className="font-bold text-sm tracking-tight">{APP_NAME[language]}</h1>
           </div>
           <div className="flex gap-2">
             <button 
               onClick={toggleLanguage}
               className="p-1.5 bg-slate-800 rounded-lg border border-slate-700 text-indigo-400 hover:text-white transition-colors"
               title={language === Language.EN ? 'Switch to Arabic' : 'Switch to English'}
             >
               <Icons.Globe />
             </button>
             <button 
               onClick={handleNewChat}
               className="text-[10px] bg-indigo-600 px-2 py-1.5 rounded-lg border border-indigo-500 font-bold text-white shadow-sm"
             >
               {language === Language.EN ? 'NEW' : 'جديد'}
             </button>
           </div>
        </header>

        {/* Desktop Language Switch Icon (Floating / Top Right) */}
        <div className={`hidden md:block absolute top-6 ${language === Language.AR ? 'left-6' : 'right-6'} z-30`}>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 bg-white/80 backdrop-blur shadow-lg hover:shadow-xl border border-slate-200 p-2.5 rounded-2xl transition-all hover:border-indigo-400 group"
            title={language === Language.EN ? 'Switch to Arabic' : 'Switch to English'}
          >
            <div className="text-indigo-600 group-hover:scale-110 transition-transform">
              <Icons.Globe />
            </div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">
              {language === Language.EN ? 'AR' : 'EN'}
            </span>
          </button>
        </div>

        <ChatWindow 
          messages={messages} 
          onSendMessage={handleSendMessage} 
          onNewChat={handleNewChat}
          isLoading={isLoading} 
          language={language}
        />
      </main>
    </div>
  );
};

export default App;