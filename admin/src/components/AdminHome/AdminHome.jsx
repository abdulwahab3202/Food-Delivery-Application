import React from 'react'
import './AdminHome.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faList } from '@fortawesome/free-solid-svg-icons'

const AdminHome = () => {
  return (
    <div className="admin-home">
      <Link to='/add'><div className="admin-home-container">
        <p>Add food</p>
        <FontAwesomeIcon icon={ faPlus } className='icon'/>
      </div></Link>
      <Link to='/list'><div className="admin-home-container">
        <p>List food</p>
        <FontAwesomeIcon icon={ faList } className='icon'/>
      </div></Link>
    </div>
  )
}

export default AdminHome