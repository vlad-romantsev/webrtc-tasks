import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchTask } from '@/api/tasks'
import type { Task } from '@/types'
import VideoPlayer from '@/components/VideoPlayer'
import { Mic, MicOff } from 'lucide-react'

export default function VideoRoom() {
  const { id } = useParams()
  const taskId = useMemo(() => Number(id), [id])

  const [task, setTask] = useState<Task | null>(null)
  const [loadingTask, setLoadingTask] = useState(true)

  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      if (!Number.isFinite(taskId)) return
      const t = await fetchTask(taskId)
      if (mounted) setTask(t)
      if (mounted) setLoadingTask(false)
    })()
    return () => {
      mounted = false
    }
  }, [taskId])

  useEffect(() => {
    let active = true
    const start = async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        if (!active) {
          s.getTracks().forEach(t => t.stop())
          return
        }
        setStream(s)
      } catch (e) {
        setError('Нет доступа к камере/микрофону или устройство не поддерживается.')
      }
    }
    start()

    return () => {
      active = false
      if (stream) {
        stream.getTracks().forEach(t => t.stop())
      }
    }
  }, [])

  const toggleMute = () => {
    if (!stream) return
    const audioTracks = stream.getAudioTracks()
    if (audioTracks.length === 0) return
    const nextMuted = !isMuted
    audioTracks.forEach(t => (t.enabled = !nextMuted))
    setIsMuted(nextMuted)
  }

  return (
    <div className="container py-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Видео-комната</h1>
        <Link to="/tasks" className="btn">← Назад к задачам</Link>
      </div>

      {loadingTask ? (
        <div className="card">Загрузка задачи…</div>
      ) : task ? (
        <div className="card flex items-center gap-4">
          <div className="text-sm text-gray-500 w-12">#{task.id}</div>
          <div className="font-medium">{task.title}</div>
          <span className={`badge ${task.status === 'done' ? 'badge-done' : 'badge-open'}`}>
            {task.status}
          </span>
        </div>
      ) : (
        <div className="card text-amber-700">Задача не найдена</div>
      )}

      <div className="card space-y-4">
        <VideoPlayer stream={stream} />

        <div className="flex items-center gap-3">
          <button className="btn" onClick={toggleMute} disabled={!stream}>
            {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
          {!stream && !error && (
            <span className="text-sm text-gray-500">Запрашиваем доступ к устройствам…</span>
          )}
          {error && (
            <span className="text-sm text-red-600">{error}</span>
          )}
        </div>
      </div>
    </div>
  )
}
