import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils'

import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import { connect } from 'react-redux';

const Header = ({ currentUser }) => {
    console.log(currentUser);
    return (
        <div className='header'>
            <Link to='/' className='logo-container'>
                <Logo className='logo' />
            </Link>
            <div className='options'>
                <Link to='/shop' className='option' >
                    SHOP
                </Link>
                <Link to='/shop' className='option' >
                    CONTACT
                </Link>
                {
                    currentUser ?
                        <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                        :
                        <Link className='option' to='/signin'>
                            SIGN IN
                        </Link>
                }

            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
})

//connecting props coming from reducer here
export default connect(mapStateToProps)(Header);