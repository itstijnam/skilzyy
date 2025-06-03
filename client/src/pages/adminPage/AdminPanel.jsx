import React from 'react'
import PendingJobs from './components/PendingJobs'
import LiveJobs from './components/LiveJobs'
import './style/AdminPanel.scss'

function AdminPanel() {
  return (

    <div>
        <h2>Admin Panel</h2>
        <PendingJobs/>

        <LiveJobs/>
    </div>
  )
}

export default AdminPanel