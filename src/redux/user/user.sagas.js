import { takeLatest, put, all, call } from "@redux-saga/core/effects";
import UserActionTypes from "./user.types";

import { auth, googleProvider, createUserProfileDocument } from "../../firebase/firebase.utils";

import { googleSignInSuccess, googleSignInFailure, emailSignInSuccess, emailSignInFailure } from "./user.actions";


export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();

        yield put(googleSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(googleSignInFailure(error));
    }
}

export function* signInWithEmail({payload: {email, password}}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();

        yield put(emailSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
        
    } catch (error) {
        console.log(error);
        yield put(emailSignInFailure(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGNIN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGNIN_START, signInWithEmail);
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart)])
}