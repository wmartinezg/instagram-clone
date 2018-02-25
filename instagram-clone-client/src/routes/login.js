import React from 'react';
import {Grid, Image} from 'semantic-ui-react'; // para utilizar el elemento Grid (permite hacer maquetacion) de la libreria de semantic
import {graphql} from 'react-apollo';

//Utils
import queries from '../utils/queries.js';
//Components
import Signin from './login/Signin.js';
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
    }
    showRegister = (ev)=>{
        ev.preventDefault()
        this.setState({showLogin:false,showRegister:true, showLostPassword:false})
    }
    showLogin = (ev)=>{
        ev.preventDefault()
        this.setState({showLogin:true,showRegister:false, showLostPassword:false})
    }
    handleLogin = (ev, args)=>{
        console.log(args);
    }
    handleRegister = async (ev, args)=>{
        console.log(args);
        const response = await this.props.mutate({
            variables: args
        })
        console.log('Graphql reaponse:', response);
    }

    render(){
        //showLostPassword
        const {showLogin, showRegister} = this.state;

        return (
            <Grid  verticalAlign='middle' columns={2} centered style={styles.grid}>
                <Grid.Row>
                    <Grid.Column>
                        <img src="images/phone.png" />
                    </Grid.Column>
                    <Grid.Column>
                        {showLogin && <Signin styles={styles} handleClick={this.showRegister} handleSubmit={this.handleLogin} /> }
                        {showRegister && <Signup styles={styles} handleClick={this.showLogin} handleSubmit={this.handleRegister} /> }
                        {/* {showLostPassword && <LostPassword styles={styles} /> } */}
                    </Grid.Column>
                    </Grid.Row>
            </Grid>
        )
    }
}

export default graphql(queries.mutation.createUser)(Login)