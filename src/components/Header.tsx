import { Link, NavLink } from 'react-router-dom'


export default function Header() {
    const linkBase = 'px-3 py-2 rounded-xl hover:bg-gray-100'
    const linkActive = 'bg-gray-200'

    return (
        <header className="border-b bg-white">
            <div className="container flex items-center justify-between py-3">
                <Link to="/" className="text-xl font-semibold">Tasks + WebRTC</Link>
                <nav className="flex items-center gap-2">
                    <NavLink 
                        to="/tasks" 
                        className={({isActive}) => `${linkBase} ${isActive ? linkActive : ''}`}
                    >
                        Список задач
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}