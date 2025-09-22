import { Link, Outlet } from 'react-router-dom'
import ColorPicker from './ColorPicker';
import {useState} from 'react'
export default function Dashboard() {
 const [accentColor, setAccentColor] = useState("#2563eb"); // default blue

  return (
    <div className="p-6 bg-gray-50 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>

      {/* ✅ Color picker */}
      <div className="mb-6">
        <h3 className="mb-2 font-semibold">Choose Accent Color:</h3>
        <ColorPicker value={accentColor} onChange={setAccentColor} />
      </div>

      {/* ✅ Navigation with accent */}
      <nav className="space-x-4" style={{ color: accentColor}}>
        <Link to="">Home</Link>
        <Link to="settings">Settings</Link>
        <Link to="reports">Reports</Link>
      </nav>

      <div className="mt-4 border-t pt-4">
        <Outlet />
      </div>
    </div>
  );
}
