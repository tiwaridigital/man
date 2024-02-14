'use client';
import React from 'react';
import './style.scss';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import logo from '/public/logo.svg';
import { useEffect, useState } from 'react';
import Search from '../../../public/assets/icons/Search';
import Close from '../../../public/assets/icons/Close';
import Menu from '../../../public/assets/icons/Menu';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [show, setShow] = useState('top');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const menuItems = [
    { name: 'Movies', type: 'movie' },
    { name: 'TV Shows', type: 'tv' },
    { name: <Search width={20} height={20} />, type: 'search' },
  ];

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        //if current Y co-ordinate is greater than last scrolled Y co-ordinate -> then hide
        setShow('hide');
      } else {
        setShow('show');
      }
    } else {
      setShow('top');
    }
    setLastScrollY(window.scrollY);
  };

  const openSearch = () => {
    setShowSearch(!showSearch);
    setMobileMenu(false);
  };

  const openMobileMenu = () => {
    console.log('openMobileMenu');
    setMobileMenu(true);
    setShowSearch(false);
  };

  const handleSearchQuery = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      router.push(`/search?s=${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const navigationHandler = (type) => {
    if (type === 'movie') {
      navigate('/explore/movie');
    } else if (type === 'tv') {
      navigate('/explore/tv');
    }

    //show search bar when search icon is clicked
    if (type === 'search') {
      setShowSearch(!showSearch);
    }
    setMobileMenu(false);
  };

  return (
    <header
      itemScope
      itemType="http://schema.org/WPHeader"
      className={`header ${mobileMenu ? 'mobileView' : ''} ${show}`}
    >
      <ContentWrapper>
        <div className="logo">
          <Link href="/" itemProp="url">
            <Image priority height={45} width={230} src={logo.src} alt="" />
          </Link>
        </div>

        <ul className="menuItems">
          {/*{menuItems.map((menu, idx) => (*/}
          {/*  <>*/}
          {/*    {menu.type === 'search' ? (*/}
          {/*      <li*/}
          {/*        key={idx}*/}
          {/*        className="menuItem"*/}
          {/*        onClick={() => {*/}
          {/*          menu.type === 'search' && setShowSearch(!showSearch);*/}
          {/*          setMobileMenu(false);*/}
          {/*        }}*/}
          {/*      >*/}
          {/*        {menu.name}*/}
          {/*      </li>*/}
          {/*    ) : (*/}
          {/*      <li className="menuItem" key={idx}>*/}
          {/*        <Link href={'/explore'} className="block" key={idx}>*/}
          {/*          {menu.name}*/}
          {/*        </Link>*/}
          {/*      </li>*/}
          {/*    )}*/}
          {/*  </>*/}
          {/*))}*/}
          <li className="menuItem">
            <Link href={'/explore'}>Explore</Link>
          </li>
          <li
            className="menuItem"
            onClick={() => {
              setShowSearch(!showSearch);
              setMobileMenu(false);
            }}
          >
            <Search width={20} height={20} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <div onClick={openSearch}>
            <Search />
          </div>
          {mobileMenu ? (
            <div onClick={() => setMobileMenu(false)}>
              <Close />
            </div>
          ) : (
            <div onClick={openMobileMenu}>
              <Menu />
            </div>
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onKeyUp={handleSearchQuery}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div onClick={() => setShowSearch(false)}>
                <Close />
              </div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
