import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserDataContext } from '../context/UserData'
import Loader from '../components/loader/Loader'

export const accessLevels = {
    authenticated: 2,
    public: 1
}

export const RoleLocked = (props) => {
    let history = useHistory();
    let { isReady, userData, jwt } = useContext(UserDataContext)

    if (!isReady && !jwt) {
        // not ready and no cookie
        return (
            <Loader />
        )
    } else if (isReady && !jwt) {
        // ready and no cookie
        history.push("/login")
        return (<React.Fragment></React.Fragment>)
    } else if (isReady && jwt) {
        // ready with cookie
        if (userData.role === undefined || accessLevels[userData.role.type] < accessLevels[props.role]) {
            // not authorized
            if (props.else) {
                // unauthorized -> redirect
                history.push(props.else)
                return (<React.Fragment></React.Fragment>)
            } else {
                // blank return for component usage
                return (<React.Fragment></React.Fragment>)
            }
        } else {
            // authorized
            return (<React.Fragment>{props.children}</React.Fragment>)
        }
    } else {
        return (<Loader />)
    }
}

export default RoleLocked;