import { lazy, Suspense } from 'react'
import { useSelector } from "react-redux"
import { Navigate, NavLink, Route, Routes, useNavigate } from 'react-router'
import './App.css'
import { CartProvider } from './context/CartContext'
import CartPage from './pages/Cart'
import CartS from './pages/cart/CartS'
import ProductList from './pages/cart/ProductList'
import Contact from './pages/Contact'
import Counter from './pages/Counter'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import ShopPage from './pages/Shop'
import UserDetail from './pages/UserDetail'
import UsersList from './pages/UsersList'
import Login from './pages/Login'
import AddProduct from './pages/cart/AddProduct'
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
            <NavLink to='/login' className={navStyle}>Login</NavLink>
            <NavLink to='/about' className={navStyle}>About</NavLink>
            <NavLink to='/contact' className={navStyle}>Contact</NavLink>
            <NavLink to='/users' className={navStyle}>User List</NavLink>
            {/* <NavLink to='/user/43' className={navStyle}>User 43</NavLink> */}
            <NavLink to='/dashboard' className={navStyle}>Dashoard</NavLink>
            <NavLink to='/counter' className={navStyle}>Counter</NavLink>
            <NavLink to='/shop' className={navStyle}>Shop</NavLink>
            <NavLink to='/productlist' className={navStyle}>Product List</NavLink>
            <NavLink to='/addProduct' className={navStyle}>add product</NavLink>
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
              <Route path="/login" element={<Login />} />
              <Route
                path="/cart"
                element={
                  <ReduxPrivateRoute>
                    <CartPage />
                  </ReduxPrivateRoute>
                }
              />
              <Route path='/addProduct' element={ <AddProduct/> } />
              <Route path="/productlist" element={
                <ReduxPrivateRoute>
                  <ProductList />
                </ReduxPrivateRoute>
              } />
              <Route path="/carts" element={<ReduxPrivateRoute>
                <CartS />
              </ReduxPrivateRoute>} />
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

function ReduxPrivateRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
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