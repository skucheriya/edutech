export const storeUser = (data) => dispatch => {
    dispatch({
     type: 'STORE_USER',
     payload: data
    })
   }