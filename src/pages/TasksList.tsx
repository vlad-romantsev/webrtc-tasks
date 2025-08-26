import { useEffect, useState } from 'react'
import { fetchTasks } from '@/api/tasks'
import type { Task } from '@/types'
import TaskCard from '@/components/TaskCard'


export default function TasksList() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        let mounted = true;
        (async () => {
        try {
            const data = await fetchTasks(20);
            if (mounted) setTasks(data);
        } catch (e) {
            setError('Не удалось загрузить задачи')
        } finally {
        if (mounted) setLoading(false)
        }
        })()
        return () => { mounted = false }
    }, [])


    return (
        <div className="container py-6 space-y-4">
            <h1 className="text-2xl font-semibold mb-2">Список задач</h1>
            {loading && (
            <div className="card">Загрузка…</div>
            )}
            {error && (
            <div className="card text-red-600">{error}</div>
            )}
            {!loading && !error && tasks.length === 0 && (
            <div className="card">Нет задач</div>
            )}
            <div className="grid gap-3">
                {tasks.map(t => (
                <TaskCard key={t.id} task={t} />
                ))}
            </div>
        </div>  
    )
}