import React from 'react';
import { APRSection, Language } from './types';

export const APP_NAME = {
  en: "APR Assistant",
  ar: "مساعد التقرير السنوي"
};

export const SYSTEM_INSTRUCTION = `You are a world-class Quality Assurance (QA) specialist specifically trained on the Saudi National Center for Academic Accreditation and Evaluation (NCAAA) standards for Buraydah Private Colleges. 
Your primary goal is to assist academic staff members in completing or reviewing the Annual Program Report (APR) according to the 2025 Template (TP-152).

Core Philosophy:
- APR is NOT just a form-filling exercise; it is a comprehensive annual evaluation of all program activities.
- Support both English and Arabic languages. Respond in the same language the user uses.

Analytical Depth (Interpret what's "Behind the Numbers"):
- When the user provides data (Section B Statistics or Section D KPIs), DO NOT simply restate the numbers.
- INTERPRET the data: What does it imply? Why did a value change? What is the root cause? 
- Example: "A 5% drop in graduate employment might not just be a number; it could indicate a gap in current industry-relevant skills within the curriculum or a need for more intensive career services."

Specific Section Guidance:
1. Section A (Improvement Plans from Previous Year): 
   - You MUST ensure the completion percentage of each improvement priority is specified.
   - Every percentage MUST be explicitly linked to relevant performance indicators (KPIs) and documented evidence.
   - If missing, prompt: "Please specify the evidence (e.g., Council Minute #42) that verifies this 80% completion rate."

2. Section F (Program Development Plan):
   - This plan MUST be comprehensive and include:
     a) Incomplete actions carried over from the previous year (from Section A).
     b) New actions derived from current year recommendations (Sections B, C, D, E).
   - Structure: Explicitly explain that each "Priority for Improvement" may require multiple specific "Actions" to be fully achieved. Help the user map these actions.

Empathy and Facilitation (Role of the Assistant):
- If the user expresses boredom, exhaustion, or feeling overwhelmed:
  - Remind them of the APR's value: "I know this is demanding, but the APR is the primary tool for program evolution. It ensures our students receive a high-quality education that meets national standards."
  - Facilitate the task: Suggest specific draft text. Offer to analyze raw data. Provide clear templates.
  - Say: "To make this easier, I can draft a list of proposed actions for your Development Plan based on the KPI gaps we identified."

CRITICAL REQUIREMENT: 
At the end of every response, provide 3 relevant follow-up questions or recommendations.
Use the format:
[RECOMMENDATIONS]: Question 1 | Question 2 | Question 3

Template Sections (TP-152 2025):
A. Improvement Plans from the Previous Year
B. Program Statistics
C. Program Assessment
D. Program KPIs
E. Challenges and difficulties
F. Program Development Plan
G. Approval`;

export const APR_SECTIONS: APRSection[] = [
  { 
    id: 'prev', 
    title: 'A. Previous Improvement Plans', 
    description: 'Track completion % linked to KPIs and specific evidence.',
    titleAr: 'أ. خطط التحسين من العام السابق',
    descriptionAr: 'متابعة نسبة الإنجاز المرتبطة بالمؤشرات والأدلة المحددة.'
  },
  { 
    id: 'stats', 
    title: 'B. Program Statistics', 
    description: 'Deep analysis of enrolment and graduation trends.',
    titleAr: 'ب. إحصائيات البرنامج',
    descriptionAr: 'تحليل عميق لاتجاهات التسجيل والتخرج.'
  },
  { 
    id: 'assessment', 
    title: 'C. Program Assessment', 
    description: 'Interpretation of PLO gaps and stakeholder feedback.',
    titleAr: 'ج. تقويم البرنامج',
    descriptionAr: 'تفسير فجوات مخرجات التعلم وآراء أصحاب المصلحة.'
  },
  { 
    id: 'kpis', 
    title: 'D. Program KPIs', 
    description: 'What do the indicators actually say about quality?',
    titleAr: 'د. مؤشرات أداء البرنامج',
    descriptionAr: 'ماذا تقول المؤشرات فعلياً عن جودة البرنامج؟'
  },
  { 
    id: 'challenges', 
    title: 'E. Challenges & Difficulties', 
    description: 'Identifying root causes of obstacles.',
    titleAr: 'هـ. التحديات والصعوبات',
    descriptionAr: 'تحديد الأسباب الجذرية للعقبات.'
  },
  { 
    id: 'devplan', 
    title: 'F. Program Development Plan', 
    description: 'Multi-action plans merging carry-over and new recs.',
    titleAr: 'و. خطة تطوير البرنامج',
    descriptionAr: 'خطط متعددة الإجراءات تدمج المهام المرحلة والتوصيات الجديدة.'
  },
  { 
    id: 'approval', 
    title: 'G. Approval of Report', 
    description: 'Council details and reference numbers.',
    titleAr: 'ز. اعتماد التقرير',
    descriptionAr: 'تفاصيل المجلس وأرقام المرجع.'
  }
];

export const UI_STRINGS = {
  welcome: {
    en: "I am your APR assistant, How can I help you?",
    ar: "أنا مساعد التقرير السنوي الخاص بك، كيف يمكنني مساعدتك؟"
  },
  subWelcome: {
    en: "I am here to guide you through the 2025 APR (TP-152). I'll help you interpret the data, link evidence, and build a solid development plan.",
    ar: "أنا هنا لإرشادك خلال التقرير السنوي 2025 (TP-152). سأساعدك في تفسير البيانات، وربط الأدلة، وبناء خطة تطوير متينة."
  },
  newChat: {
    en: "New Guidance Session",
    ar: "جلسة إرشادية جديدة"
  },
  clearChat: {
    en: "Clear Chat",
    ar: "مسح المحادثة"
  },
  sectionsTitle: {
    en: "TP-152 (2025) Sections",
    ar: "أقسام نموذج (TP-152) 2025"
  },
  footer: {
    en: "Buraydah Colleges, Quality & development center",
    ar: "كليات بريدة، مركز الجودة والتطوير"
  },
  placeholder: {
    en: "Ask about sections, interpret KPIs, or review your draft...",
    ar: "اسأل عن الأقسام، اطلب تفسير المؤشرات، أو راجع مسودتك..."
  },
  expertMode: {
    en: "Expert Mode Active",
    ar: "وضع الخبير مفعل"
  },
  copied: {
    en: "Copied!",
    ar: "تم النسخ!"
  },
  quotaError: {
    en: "The assistant is currently handling too many requests. Please wait a few seconds and try again.",
    ar: "المساعد يتعامل حالياً مع عدد كبير من الطلبات. يرجى الانتظار لبضع ثوان ثم المحاولة مرة أخرى."
  },
  genericError: {
    en: "An unexpected error occurred. Please try again later.",
    ar: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقاً."
  }
};

export const Icons = {
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>,
  Send: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>,
  Paperclip: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" /></svg>,
  Academic: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147L12 14.654l7.74-4.507a4.488 4.488 0 00-6.36-6.36l-.88.88a1.5 1.5 0 01-2.12 0l-.88-.88a4.488 4.488 0 00-6.36 6.36z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75v-4.096m0 0l-7.74-4.507m7.74 4.507l7.74-4.507" /></svg>,
  Info: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>,
  Translate: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>,
  Globe: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.856.12-1.683.342-2.466" /></svg>,
  Copy: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375a1.125 1.125 0 01-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>,
};
