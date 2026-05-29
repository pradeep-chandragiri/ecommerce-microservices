import React from 'react'
import { Link } from 'react-router-dom'
import { images } from '../assets/assets.js'

const Footer = () => {
    return (
        <>
            <footer>
                <div className="footerContainer">
                    <div className="footerContent">
                        <div className="footerContentBrand">
                            <div className="brandImg">
                                <img src={ images.Comet } alt="" />
                            </div>
                        </div>
                        <div className="footerContentServices">
                            <h4>Services</h4>
                            <p><Link>User management</Link></p>
                            <p><Link>Products</Link></p>
                            <p><Link>Cart</Link></p>
                            <p><Link>Orders</Link></p>
                        </div>
                        <div className="footerContentQuicks">
                            <h4>Quick Links</h4>
                            <p><Link>Registration</Link></p>
                            <p><Link>Login</Link></p>
                            <p><Link>Profile</Link></p>
                            <p><Link>Products</Link></p>
                        </div>
                        <div className="footerContentContact">
                            <h4>Contact Us</h4>
                            <p><Link>thekerno.hq@gmail.com</Link></p>
                            <p><Link>+91 9989781156</Link></p>
                        </div>
                    </div>
                    <div className="footerCopyright">
                        <div className="copyrightMsg">
                            <span>Copyright &copy; 2026 Comet. All Rights Reserved.</span>
                        </div>
                        <div className="supportingLinks">
                            <span>
                                <Link to='http://www.github.com/pradeep-chandragiri' target='_blank'>GitHub</Link>
                            </span>
                            <span>
                                <Link to='https://www.linkedin.com/in/pradeep-chandragiri/' target='_blank'>LinkedIn</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer