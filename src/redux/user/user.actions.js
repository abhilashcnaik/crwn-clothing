import UserActionTypes from "./user.types"

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})

export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGNIN_START
})

export const signInSuccess = (user) => ({
    type: UserActionTypes.SIGNIN_SUCCESS,
    payload: user
})

export const signInFailure = (error) => ({
    type: UserActionTypes.SIGNIN_FAILURE,
    payload: error
})

export const emailSignInStart = emailAndPassword => ({
    type: UserActionTypes.EMAIL_SIGNIN_START,
    payload: emailAndPassword
})