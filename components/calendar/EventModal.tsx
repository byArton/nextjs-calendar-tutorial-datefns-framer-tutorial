// components/calendar/EventModal.tsx
import type { CalendarEvent } from '@/types/event';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Props = {
  open: boolean;
  date: Date | null;
  events: CalendarEvent[];
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  onEdit: (id: string, event: Omit<CalendarEvent, 'id'>) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
};

export default function EventModal({
  open,
  date,
  events,
  onSave,
  onEdit,
  onDelete,
  onClose,
}: Props) {
  // 新規追加用
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // モーダルが開くたびに新規追加フォームをリセット
  useEffect(() => {
    if (open && date) {
      setTitle('');
      setDescription('');
      console.log('モーダル開く - 選択日付:', format(date, 'yyyy-MM-dd')); // デバッグ用
    }
  }, [date, open]);

  // 編集IDが設定されたときに編集フォームに値を設定
  useEffect(() => {
    if (editId && date) {
      const dayKey = format(date, 'yyyy-MM-dd');
      const dayEvents = events.filter((e) => e.date === dayKey);
      const e = dayEvents.find((ev) => ev.id === editId);
      setEditTitle(e?.title || '');
      setEditDescription(e?.description || '');
    }
  }, [editId, date, events]);

  // モーダルが閉じるときに編集状態をリセット
  useEffect(() => {
    if (!open) {
      setEditId(null);
      setEditTitle('');
      setEditDescription('');
    }
  }, [open]);

  if (!open || !date) return null;

  // 当日イベント
  const dayKey = format(date, 'yyyy-MM-dd');
  const dayEvents = events.filter((e) => e.date === dayKey);

  console.log('EventModal - 日付:', dayKey, 'イベント数:', dayEvents.length); // デバッグ用

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 0 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-h-[80vh] overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">
            {format(date, 'yyyy.MM.dd')}
          </h2>

          {/* 予定一覧 */}
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Schedule</h3>
            {dayEvents.length === 0 ? (
              <div className="text-gray-400 text-sm mb-2">No Schedules</div>
            ) : (
              <ul className="space-y-2">
                {dayEvents.map((ev) => (
                  <li key={ev.id} className="border rounded p-2 bg-gray-50">
                    {editId === ev.id ? (
                      <div className="space-y-2">
                        <input
                          className="border rounded w-full p-2 text-sm"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          placeholder="title"
                        />
                        <textarea
                          className="border rounded w-full p-2 text-sm resize-none"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          placeholder="detail"
                          rows={2}
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
                            onClick={() => {
                              onEdit(ev.id, {
                                title: editTitle,
                                description: editDescription,
                                date: dayKey,
                              });
                              setEditId(null);
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            onClick={() => setEditId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-medium">{ev.title}</div>
                            {ev.description && (
                              <div className="text-sm text-gray-600 mt-1">
                                {ev.description}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-1 ml-2">
                            <button
                              className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded"
                              onClick={() => setEditId(ev.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded"
                              onClick={() => onDelete(ev.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 新規追加フォーム */}
          <div className="border-t pt-4">
            <h3 className="text-md font-semibold mb-2">New Schedule</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!title.trim()) return;

                const newEvent = {
                  title: title.trim(),
                  description: description.trim(),
                  date: dayKey,
                };

                console.log('新規イベント作成:', newEvent); // デバッグ用
                onSave(newEvent);
                setTitle('');
                setDescription('');
              }}
              className="space-y-3"
            >
              <input
                className="border rounded w-full p-2 text-sm"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="border rounded w-full p-2 text-sm resize-none"
                placeholder="detail"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-300"
                  disabled={!title.trim()}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
