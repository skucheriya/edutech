const userReducer = (state = {user:localStorage.getItem('user')!==undefined?JSON.parse(localStorage.getItem('user')):{}}, action) => {
    switch (action.type) {
    case 'STORE_USER':{
        localStorage.setItem('user',JSON.stringify(action.payload))  
        return {
          user: action.payload,
        };
    }
     default:
        return state
    }
   }
export default userReducer
