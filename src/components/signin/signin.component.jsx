import React, { Component } from 'react';
import { connect } from 'react-redux';

import './signin.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

class SignIn extends Component {


    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { emailSignInStart } = this.props;
        const { email, password } = this.state;

        emailSignInStart(email, password);
    }

    handleChange = (event) => {
        const { value, name } = event.target;

        this.setState({ [name]: value })
    }

    render() {
        const { googleSignInStart, emailSignInStart } = this.props;
        return (
            <div className='sign-in'>
                <h2>I already have an Account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email'
                        type='email'
                        value={this.state.email}
                        label="email"
                        required
                        handleChange={this.handleChange}
                    />

                    <FormInput name='password'
                        type='password'
                        value={this.state.password}
                        label="password"
                        required
                        handleChange={this.handleChange} />

                    <div className='buttons'>
                        <CustomButton type='submit' onClick={this.handleSubmit}>Sign in</CustomButton>
                        <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>Sign in with Google</CustomButton>
                    </div>

                </form>
            </div>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);