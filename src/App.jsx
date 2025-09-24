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
import Counter from './pages/Counter'
import { CartProvider } from './context/CartContext'
import ShopPage from './pages/Shop'
import CartPage from './pages/Cart'
import ProductList from './pages/cart/ProductList'
import CartS from './pages/cart/CartS'

const About = lazy(() => import('./pages/About'));

function App() {
  const navStyle = ({ isActive }) =>
    isActive
      ? 'text-white bg-blue-600 px-3 py-1 rounded'
      : 'text-blue-600 hover:underline px-3 py-1'

  return (
    <>
      <CartProvider>
        <div className="font-sans">
          <header className="bg-gray-100 p-4 flex gap-4">
            <NavLink to='/' className={navStyle}>Home</NavLink>
            <NavLink to='/about' className={navStyle}>About</NavLink>
            <NavLink to='/contact' className={navStyle}>Contact</NavLink>
            <NavLink to='/users' className={navStyle}>User List</NavLink>
            {/* <NavLink to='/user/43' className={navStyle}>User 43</NavLink> */}
            <NavLink to='/dashboard' className={navStyle}>Dashoard</NavLink>
            <NavLink to='/counter' className={navStyle}>Counter</NavLink>
            <NavLink to='/shop' className={navStyle}>Shop</NavLink>
            <NavLink to='/productlist' className={navStyle}>Product List</NavLink>
            <NavLink to='/carts' className={navStyle}>Cart S</NavLink>
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
              <Route path="/counter" element={<Counter />} />
              <Route path="/dashboard" element={<Dashboard />}>
                {/* ✅ Children routes */}
                <Route index element={<p>👋 Welcome to the dashboard!</p>} />
                <Route path="settings" element={<PrivateRoute>
                  <Settings />
                </PrivateRoute>} />
                <Route path="reports" element={<Reports />} />
              </Route>
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/productlist" element={<ProductList />} />
              <Route path="/carts" element={<CartS />} />
              <Route path="*" element={<p className="text-red-600">404: Page not found</p>} />

            </Routes>
          </main>
        </div>
      </CartProvider>
    </>
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