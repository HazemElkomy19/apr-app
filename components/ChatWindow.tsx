
import React, { useRef, useEffect, useState } from 'react';
import { Message, Sender, Language } from '../types';
import { Icons, UI_STRINGS } from '../constants';

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (text: string, files?: File[]) => void;
  onNewChat: () => void;
  isLoading: boolean;
  language: Language;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage, onNewChat, isLoading, language }) => {
  const [inputText, setInputText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isAr = language === Language.AR;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() || selectedFiles.length > 0) {
      onSendMessage(inputText, selectedFiles);
      setInputText('');
      setSelectedFiles([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const handleCopy = (text: string, id: string) => {
    const cleanText = text.split('[RECOMMENDATIONS]:')[0].trim();
    navigator.clipboard.writeText(cleanText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const parseRecommendations = (text: string) => {
    const parts = text.split('[RECOMMENDATIONS]:');
    const mainText = parts[0];
    const recsString = parts[1] || '';
    const recs = recsString.split('|').map(s => s.trim()).filter(s => s !== '');
    return { mainText, recs };
  };

  const hints = isAr ? [
    'كيفية تعبئة القسم ب: إحصائيات الطلاب؟',
    'إرشادات رسم خرائط مخرجات التعلم',
    'اشتقاق خطة عمل من مؤشرات الأداء',
    'راجع مسودة قسم مخرجات التعلم الخاصة بي'
  ] : [
    'How to fill Section B: Student Statistics?',
    'Guide me in PLO Mapping (Section C1)',
    'Derive an Action Plan from KPIs',
    'Review my PLO assessment draft'
  ];

  return (
    <div className={`flex flex-col h-full bg-white relative ${isAr ? 'rtl font-sans' : 'ltr'}`}>
      {/* Dynamic Header for Actions */}
      {messages.length > 0 && (
        <div className={`p-4 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur sticky top-0 z-20 ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
           <div className={`flex items-center gap-2 ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Live Session</span>
           </div>
           <button 
             onClick={onNewChat}
             className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:bg-red-50 text-red-600 border border-transparent hover:border-red-100 ${isAr ? 'flex-row-reverse' : 'flex-row'}`}
           >
             <Icons.Trash />
             {UI_STRINGS.clearChat[language]}
           </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-6">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-2 shadow-inner group transition-all hover:scale-110">
              <Icons.Academic />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{UI_STRINGS.welcome[language]}</h2>
              <p className="text-slate-500 text-base leading-relaxed">
                {UI_STRINGS.subWelcome[language]}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full mt-4">
              {hints.map((hint) => (
                <button
                  key={hint}
                  onClick={() => onSendMessage(hint)}
                  className={`px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl border border-slate-200 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md flex items-center gap-3 ${isAr ? 'text-right flex-row-reverse' : 'text-left flex-row'}`}
                >
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  {hint}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, idx) => {
          const { mainText, recs } = parseRecommendations(msg.text);
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === Sender.USER ? 'items-end' : 'items-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.sender === Sender.USER ? (isAr ? 'flex-row' : 'flex-row-reverse') : (isAr ? 'flex-row-reverse' : 'flex-row')}`}>
                <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${msg.sender === Sender.USER ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                  {msg.sender === Sender.USER ? 'U' : 'QA'}
                </div>
                <div className="space-y-2 group relative">
                  <div className={`p-4 rounded-2xl shadow-sm border relative ${msg.sender === Sender.USER ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-white border-slate-200 text-slate-800'}`}>
                    {msg.sender === Sender.BOT && (
                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className={`absolute top-2 ${isAr ? 'left-2' : 'right-2'} p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-indigo-600 transition-all opacity-0 group-hover:opacity-100 border border-slate-200 z-10 flex items-center gap-1.5`}
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <span className="text-[10px] font-bold text-indigo-600">{UI_STRINGS.copied[language]}</span>
                        ) : (
                          <Icons.Copy />
                        )}
                      </button>
                    )}
                    <div className="whitespace-pre-wrap text-sm leading-relaxed prose prose-indigo prose-sm max-w-none">
                      {mainText}
                    </div>
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.attachments.map((att, i) => (
                          <div key={i} className={`text-[10px] px-2 py-1 rounded flex items-center gap-1 border ${msg.sender === Sender.USER ? 'bg-indigo-500/50 border-indigo-400' : 'bg-slate-50 border-slate-200'}`}>
                            <Icons.Paperclip /> {att.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={`text-[10px] text-slate-400 font-medium ${msg.sender === Sender.USER ? (isAr ? 'text-left' : 'text-right') : (isAr ? 'text-right' : 'text-left')}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>

              {msg.sender === Sender.BOT && recs.length > 0 && (
                <div className={`mt-3 flex flex-wrap gap-2 max-w-[85%] ${isAr ? 'mr-11 ml-0' : 'ml-11 mr-0'}`}>
                  {recs.map((rec, i) => (
                    <button
                      key={i}
                      onClick={() => onSendMessage(rec)}
                      className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-xl border border-indigo-100 transition-all shadow-sm hover:shadow-md"
                    >
                      {rec}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        {isLoading && (
          <div className={`flex ${isAr ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 items-center ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 animate-pulse border border-slate-200">
                QA
              </div>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-75"></div>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border-t border-slate-100 p-4 pb-2 sticky bottom-0 z-20">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-3">
          {selectedFiles.length > 0 && (
            <div className={`flex flex-wrap gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200 ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
              {selectedFiles.map((file, i) => (
                <div key={i} className="flex items-center gap-2 bg-white px-2 py-1 rounded border border-slate-200 text-xs shadow-sm">
                  <span className="truncate max-w-[150px] font-medium">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedFiles(prev => prev.filter((_, idx) => idx !== i))}
                    className="text-slate-400 hover:text-red-500 font-bold px-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className={`flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-2 transition-shadow focus-within:shadow-lg focus-within:border-indigo-400 group ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-sm hover:shadow-md"
              title="Attach guidelines or draft sections"
            >
              <Icons.Paperclip />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={UI_STRINGS.placeholder[language]}
              className={`flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-1 placeholder:text-slate-400 ${isAr ? 'text-right' : 'text-left'}`}
            />
            <button
              type="submit"
              disabled={isLoading || (!inputText.trim() && selectedFiles.length === 0)}
              className={`p-2.5 rounded-xl transition-all ${
                isLoading || (!inputText.trim() && selectedFiles.length === 0)
                  ? 'text-slate-300'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/30'
              } ${isAr ? 'rotate-180' : ''}`}
            >
              <Icons.Send />
            </button>
          </div>
          
          <div className="mt-4 pb-2 border-t border-slate-50 pt-3">
             <p className="text-[11px] text-center text-slate-600 font-bold uppercase tracking-widest">
                {UI_STRINGS.footer[language]}
             </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
