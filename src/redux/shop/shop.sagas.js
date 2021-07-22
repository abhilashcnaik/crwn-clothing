import { firestore, collectCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { fetchCollectionsSuccess, fetchCollectionsFailure } from "./shop.actions";
import { call, takeEvery, put } from "@redux-saga/core/effects";

import ShopActionTypes from "./shop.types";
import { all } from "redux-saga/effects";

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(collectCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap))
    }catch (error) {
        yield put(fetchCollectionsFailure(error))
    }
}

export function* fetchCollectionsStart() {
    yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)]);
}