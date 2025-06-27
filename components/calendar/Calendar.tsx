// components/calendar/Calendar.tsx
import type { CalendarEvent } from '@/types/event';
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ja } from 'date-fns/locale';
import { motion } from 'framer-motion';
export default function Calendar({
  currentMonth,
  selectedDate,
  setSelectedDate,
  events,
}: {
  currentMonth: Date;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  events: CalendarEvent[];
}) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { locale: ja });
  const endDate = endOfWeek(monthEnd, { locale: ja });

  const totalDays = Math.round(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1
  );
  const numWeeks = Math.ceil(totalDays / 7);

  const rows = [];
  for (let week = 0; week < numWeeks; week++) {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(startDate, week * 7 + i);
      const isCurrentMonth = isSameMonth(date, monthStart);
      const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
      const dayEvents = events.filter(
        (e) => e.date === format(date, 'yyyy-MM-dd')
      );

      // ★ 色を制御
      let textColorClass = '';
      if (i === 0)
        textColorClass = 'text-red-500'; // 日曜
      else if (i === 6)
        textColorClass = 'text-blue-500'; // 土曜
      else textColorClass = isCurrentMonth ? 'text-gray-900' : 'text-gray-300';

      days.push(
        <td key={date.toISOString()} style={{ height: 'calc(100% / 6)' }}>
          <div
            className={`
      h-full flex flex-col items-center border border-gray-200 rounded-xl bg-white transition m-1 ${textColorClass}
      ${isSelected ? 'border-orange-500 shadow-lg' : ''}
    `}
          >
            {/* 日付を常に中央 */}
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => setSelectedDate(date)}
              className={`
        w-10 h-10 flex items-center justify-center rounded-full
        transition
        ${isSelected ? 'bg-orange-300 text-white font-bold' : isCurrentMonth ? 'hover:bg-orange-50' : 'text-gray-300'}
        ${textColorClass}
      `}
              aria-label={format(date, 'yyyy/MM/dd')}
            >
              {format(date, 'd')}
            </motion.button>
            {/* 予定Stackは下側に表示（mt-1で日付ボタンとの間隔） */}
            {dayEvents.length > 0 && (
              <div className="mt-1 w-10 flex flex-col gap-0.5 items-center">
                {dayEvents.length > 0 && (
                  <div className="mt-1 w-10 h-4 rounded bg-orange-400 text-xs text-white text-center">
                    {dayEvents.length}件
                  </div>
                )}
                {dayEvents.length > 2 && (
                  <div className="rounded bg-orange-200 text-[11px] text-orange-700 px-1 text-center w-full">
                    +{dayEvents.length - 2}件
                  </div>
                )}
              </div>
            )}
          </div>
        </td>
      );
    }
    rows.push(<tr key={week}>{days}</tr>);
  }

  return (
    <table className="w-full h-full table-fixed border-separate border-spacing-y-1 select-none">
      <thead>
        <tr>
          {['日', '月', '火', '水', '木', '金', '土'].map((d, i) => (
            <th
              key={i}
              className="pb-2 font-semibold text-gray-600 text-center"
            >
              {d}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="h-full">{rows}</tbody>
    </table>
  );
}
