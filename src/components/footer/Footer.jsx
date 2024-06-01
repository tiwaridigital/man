import React from 'react';
import ContentWrapper from '../contentWrapper/ContentWrapper';
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
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
