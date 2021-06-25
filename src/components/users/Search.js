import React, { useState, useContext } from 'react';

import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = (props) => {

    const githubContext = useContext(GithubContext)
    const alertContext = useContext(AlertContext)

    const [text, setText] = useState('')

    const changeHandler = (e) => {
        setText(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()

        if(text === ''){
            alertContext.setAlertAction('Please enter something', 'light')
        }
        else{
            githubContext.searchUsersAction(text)
    
            setText('')
        }

    }

    return (
        <div>
            <form onSubmit={ submitHandler } className="form" >
                <input 
                 type="text"
                 name="text"
                 placeholder="Search Users..."
                 value={text}
                 onChange={ changeHandler }
                />

                <input 
                 type="submit"
                 value="Search"
                 className="btn btn-dark btn-block"
                />
            </form>

            {
                githubContext.users.length > 0 && (
                    <button onClick={ githubContext.clearUsers } className="btn btn-light btn-block" >
                        Clear
                    </button>
                )
            }

        </div>
    )
}

export default Search;
