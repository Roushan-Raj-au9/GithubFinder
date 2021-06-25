import React from 'react';
import PropTypes from 'prop-types';

import DisplayRepo from '../components/users/DisplayRepo';

const Repos = ({ repos }) => {
    return (
        repos.map( (item) => (
            <DisplayRepo  repoData={item} key={item.id} />
        ))
    )
}

Repos.propTypes = {
    repos: PropTypes.array.isRequired,
}

export default Repos;
