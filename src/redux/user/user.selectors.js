// selectors are used to maintain the state so that the component is not rerendered when state does not change
import { createSelector } from "reselect";

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
)