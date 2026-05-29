import React from 'react'
import AppRoutes from './routes/AppRoutes.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Asidebar from './components/Asidebar.jsx'

const App = () => {
    return (
        <>
            <div className="appContainer">
                <Navbar />
                <main>
                    <Asidebar />
                    <div className="componentRender">
                        <AppRoutes />
                    </div>
                </main>
                <Footer />
            </div>
        </>
    )
}

export default App