import { Link } from 'react-router-dom'
import type { Task } from '@/types'


interface Props { task: Task }


export default function TaskCard({ task }: Props) {
    const badgeClass = task.status === 'done' ? 'badge badge-done' : 'badge badge-open'
    const badgeText = task.status === 'done' ? 'done' : 'open'

    return (
        <div className="card flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500 w-12">#{task.id}</div>
                <div>
                    <div className="font-medium">{task.title}</div>
                    <div className={badgeClass}>{badgeText}</div>
                </div>
            </div>
            <Link 
                to={`/tasks/${task.id}`} 
                className="btn btn-primary"
            >
                Видео-комната</Link>
        </div>
    )
}