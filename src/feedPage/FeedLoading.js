import React, {useState} from 'react';
import Spinner from 'react-bootstrap/Spinner';

function FeedLoading(props) {
    const [loading, setLoading] = useState(null);
    return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
}

export default FeedLoading;