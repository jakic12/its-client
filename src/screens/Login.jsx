import React, { Component } from 'react'
import '../scss/screens/Login.scss'

import LoginCard from '../components/LoginCard'

class Login extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return <div className="loginContainer">
            <LoginCard />
        </div>
    }
}

export default Login;