import React from 'react'
import { useParams } from 'react-router-dom'

function JobCard() {
    const params = useParams()


  return (
    <div>JobCard : {params.jobid} </div>
  )
}

export default JobCard