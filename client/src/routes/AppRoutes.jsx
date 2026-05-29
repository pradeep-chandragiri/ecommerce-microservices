import { Routes, Route } from 'react-router-dom'
import Products from '../pages/Products.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import ProductDetail from '../pages/ProductDetail.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import Cart from '../pages/Cart.jsx'
import Orders from '../pages/Orders.jsx'
import Profile from '../pages/Profile.jsx'
import PageNotFound from '../pages/PageNotFound.jsx'
import CreateOrder from '../pages/CreateOrder.jsx'

const AppRoutes = () => {
    return (
        <>
            <Routes>

                {/* public routes */}
                <Route path='/' element={ <Products /> } />
                <Route path='/login' element={ <Login /> } />
                <Route path='/register' element={ <Register /> } />
                <Route path='/products' element={ <Products /> } />
                <Route path='/products/:id' element={ <ProductDetail /> } />

                {/* protected routes */}
                <Route path='/cart' element={ <ProtectedRoute> <Cart /> </ProtectedRoute> } />
                <Route path='/orders' element={ <ProtectedRoute> <Orders /> </ProtectedRoute> } />
                <Route path='/orders/new' element={ <ProtectedRoute> <CreateOrder /> </ProtectedRoute> } />
                <Route path='/profile' element={ <ProtectedRoute> <Profile /> </ProtectedRoute> } />

                {/* not existing routes redirects to 404 */}
                <Route path='/*' element={ <PageNotFound /> } />

            </Routes>
        </>
    )
}

export default AppRoutes