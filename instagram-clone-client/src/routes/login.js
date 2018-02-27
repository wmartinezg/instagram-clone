import React from 'react';
import {Grid, Image} from 'semantic-ui-react'; // para utilizar el elemento Grid (permite hacer maquetacion) de la libreria de semantic
import {graphql, compose} from 'react-apollo'; //compose es un metodo de react-apollo que permite llamar
                                                //mas de una mutation o query

//Utils
import queries from '../utils/queries.js';
//Components
import Signin from './login/Signin.js'; //no deberia necesitar el .js pero si no lo hago esta sacando error
import Signup from './login/Signup.js';
//import LostPassword from './login/LostPassword.js ';

const styles={
    grid: {
        height: '100%',
        width: '900px',
        margin: '0 auto',
    },
    box:{
        backgroundColor: 'white',
        width: '1px solid #e6e6e6',
        textAlign: 'center',
        marginBottom: '1em',
        padding: '1em',
    }
}

class Login extends React.Component{
    state={
        showLogin:true,
        showRegister:false,
        showLostPassword:false,
        argsSignup: {},
        errorSignup: [],
        argsSignin: {},
        errorSignin: [],
    }
    showRegister = (ev)=>{
        ev.preventDefault()
        this.setState({showLogin:false,showRegister:true, showLostPassword:false})
    }
    showLogin = (ev)=>{
        ev.preventDefault()
        this.setState({showLogin:true,showRegister:false, showLostPassword:false})
    }
    handleLogin = async (ev, args)=>{
        console.log(args);
        const response = await this.props.login({
            variables: args
        })
        const {errors, success, token} = response.data.login;
        if(!success){
            this.setState({errorSignin:errors})
        }else{
            localStorage.setItem('token', token)
            this.props.history.push("/")
        }
    }
    handleRegister = async (ev, args)=>{
        console.log(args);
        const response = await this.props.createUser({
            variables: args
        })
        const {errors, success} = response.data.createUser;
        if(!success){
            this.setState({errorSignup:errors})
        }else{
            this.props.history.push("/")
        }
    }
    handleChange = (ev, input)=>{
        const argsSignup = this.state.argsSignup
        argsSignup[input.name] = input.value
        this.setState({argsSignup})
    }
    handleChangeSignIn = (ev, input)=>{
        const argsSignin = this.state.argsSignin
        argsSignin[input.name] = input.value
        this.setState({argsSignin})
    }
    render(){
        //showLostPassword
        const {showLogin, showRegister, argsSignup, errorSignup, argsSignin, errorSignin} = this.state;

//<img src='./images/phone.png' alt="phone" />
        return (
            <Grid  verticalAlign='middle' columns={2} centered style={styles.grid}>
                <Grid.Row>
                    <Grid.Column>
                        <Image src="images/phone.png" fluid />
                    </Grid.Column>
                    <Grid.Column>
                        {showLogin && <Signin styles={styles} handleClick={this.showRegister} handleSubmit={this.handleLogin} handleChange={this.handleChangeSignIn} args={argsSignin} errors={errorSignin} /> }
                        {showRegister && <Signup styles={styles} handleClick={this.showLogin} handleSubmit={this.handleRegister} handleChange={this.handleChange} args={argsSignup} errors={errorSignup} /> }
                        {/* {showLostPassword && <LostPassword styles={styles} /> } */}
                    </Grid.Column>
                    </Grid.Row>
            </Grid>
        )
    }
}

export default compose(
    graphql(queries.mutation.login,{name:'login'}),
    graphql(queries.mutation.createUser,{name:'createUser'}),
)(Login)