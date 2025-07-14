import React, { useState } from 'react';
import './RightSide.css';
import Home from '../../Img/home.png';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import TrendCard from '../TrendCard/TrendCard';
import ShareModal from '../ShareModal/ShareModal';
import { Link } from 'react-router-dom';

const RightSide = () => {

    const [modalOpened, setModalOpened] = useState(false);

    return (
        <div className='RightSide'>
            <div className="navIcons">
                <Link to='../home' className="home-link">
                    <HomeOutlinedIcon className="home-icon" />
                </Link>
            </div>

            <TrendCard />

            <div className="button rg-button" onClick={() => setModalOpened(true)}>
                Share
            </div>
            <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />

        </div>
    )
}

export default RightSide
