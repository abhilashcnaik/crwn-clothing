import React from 'react';

import './sign-in-and-sign-up.styles.scss'

import SignIn from '../../components/signin/signin.component';

const SignInAndSignUpPage = () => {
    return (
        <div className='sign-in-and-sign-up'>
            <SignIn />
        </div>
    )
}

export default SignInAndSignUpPage;