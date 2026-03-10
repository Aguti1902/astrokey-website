'use client'

import { useAppStore } from '@/lib/store'
import { useT } from '@/lib/i18n'

const monthsEs = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const monthsEn = ['January','February','March','April','May','June','July','August','September','October','November','December']
const monthsFr = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
const monthsDe = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']
const monthsIt = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']
const monthsUk = ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень']
const monthsRu = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']

const monthsByLang: Record<string, string[]> = {
  es: monthsEs, en: monthsEn, fr: monthsFr, de: monthsDe, it: monthsIt, uk: monthsUk, ru: monthsRu,
}

export default function StepBirthDate() {
  const { testAnswers, setTestAnswer } = useAppStore()
  const t = useT()
  const lang = useAppStore((s) => s.language)
  const bd = testAnswers.birthDate
  const months = monthsByLang[lang] ?? monthsEs

  const update = (field: 'day' | 'month' | 'year', value: string) => {
    setTestAnswer('birthDate', { ...bd, [field]: value })
  }

  const selectClass = "w-full px-3 py-3.5 border border-white/15 rounded-xl text-white focus:border-primary-500 focus:ring-0 outline-none"

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-8">{t.test.birthDateTitle}</h2>
      <div className="max-w-md mx-auto grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/60 mb-2">{t.test.dayLabel}</label>
          <select value={bd.day} onChange={(e) => update('day', e.target.value)} className={selectClass}>
            <option value="">{t.test.dayLabel}</option>
            {Array.from({ length: 31 }, (_, i) => <option key={i+1} value={String(i+1)}>{i+1}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/60 mb-2">{t.test.monthLabel}</label>
          <select value={bd.month} onChange={(e) => update('month', e.target.value)} className={selectClass}>
            <option value="">{t.test.monthLabel}</option>
            {months.map((m, i) => <option key={m} value={String(i+1)}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/60 mb-2">{t.test.yearLabel}</label>
          <select value={bd.year} onChange={(e) => update('year', e.target.value)} className={selectClass}>
            <option value="">{t.test.yearLabel}</option>
            {Array.from({ length: 91 }, (_, i) => { const y = 2010-i; return <option key={y} value={String(y)}>{y}</option> })}
          </select>
        </div>
      </div>
    </div>
  )
}
