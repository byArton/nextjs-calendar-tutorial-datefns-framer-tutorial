'use client';
import Calendar from '@/components/calendar/Calendar';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import EventModal from '@/components/calendar/EventModal';
import Sidebar from '@/components/calendar/Sidebar';
import { CalendarEvent } from '@/types/event';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('calendar-events');
    if (raw) {
      try {
        setEvents(JSON.parse(raw));
      } catch (error) {
        console.error('Failed to parse events from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedDate) setModalOpen(true);
  }, [selectedDate]);

  useEffect(() => {
    if (events.length > 0 || localStorage.getItem('calendar-events')) {
      localStorage.setItem('calendar-events', JSON.stringify(events));
    }
  }, [events]);

  const handleSave = (event: Omit<CalendarEvent, 'id'>) => {
    setEvents((prev) => [...prev, { ...event, id: uuidv4() }]);
  };
  const handleEdit = (id: string, event: Omit<CalendarEvent, 'id'>) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...event } : e))
    );
  };
  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
  };

  return (
    <motion.div
      className="flex min-h-screen font-mplus bg-gray-100"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <CalendarHeader
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />
        <main className="flex-1 p-8">
          <motion.section
            layout
            className="bg-white rounded-xl p-6 max-w-full mx-auto flex flex-col h-[600px]"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <div className="mb-4 flex justify-between items-center">
              <motion.h2
                layout
                className="text-2xl font-semibold text-gray-700"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                月間カレンダー
              </motion.h2>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <Calendar
                currentMonth={currentMonth}
                selectedDate={selectedDate!}
                setSelectedDate={setSelectedDate}
                events={events}
              />
            </div>
          </motion.section>

          {/* AnimatePresenceでモーダルをふわっと */}
          <AnimatePresence>
            {modalOpen && (
              <motion.div
                key="modal-bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40"
              >
                <EventModal
                  open={modalOpen}
                  date={selectedDate}
                  events={events}
                  onSave={handleSave}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onClose={handleCloseModal}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </motion.div>
  );
}
