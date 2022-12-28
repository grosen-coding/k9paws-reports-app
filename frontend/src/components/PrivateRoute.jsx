import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import {useAuthStatus} from '../hooks/useAuthStatus'
import Loading from './Loading'

const PrivateRoute = () => {
    const {loggedIn, checkLoading} = useAuthStatus()

    if(checkLoading) {
        return <Loading />
    }

  return loggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute