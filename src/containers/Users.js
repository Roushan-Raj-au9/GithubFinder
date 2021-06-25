import { useContext, useEffect } from 'react';
// import PropTypes from 'prop-types';

import DisplayUsers from '../components/users/DisplayUsers';
import Spinner from '../components/Spinner';


import GithubContext from '../context/github/githubContext';

const Users = () => {

    const githubContext = useContext(GithubContext)

    const { loading, users } = githubContext

    useEffect( () => {
        githubContext.getRandomUsersAction()
        // eslint-disable-next-line
    }, [])

    return (
        loading ? <Spinner /> 
        : 
        <div style={ userStyle } >
            {
                users.map( (item) => (
                    <DisplayUsers userData={item} key={item.id} />
                ))
            }
        </div>
    )
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

// Users.propTypes = {
//     users: PropTypes.array.isRequired,
//     loading: PropTypes.bool.isRequired
// }

export default Users;
