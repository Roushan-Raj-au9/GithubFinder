import React from 'react';
import PropTypes from 'prop-types';

const DisplayRepo = ({ repoData }) => {
    return (
        <div className="card" >
            <h3>
                <a href={repoData.html_url} >
                    {repoData.name}
                </a>   
            </h3>
        </div>
    )
}


DisplayRepo.propTypes = {
    repoData: PropTypes.object.isRequired,
}

export default DisplayRepo;
