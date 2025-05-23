import React from 'react'
import './styles/Layout.scss'
import Header from '../../messagePage/components/Header'
import { Outlet, useNavigate } from 'react-router-dom'

function Layout() {

    const navigate = useNavigate();

    const layoutNav = [
        { icon: '', text: 'Hire', url: '' },
        { icon: '', text: 'Enterprise', url: '' },
        // { icon: '', text: 'Project', url: '' },
        // { icon: '', text: 'Talent', url: '' },
    ]
    
    const navHandler = (text)=>{
        if(text === 'Hire'){
            navigate('')
        } else if(text === 'Enterprise'){
            navigate('enterprise')
        } else if(text === 'Project'){
            navigate('projects')
        } else if(text === 'Talent'){
            navigate('talents')
        }
    }

    return (
        <div className='layout_container'>
                <Header />
                       <span onClick={()=>navigate(-1)}> ⮜ </span>
            <div className='main-layout'>
                <div className='side-bar'>
                    <ul className="sideUl">
                        {layoutNav.map((l,i)=>(
                            <li key={i} onClick={()=>navHandler(l.text)} >{l.text}</li>
                        ))}
                    </ul>
                </div>
                <div className='content_box'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout