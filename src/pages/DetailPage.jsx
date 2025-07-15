import React from 'react';
import DetailsMain from '../components/menu/DetailsMain';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
    const { id } = useParams();

    return (
        <div>
            <DetailsMain id={id}/>
        </div>
    );
};

export default DetailPage;