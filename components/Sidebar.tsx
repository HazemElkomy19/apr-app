
import React from 'react';
import { APP_NAME, APR_SECTIONS, Icons, UI_STRINGS } from '../constants';
import { Language } from '../types';

interface SidebarProps {
  onSectionClick: (sectionTitle: string) => void;
  onNewChat: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSectionClick, onNewChat, language, onToggleLanguage }) => {
  const isAr = language === Language.AR;

  return (
    <aside className={`w-80 bg-[#0c1a32] text-white flex flex-col hidden md:flex h-screen sticky top-0 border-r border-slate-800 ${isAr ? 'rtl font-sans' : 'ltr'}`}>
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/20">
          <Icons.Academic />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight tracking-tight">{APP_NAME[language]}</h1>
          <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">{UI_STRINGS.footer[language]}</span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-all py-3.5 px-4 rounded-xl font-bold shadow-xl shadow-indigo-600/10 border border-indigo-500/20"
        >
          <Icons.Plus />
          {UI_STRINGS.newChat[language]}
        </button>
        <button
          onClick={onToggleLanguage}
          className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 transition-all py-2.5 px-4 rounded-xl font-semibold border border-slate-700"
        >
          <Icons.Translate />
          {isAr ? 'English' : 'العربية'}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="mb-6">
          <h2 className={`text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2 ${isAr ? 'text-right' : 'text-left'}`}>
            {UI_STRINGS.sectionsTitle[language]}
          </h2>
          <div className="space-y-1.5">
            {APR_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionClick(isAr 
                  ? `كيف يمكنني تعبئة قسم ${section.titleAr} في نموذج 2025؟ يرجى تقديم إرشادات بناءً على معايير كليات بريدة.`
                  : `How should I fill section ${section.title} in the 2025 APR template? Please provide guidelines based on Buraydah Colleges standards.`)}
                className={`w-full text-left px-3 py-3 rounded-xl hover:bg-slate-800/80 transition-all group flex items-start gap-3 border border-transparent hover:border-slate-700 ${isAr ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
              >
                <div className={`mt-0.5 flex-shrink-0 text-slate-500 group-hover:text-indigo-400`}>
                  <Icons.Info />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-slate-200 group-hover:text-white transition-colors">
                    {isAr ? section.titleAr : section.title}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                    {isAr ? section.descriptionAr : section.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 px-5 py-5 bg-gradient-to-br from-indigo-900/40 to-slate-800/40 rounded-2xl border border-indigo-500/20 shadow-inner">
          <h3 className={`text-[11px] font-bold text-indigo-300 mb-2 uppercase tracking-wide ${isAr ? 'text-right' : 'text-left'}`}>
            {isAr ? 'رؤية الخبير' : 'QA Expert Insight'}
          </h3>
          <p className={`text-[11px] text-slate-400 leading-relaxed italic ${isAr ? 'text-right' : 'text-left'}`}>
            {isAr 
              ? '"التقرير السنوي هو المصدر الرئيسي لخطة تطوير البرنامج. كل نقطة ضعف تم تحديدها يجب معالجتها بإجراء محدد في خطة التطوير."'
              : '"The APR is the primary source for the Program Development Plan. Every weakness identified must be addressed with a specific action in section F."'
            }
          </p>
        </div>
      </nav>

      <div className="p-6 border-t border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold shadow-inner">
            QA
          </div>
          <div>
            <div className="text-xs font-bold text-white tracking-wide">{UI_STRINGS.expertMode[language]}</div>
            <div className="text-[9px] text-slate-500 uppercase font-bold mt-0.5">NCAAA 2025 Specialist</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
