import React from 'react';
import logMobile from '../../assets/images/log-white.svg'
import logDesktop from '../../assets/images/log-pink.svg'
import './Nav.css';
const Nav = () => {
    return (
        <div>
            <span className='navbar__close'>x</span>

           <a href="" className='eventlogo'>
            <img className='eventlogo__logoimage' src={logMobile} alt="" />
           </a>
           
           <div className="navbar__items-box">
            <a href="">Home</a>
            <a href=""> Tipo de Eventos</a>
            <a href=""> Usuarios</a>
            <a href=""> Contatos</a>

           </div>
        </div>
    );
};

export default Nav;