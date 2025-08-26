import type { Task } from '@/types'


interface JsonPlaceholderTodo {
    userId: number
    id: number
    title: string
    completed: boolean
}


const toTask = (t: JsonPlaceholderTodo): Task => ({
    id: t.id,
    title: t.title,
    status: t.completed ? 'done' : 'open',
})


export async function fetchTasks(limit = 20): Promise<Task[]> {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = (await res.json()) as JsonPlaceholderTodo[]
        return data.map(toTask)
    } catch (e) {
        const fallback: Task[] = [
        { id: 1, title: 'Local mock: prepare demo', status: 'open' },
        { id: 2, title: 'Local mock: write README', status: 'done' },
        ]
        return fallback
    }
}


export async function fetchTask(id: number): Promise<Task | null> {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        if (!res.ok) return null;
        const data = (await res.json()) as JsonPlaceholderTodo;
        return toTask(data);
    } catch {
        return null;
    }
}