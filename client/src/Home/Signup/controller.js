//SignUp Controller
import { createAction, handleActions } from 'redux-actions';

const AUTH_REGISTER = "AUTH_REGISTER";
const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS";
const AUTH_REGISTER_FAILURE = "AUTH_REGISTER_FAILURE";

/* 회원가입 나중에 createAction으로 바꾸기*/

export function registerRequest(username, password) {
    return (dispatch) => {
        //회원가입 API 시작 알림
        dispatch(register());
        //endpoint 백앤드보고 확인해야함
        return axios.post('/api/signup', { username, password })
        .then((response) => {
            dispatch(registerSuccess());
        }).catch((error) => {
            dispatch(registerFailure(error.response.data.code));
        });
    };
}

export function register() {
    return {
        type: AUTH_REGISTER
    }
}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS
    }
}

export function registerFailure(error) {
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    }
}

const initialState = {
    login: {
        status: 'INIT'
    },
    register: {
        status: 'INIT',
        error: -1
    },
    status: {
        isLoggedIn: false,
        currentUser: '',
    }
};

export default function authentication(state, action) {
    //코드
}