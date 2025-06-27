# Calendar Clone (Next.js & Tailwind CSS)

This is a Calendar/Schedule application. Implemented with Next.js 15, Tailwind CSS, and Framer Motion, it supports creating, editing, deleting, and local saving of appointments.

### DEMO

[Start](https://nextjs-calendar-tutorial-datefns-framer-tutorial-g4jtbh7ca.vercel.app/)

## 🚀 Key Features.

- **Google Calendar-like UI**: Sophisticated design for both PC and smartphones
- **CRUD** of appointments: add new, edit, delete, and save locally (localStorage)
- **Monthly calendar view**: Manage appointments by date with a click
- **Animation**: Natural modal & button effects with Framer Motion
- **Tailwind CSS implementation**: Easily change theme colors and styles

## 🛠️ Technology Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [date-fns](https://date-fns.org/)
- [uuid](https://www.npmjs.com/package/uuid)

## ✨ Usage

```bash
# Install dependent packages
npm install

# Start development server
npm run dev

# build production
npm run build
npm start

```

Go to http://localhost:3000 for access.

## 🖼️ Example screens

    - Monthly calendar display
    - Appointment modal display by clicking on a date
    - Add, edit, and delete new appointments

💡 Customization - Theme colors can be managed at once in @/constants/color.ts - UI/logic separation under @/components/calendar/

📦 For developers - TypeScript based - ESLint & Prettier recommended - Animation implementation example with Framer Motion
