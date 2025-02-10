# 📝 1840 Task Manager Application

A dynamic and interactive task management application built with **React, TypeScript, and Vite.js**. This app allows users to **add, edit, delete, filter, and search tasks** while maintaining a responsive and optimized user experience.

## 🚀 Features

### ✅ Task Management

- Create, edit, and delete tasks.
- Tasks have a **title, description, due date, priority** (low, medium, high), and **status** (to-do, in-progress, done).
- View task details in a modal or separate component.
- Update task status and priority from the detailed view.
- Persist tasks using **local storage** (or an API if configured).

### 🔍 Filtering, Sorting & Search

- Filter tasks by **status** and **priority**.
- Search tasks by **title or description**.
- Sort tasks by **due date and priority**.

### ⚡ Performance Optimizations

- Uses **React.memo** and **useCallback** to minimize re-renders.
- Implements **custom hooks** for reusable logic.

### 🎨 UI & Accessibility

- Fully **responsive** across devices.
- Built with **semantic HTML** and **ARIA attributes** for accessibility.
- Uses **CSS modules** or **CSS-in-JS** for styling.

### 🛠️ State Management

- Uses a **React state management library** for efficient state handling.
- Ensures optimized state updates and prevents unnecessary re-renders.

### 🐛 Error Handling

- Implements **error boundaries** to catch UI crashes.
- Displays error messages for failed actions (e.g., adding or deleting tasks).

### 🧪 Testing

- Unit tests for core components and custom hooks using **Jest**.
- Ensures coverage for edge cases and error scenarios.

### 🏆 Bonus Features

- **Drag-and-drop** for task ordering.
- **Dark mode** support.
- **Keyboard shortcuts** for quick task management.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite.js
- **State Management**: Context API or Zustand
- **Styling**: CSS Modules / Tailwind CSS
- **Testing**: Jest & React Testing Library

## 📦 Installation

## Frontend Setup (Vite)

1. Clone the repository:

   ```bash
   https://github.com/Omarookolosio94/1840task.mg
   ```

2. Navigate to the frontend directory

   ```bash
   cd 1840task.mg
   ```

3. Install the necessary dependencies using `npm`:

   ```bash
   npm install
   ```

4. Start the Vite development server:

   ```bash
   npm run dev
   ```

   The Vite server will start, and you should see output like:

   ```bash
   VITE v2.x.x  ready in 123 ms
   Local: http://localhost:5173/
   Network: use --host to expose
   ```

5. Open your browser and navigate to `http://localhost:5173/` to access the frontend.
