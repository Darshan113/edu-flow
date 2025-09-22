import { Link, Outlet } from 'react-router-dom'
import Timer from './UseEffectEx'

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-50 rounded shadow">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <nav className="mt-3 space-x-4">
        <Link to="settings" className="text-blue-600">Settings</Link>
        <Link to="reports" className="text-blue-600">Reports</Link>
      </nav>
      <div className="mt-4">
        <Timer></Timer>
        <Outlet />
      </div>
    </div>
  )
}
