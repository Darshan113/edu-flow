import React, { useEffect, useState, useMemo, useCallback, useRef, useReducer, createContext, useContext, lazy, Suspense } from 'react'
import './App.css'
import { Routes, Route, NavLink, useNavigate, Navigate } from 'react-router'
import Home from './pages/Home'
import Contact from './pages/Contact'
import User from './pages/User'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Reports from './pages/Reports'
import UsersList from './pages/UsersList'
import UserDetail from './pages/UserDetail'

const About = lazy(() => import('./pages/About'));

function App() {
  const navStyle = ({ isActive }) =>
    isActive
      ? 'text-white bg-blue-600 px-3 py-1 rounded'
      : 'text-blue-600 hover:underline px-3 py-1'

  return (
    <div className="font-sans">
      <header className="bg-gray-100 p-4 flex gap-4">
        <NavLink to='/' className={navStyle}>Home</NavLink>
        <NavLink to='/about' className={navStyle}>About</NavLink>
        <NavLink to='/contact' className={navStyle}>Contact</NavLink>
        <NavLink to='/users' className={navStyle}>User List</NavLink>
        {/* <NavLink to='/user/43' className={navStyle}>User 43</NavLink> */}
        <NavLink to='/dashboard' className={navStyle}>Dashoard</NavLink>
      </header>
      <main className="p-6">
        <GoHome />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Suspense fallback={<p>Loading---</p>}>
            <About />
          </Suspense>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/dashboard" element={<Dashboard />}>
            {/* ✅ Children routes */}
            <Route index element={<p>👋 Welcome to the dashboard!</p>} />
            <Route path="settings" element={<PrivateRoute>
              <Settings />
            </PrivateRoute>} />
            <Route path="reports" element={<Reports />} />
          </Route>
          <Route path="*" element={<p className="text-red-600">404: Page not found</p>} />

        </Routes>
      </main>
    </div>
  )
}

function PrivateRoute({ children }) {
  const isAuth = true; // change to true to simulate login
  return isAuth ? children : <Navigate to="/" replace />;
}

function GoHome() {
  const navigate = useNavigate();
  return (
    <button
      className="bg-blue-500 text-white px-3 py-1 rounded"
      onClick={() => navigate('/')}
    >
      Go Home
    </button>
  )
}

export default App;