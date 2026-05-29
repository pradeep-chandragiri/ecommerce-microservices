import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { logout } from '../services/authService.js'

const Asidebar = () => {

    const navigate = useNavigate()
    const { user, setUser, setIsLoggedIn } = useAuth() 

    const handleLogout = async () => {
        const data = await logout()

        if (data.success) {
            setIsLoggedIn(false)
            setUser(null)
            navigate('/products')
        } else {
            console.log('Error at logged out!')
        }
    }

    return (
        <>
            <aside>
                <div className="menuTitlebar">
                    <h3>Menu</h3>
                </div>
                <div className="asidebarMenu">
                    <NavLink to='/products' className={ ({ isActive }) => isActive ? 'menuItem active' : 'menuItem' }>
                        <div className="menuItem three">
                            <div className="menuIcon">
                                <span class="material-symbols-rounded">
                                    shoppingmode
                                </span>
                            </div>
                            <div className="menuText">
                                <span className="menulabel">Products</span>
                                <span className="menubrief">Everything You Need, In One Place</span>
                            </div>
                        </div>
                    </NavLink>
                    <div className="menuItemWrapper">
                        <NavLink to='/orders' className={ ({ isActive }) => isActive ? 'menuItem active' : 'menuItem' }>
                            <div className="menuItem two">
                                <div className="menuIcon">
                                    <span class="material-symbols-rounded">
                                        package_2
                                    </span>
                                </div>
                                <div className="menuText">
                                    <span className="menulabel">Orders</span>
                                    <span className="menubrief">Made by You</span>
                                </div>
                            </div>
                        </NavLink>
                        <NavLink to='/cart' className={ ({ isActive }) => isActive ? 'menuItem active' : 'menuItem' }>
                            <div className="menuItem one">
                                <div className="menuIcon">
                                    <span class="material-symbols-rounded">
                                        local_mall
                                    </span>
                                </div>
                                <div className="menuText">
                                    <span className="menulabel">Cart</span>
                                    <span className="menubrief">Saved items</span>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    { user && 
                        <NavLink onClick={ handleLogout } className={ ({ isActive }) => isActive ? 'menuItem active' : 'menuItem' }>
                            <div className="menuItem threee one">
                                <div className="menuIcon">
                                    <span className="material-symbols-rounded">
                                        logout
                                    </span>
                                </div>
                                <div className="menuText">
                                    <span className="menulabel">Logout</span>
                                    <span className="menubrief">See You Again!</span>
                                </div>
                            </div>
                        </NavLink>
                    }
                </div>
            </aside>
        </>
    )
}

export default Asidebar