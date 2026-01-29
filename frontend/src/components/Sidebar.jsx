import React from 'react'
import useAuthUser from '../hooks/useAuthUser'

const Sidebar = () => {
    const { authUser } = useAuthUser()
    return (
        <div>Sidebar</div>
    )
}

export default Sidebar