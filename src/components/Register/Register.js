import React from "react";

const PROTOCOL = process.env.PROTOCOL ?? 'http';
const HOST = process.env.HOST ?? 'localhost' ;
const PORT = process.env.PORT ?? '3000';
const ROOT = `${PROTOCOL}://${HOST}:${PORT}`;

class Register extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pswd: '',
            name: ''
        };
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }
    onPswdChange = (event) => {
        this.setState({pswd: event.target.value});
    }
    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onSubmitRegister = () => {
        fetch(`${ROOT}/register`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.pswd,
                        name: this.state.name
                        })
        })
            .then(response=> {
                if (response.status !== 200) {
                    return('Registration Failed');
                } else {
                    return response.json()
                }
        })
            .then(data => {
                if(data.id) {
                    this.props.loadUser(data);
                    this.props.onRouteChange('home');        
                } else {
                    this.props.onRouteChange('registration');
                    alert(data);
                }
        });
    }

   render() {
        const {onRouteChange} = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center"> 
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="full-name">Name</label>
                            <input 
                                onChange={this.onNameChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="full-name" 
                                id="full-name"
                                required />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                onChange={this.onEmailChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                required />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                onChange={this.onPswdChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                required />
                        </div>
                        </fieldset>
                        <div className="">
                            <input  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit"
                                onClick={this.onSubmitRegister}
                                value="Register" />
                        </div>
                        <div className="lh-copy mt3">
                          <p onClick={() => onRouteChange('signin')} className="f6 link dim black db pointer">Sign In</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;