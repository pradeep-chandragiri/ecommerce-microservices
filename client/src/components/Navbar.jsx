import React, { use } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { images } from '../assets/assets.js'
import { useAuth } from '../hooks/useAuth.js'

const Navbar = () => {

    const { user } = useAuth()
    const navigate = useNavigate()

    return (
        <>
            <div className="navbar">
                <nav>
                    {/* nav left */}
                    <div className="cometLA">
                        {/* logo */}
                        <div className="cometLogo">
                            <img src={ images.Comet } alt="" />
                        </div>
                        {/* divider */}
                        <div className="cometDivider" />
                        {/* address */}
                        <div className="cometAddress">
                            <div className="mapIcon">
                                <span class="material-symbols-rounded">
                                    pin_drop
                                </span>
                            </div>
                            <div className="cometAddTxt">
                                <span className="cometAddLabel">Delivey to</span>
                                <p><b><NavLink>
                                    { user && 'Select address' }
                                </NavLink></b></p>
                            </div>
                        </div>
                    </div>
                    {/* nav right */}
                    <div className="cometKit">
                        { !user &&
                            <div className="cometBtns">
                                <div className="btn secondary" onClick={ () => { navigate('/login') } }>Login</div>
                                <div className="btn primary" onClick={ () => { navigate('/register') } }>Create account</div>
                            </div>
                        }
                        { user &&
                            <div className="cometProfile">
                                <div className="cometProfileIcon">
                                    <span class="material-symbols-rounded">
                                        sentiment_very_satisfied
                                    </span>
                                </div>
                                <div className="cometProfileInfo">
                                    <b>{ user.name }</b>
                                    <p>{ user.email && user.email }</p>
                                </div>
                            </div>
                        }
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar