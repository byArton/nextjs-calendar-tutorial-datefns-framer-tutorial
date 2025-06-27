// components/calendar/CalendarHeader.tsx
'use client';
import { addMonths, format, subMonths } from 'date-fns';
import { ja } from 'date-fns/locale';

type Props = {
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
};

export default function CalendarHeader({
  currentMonth,
  setCurrentMonth,
}: Props) {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-8 py-4 bg-white">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 rounded hover:bg-gray-100"
          aria-label="前月"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor">
            <polyline points="15 18 9 12 15 6" strokeWidth="2" />
          </svg>
        </button>
        <div className="text-xl font-semibold">
          {format(currentMonth, 'yyyy年 M月', { locale: ja })}
        </div>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 rounded hover:bg-gray-100"
          aria-label="次月"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor">
            <polyline points="9 6 15 12 9 18" strokeWidth="2" />
          </svg>
        </button>
      </div>
      <div>
        <span className="text-sm text-gray-500">
          {format(new Date(), 'yyyy/MM/dd (E)', { locale: ja })}
        </span>
      </div>
    </header>
  );
}
