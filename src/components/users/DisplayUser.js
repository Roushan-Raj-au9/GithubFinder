import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import Repos from '../../containers/Repos';
import Spinner from '../Spinner';

import GithubContext from '../../context/github/githubContext';

const DisplayUser = ({ match }) => {

    const githubContext = useContext(GithubContext)

    const { getUserAction, loading, user, repos, getReposAction } = githubContext;

    const { name, company, avatar_url, location, bio, blog, login, html_url, followers, following, public_repos, public_gists, hireable } = user


    useEffect( () => {
        getUserAction(match.params.login)
        getReposAction(match.params.login)

        // eslint-disable-next-line
    }, [])
 
    return (
         loading ? <Spinner />
         :
        <>
            <Link to='/' className="btn btn-light" >
                Go Back To Search
            </Link>
            Hireable:{' '}
            {
                hireable ? <i className="fas fa-check text-success"></i> : <i className="fas fa-times text-danger"></i>
            }
            <div className="card grid-2" >
                <div className="all-center" >
                    <img 
                     src={avatar_url}
                     className="round-img"
                     alt="pimg"
                     style={{ width: "150px" }}
                    />
                    <h1>{ name }</h1>
                    <p>Location: { location }</p>
                </div>

                <div>
                    {
                        bio && (
                            <>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </>
                        )
                    }
                    <a href={html_url} target="_blank" rel="noreferrer" className="btn btn-dark my-1" >
                        Visit Github Profile
                    </a>

                    <ul>
                        <li>
                            {
                                login && (
                                    <>
                                        <strong>Username: </strong> { login }
                                    </>
                                )
                            }
                        </li>

                        <li>
                            {
                                company && (
                                    <>
                                        <strong>Company: </strong> { company }
                                    </>
                                )
                            }
                        </li>

                        <li>
                            {
                                blog && (
                                    <>
                                        <strong>Website: </strong> { blog }
                                    </>
                                )
                            }
                        </li>
                    </ul>
                </div>
            </div>

            <div className="card text-center" >
                <div className="badge badge-primary" >Followers: {followers}</div>
                <div className="badge badge-success" >Following: {following}</div>
                <div className="badge badge-light" >Public Repos: {public_repos}</div>
                <div className="badge badge-dark" >Public Gists: {public_gists}</div>
            </div>

            <Repos repos={repos} />
        </>
    )
}

// DisplayUser.propTypes = {
//     loading: PropTypes.bool,
//     user: PropTypes.object.isRequired,
//     getSingleUser: PropTypes.func.isRequired,
//     getUserRepos: PropTypes.func.isRequired,
// }

export default DisplayUser;
