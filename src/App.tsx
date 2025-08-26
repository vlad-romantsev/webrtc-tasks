import { Navigate, Route, Routes } from 'react-router-dom'
import Header from '@/components/Header'
import TasksList from '@/pages/TasksList'
import VideoRoom from '@/pages/VideoRoom'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="/tasks" element={<TasksList />} />
          <Route path="/tasks/:id" element={<VideoRoom />} />
          <Route path="*" element={<Navigate to="/tasks" replace />} />
        </Routes>
      </main>
    </div>
  )
}
