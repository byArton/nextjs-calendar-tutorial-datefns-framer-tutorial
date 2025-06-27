// components/calendar/Sidebar.tsx
'use client';
import { COLORS } from '@/constants/color';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 h-screen flex flex-col justify-between">
      <div className="p-4">
        <div className="mb-8">
          <span
            className="text-xl font-bold tracking-wider"
            style={{ color: COLORS.primary }}
          >
            My Calendar
          </span>
        </div>
        <nav>
          <ul className="space-y-3">
            <li>
              <a
                className="flex items-center gap-2 p-2 rounded-lg font-normal bg-gray-100 text-gray-500"
                href="#"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                </svg>
                カレンダー
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
