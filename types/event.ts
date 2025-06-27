// types/event.ts
export type CalendarEvent = {
  id: string; // 一意なID（uuidなど）
  title: string; // 予定タイトル
  date: string; // ISO形式の日付（例："2025-06-27"）
  description?: string; // 予定詳細（省略可）
};
