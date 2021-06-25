import React, { useReducer } from 'react';
import axios from 'axios';

import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS } from '../types';


let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production'){
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
}
else{
    githubClientId = process.env.GITHUB_CLIENT_ID
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET 
}

 
const GithubState = (props) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false 
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    const getRandomUsersAction = async () => {
        setLoading()

        const { data } = await axios.get(`https://api.github.com/users?client_id=${githubClientId}&client_secret=${githubClientSecret}`)
    
        dispatch({
            type: 'GET_RANDOM_USERS',
            payload: data
        })
    }

    //Search Users
    const searchUsersAction = async (userValue) => {
        setLoading()

        const { data } = await axios.get(`https://api.github.com/search/users?q=${userValue}&client_id=${githubClientId}&client_secret=${githubClientSecret}`)

        dispatch({
            type: SEARCH_USERS,
            payload: data.items
        })

    }

    //get single github user 
    const getUserAction = async (username) => {
        setLoading()

        const { data } = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`)

        dispatch({
            type: GET_USER,
            payload: data
        })

    }

    
    //get github user Repos
    const getReposAction = async (username) => {
        setLoading()

        const { data } = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`)

        dispatch({
            type: GET_REPOS,
            payload: data
        })

    }

    //clear users from state
    const clearUsers = () => {
        dispatch({ type: CLEAR_USERS })
    }

    //Set Loading
    const setLoading = () => {
        dispatch({ type: SET_LOADING })
    }


    return(
        <GithubContext.Provider
         value={{
             users: state.users,
             user: state.user,
             repos: state.repos,
             loading: state.loading,
             getRandomUsersAction,
             searchUsersAction,
             clearUsers,
             getUserAction,
             getReposAction
         }}
        >
            { props.children }
        </GithubContext.Provider>
    )
}

export default GithubState;