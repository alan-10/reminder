import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import './styles.css';

interface PageHeaderProps {
    redirect: string;
}

const  PageHeader:React.FC<PageHeaderProps> = ( { redirect }) =>{
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to={redirect}>
                    <BsArrowLeft size="6rem" color="#f8f8fc" />
                </Link>
                <h1 className="title-header">Reminder</h1>
            </div>


        </header>
    )
}

export default PageHeader;