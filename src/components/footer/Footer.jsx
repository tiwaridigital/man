import React from 'react';
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaTwitter,
//   FaLinkedin,
// } from 'react-icons/fa';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import logo from '/public/logo.svg';
import './style.scss';
import Link from 'next/link';
const Footer = () => {
  const menu = [
    {
      name: 'Terms Of Use',
      link: '/terms',
    },
    {
      name: 'Privacy Policy',
      link: '/privacy-policy',
    },
    {
      name: 'DMCA',
      link: '/dmca',
    },
  ];
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          {menu.map((x, idx) => (
            <li key={idx} className="menuItem">
              <Link href={x.link}>{x.name}</Link>
            </li>
          ))}
        </ul>

        {/* <div className="socialIcons">
          <span className="icon">
            <FaFacebookF />
          </span>
          <span className="icon">
            <FaInstagram />
          </span>
          <span className="icon">
            <FaTwitter />
          </span>
          <span className="icon">
            <FaLinkedin />
          </span>
        </div> */}
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
