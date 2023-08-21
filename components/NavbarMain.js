import styles from '../styles/navbarMain.module.scss';
import stylesModal from '../styles/modalAll.module.scss';
import stylesINDEX from '../styles/index.module.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useCookies } from 'react-cookie';
import { Navbar, Container, Nav, Offcanvas, Button, Form, Modal } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import STORE from '../libs/store.image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

import Logo_main1 from '../public/newimg/logo_main1.png';
import Logo_main2 from '../public/newimg/logo_main2.png';
import Logo_main3 from '../public/newimg/logo_main3.png';
import Logo_main4 from '../public/newimg/logo_main4.png';
import Logo_main5 from '../public/newimg/logo_main5.png';

function NavbarMain(props) {
    const [profile, setProfile] = useState({});

    const [isCheck, setIsCheck] = useState(false);
    const [modalLogin, setModalLogin] = useState(false);
    const accessToken = Cookie.get('token');

    const router = useRouter();

    const [checkScroll, setCheckScroll] = useState(false);
    const [BGcolor, setBGcolor] = useState('transparent');

    const [pictureUrl, setPictureUrl] = useState(null);
    const [idToken, setIdToken] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [userId, setUserId] = useState('');
    // useEffect(async () => {
    //     const liff = (await import('@line/liff')).default;
    //     await liff.ready;
    //     const profile = await liff.getProfile();
    //     setProfile(profile);
    // }, [profile.userId]);
    useEffect(() => {
        const windowScrollPage = (event) => {
            const scroll = window.pageYOffset;
            // console.log(scroll);
            if (scroll < 980) {
                setBGcolor('transparent');
            } else {
                setBGcolor('#000');
            }
        };
        var doc = document.documentElement;
        var w = window;

        var curScroll;
        var prevScroll = w.scrollY || doc.scrollTop;
        var curDirection = 0;
        var prevDirection = 0;

        var toggled;
        var threshold = 200;

        var checkScroll = function () {
            curScroll = w.scrollY || doc.scrollTop;
            if (curScroll > prevScroll) {
                // scrolled down
                curDirection = 2;
            } else {
                //scrolled up
                curDirection = 1;
            }

            if (curDirection !== prevDirection) {
                toggled = toggleHeader();
            }

            prevScroll = curScroll;
            if (toggled) {
                prevDirection = curDirection;
            }
        };

        var toggleHeader = function () {
            toggled = true;
            if (curDirection === 2 && curScroll > threshold) {
                setCheckScroll(true);
            } else if (curDirection === 1) {
                setCheckScroll(false);
            } else {
                toggled = false;
            }
            return toggled;
        };

        window.addEventListener('scroll', checkScroll);

        window.addEventListener('scroll', windowScrollPage);
        AOS.init();
    }, []);

    const logout = () => {
        Cookie.remove('token');
        Cookie.remove('name');
        // router.reload();
        router.push('/');
    };
    return (
        <>
            <Navbar
                id="main-navbar"
                className={[styles.navbar, checkScroll == true ? styles.navbarHide : ' '].join(' ')}
                expand="xl"
                style={{ backgroundColor: BGcolor }}>
                <Container className={[styles.container, styles.navContainer].join(' ')}>
                    <div className={styles.container}>
                        <Navbar.Toggle aria-controls="offcanvasNavbar" className={styles.hamburger}>
                            <div className={[stylesModal.toggle]}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </Navbar.Toggle>
                        {/* <Navbar.Brand
                            href="/"
                            // className={styles.img_logo}
                            style={{ marginRight: '0' }}>
                            <Image src={STORE.logo} alt="logo" width={90} height={40} />
                        </Navbar.Brand> */}
                        {/*-------------- sidebar --------------*/}
                        <Navbar.Offcanvas
                            id="offcanvasNavbar"
                            aria-labelledby="offcanvasNavbarLabel"
                            placement="start"
                            className={styles.offcanvas}>
                            <div className={styles.navside_scroll}>
                                <Offcanvas.Header
                                    className={[styles.text_gray, styles.sidebar].join(' ')}>
                                    <Offcanvas.Header closeButton className={styles.close_btn}>
                                        {/* <Button closeButton>
                                            <Image src={btn_ic_close} alt="" />
                                        </Button> */}
                                    </Offcanvas.Header>
                                    {/* <FontAwesomeIcon icon={faTimes} color="#FFEA93" pull="left" className={styles.close_btn_1}/> */}
                                </Offcanvas.Header>
                                {/* {cookie. ? (
                                    <>
                                        <div
                                            className={'text-white mb-0 mt-3'}
                                            style={{ marginTop: '-25px', fontSize: '16px' }}>
                                            <p className={'mb-2'}> Username : tharadon</p>
                                        </div>
                                    </>
                                ) : ( */}
                                <div className={styles.text_center}>
                                    <Offcanvas.Title href="/" className={styles.img_logo_sidebar}>
                                        <Image src={STORE.logo} alt=" logo" />
                                    </Offcanvas.Title>
                                </div>
                                {profile.pictureUrl && (
                                    <div>
                                        {profile.pictureUrl && (
                                            <Image
                                                src={profile.pictureUrl}
                                                alt={profile.displayName}
                                                width={500}
                                                height={500}
                                            />
                                        )}
                                        <div>Name: {profile.displayName}</div>
                                    </div>
                                )}

                                {idToken && (
                                    <Button
                                        className={[stylesINDEX.btn_login]}
                                        size="md"
                                        onClick={() => logoutLine()}>
                                        logout
                                    </Button>
                                )}

                                {/*  <p>คุณยังไม่ได้เข้าสู่ระบบ?</p>
                                   
                                 
                                    </div> */}
                                {/* )} */}

                                <Nav className="justify-content-end flex-grow-1 mt-3">
                                    <hr className={styles.line_yellow} />
                                    <div
                                        className={
                                            'mx-auto f-7 px-2' + ' ' + styles.menu_additional
                                        }>
                                        เมนูเพิ่มเติม
                                    </div>
                                </Nav>
                                <Offcanvas.Body className={'pt-1 mt-2'}>
                                    <Nav className="justify-content-end flex-grow-1">
                                    <Nav.Link
                                            href="/"
                                            className={[
                                                styles.text_gray,
                                                styles.text_nav,
                                                styles.text_sideNav
                                            ].join(' ')}>
                                            <div
                                                className={[styles.img_icon_in_nav]}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}></div>
                                            <span className={styles.text_gray}>
                                                Home
                                            </span>
                                        </Nav.Link>
                                        <Nav.Link
                                            href="/map"
                                            className={[
                                                styles.text_gray,
                                                styles.text_nav,
                                                styles.text_sideNav
                                            ].join(' ')}>
                                            <div
                                                className={[styles.img_icon_in_nav]}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}></div>
                                            <span className={styles.text_gray}>
                                                แผนที่จุดขายผลิตภัณฑ์ ลดคาร์บอน
                                            </span>
                                        </Nav.Link>
                                        <Nav.Link
                                            href="/"
                                            className={[
                                                styles.text_gray,
                                                styles.text_nav,
                                                styles.text_sideNav
                                            ].join(' ')}>
                                            <div
                                                className={[styles.img_icon_in_nav]}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}></div>
                                            <span className={styles.text_gray}>
                                                ผลิตภัณฑ์ลดคาร์บอน
                                            </span>
                                        </Nav.Link>

                                        {accessToken && (
                                            <Nav.Link
                                                href="/productList"
                                                className={[
                                                    styles.text_gray,
                                                    styles.text_nav,
                                                    styles.text_sideNav
                                                ].join(' ')}>
                                                <div
                                                    className={[styles.img_icon_in_nav]}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}></div>
                                                <span className={styles.text_gray}>STORE</span>
                                            </Nav.Link>
                                        )}
                                    </Nav>
                                </Offcanvas.Body>
                            </div>
                            <div className={styles.navside_bottom_bar}>
                                <div className={styles.line_bar}>
                                    {/* <FontAwesomeIcon icon={faLine} color="#FFFFF" pull="left" /> */}
                                    <Image src={STORE.img_line} alt="" width={20} height={20} />
                                    <span style={{ marginLeft: '.3rem' }}>
                                        <Link
                                            // href="https://lin.ee/bs1V7UI"
                                            href=""
                                            passHref>
                                            <a target="_blank" style={{ color: '#4d8b37' }}>
                                                Line Support
                                            </a>
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </Navbar.Offcanvas>
                        {/*-------------- end sidebar --------------*/}
                        <Navbar.Collapse
                            className={[styles.collapse, styles.navCollapse].join(' ')}>
                            <Nav style={{ marginLeft: '1rem' }}>
                                <Nav.Link
                                    href="/"
                                    className={[
                                        styles.text_gray,
                                        styles.text_nav,
                                        router.pathname == '/' ? styles.active_text : ''
                                    ].join(' ')}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <div
                                            className={[styles.img_icon]}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <div className={styles.none_hover}>
                                                {/* <Image src={STORE.ic_settings} alt="ic_settings" /> */}
                                            </div>
                                            <div className={styles.ic_hover}>
                                                {/* <Image
                                                    src={STORE.ic_settings_hover}
                                                    alt="ic_settings"
                                                /> */}
                                            </div>
                                        </div>
                                        <span style={{ marginLeft: '.2rem' }}>Home</span>
                                    </div>
                                </Nav.Link>
                                <Nav.Link
                                    href="/map"
                                    className={[
                                        styles.text_gray,
                                        styles.text_nav,
                                        router.pathname == '/#' ? styles.active_text : ''
                                    ].join(' ')}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <div
                                            className={[styles.img_icon]}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <div className={styles.none_hover}>
                                                {/* <Image src={STORE.ic_settings} alt="ic_settings" /> */}
                                            </div>
                                            <div className={styles.ic_hover}>
                                                {/* <Image
                                                    src={STORE.ic_settings_hover}
                                                    alt="ic_settings"
                                                /> */}
                                            </div>
                                        </div>
                                        <span style={{ marginLeft: '.2rem' }}>
                                            แผนที่จุดขายผลิตภัณฑ์ ลดคาร์บอน
                                        </span>
                                    </div>
                                </Nav.Link>
                                <Nav.Link
                                    href="/products"
                                    className={[
                                        styles.text_gray,
                                        styles.text_nav,
                                        router.pathname == '/products' ? styles.active_text : ''
                                    ].join(' ')}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <div
                                            className={[styles.img_icon]}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <div className={styles.none_hover}>
                                                {/* <Image src={STORE.ic_settings} alt="ic_settings" /> */}
                                            </div>
                                            <div className={styles.ic_hover}>
                                                {/* <Image
                                                    src={STORE.ic_settings_hover}
                                                    alt="ic_settings"
                                                /> */}
                                            </div>
                                        </div>
                                        <span style={{ marginLeft: '.2rem' }}>ผลิตภัณฑ์ลดคาร์บอน</span>
                                    </div>
                                </Nav.Link>
                                {accessToken && (
                                    <Nav.Link
                                        href="/productList"
                                        className={[
                                            styles.text_gray,
                                            styles.text_nav,
                                            router.pathname == '/productList'
                                                ? styles.active_text
                                                : ''
                                        ].join(' ')}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <div
                                                className={[styles.img_icon]}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                <div className={styles.none_hover}>
                                                    {/* <Image src={STORE.ic_settings} alt="ic_settings" /> */}
                                                </div>
                                                <div className={styles.ic_hover}>
                                                    {/* <Image
                  src={STORE.ic_settings_hover}
                  alt="ic_settings"
              /> */}
                                                </div>
                                            </div>
                                            <span style={{ marginLeft: '.2rem' }}>STORE</span>
                                        </div>
                                    </Nav.Link>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                    <div className={styles.menulogin}>
                        <ui style={{paddingTop:'3px'}}>
                            <il style={{transform:'translate(0px,5px)',padding:'5px'}}>
                                <img src={Logo_main2.src} alt="logoMain" width={92} />
                            </il>
                            <il  style={{padding:'5px'}}>
                                <img src={Logo_main1.src} alt="logoMain" width={45} />
                            </il>
                            <il style={{padding:'5px'}}>
                                <img src={Logo_main5.src} alt="logoMain" width={75} />
                            </il>
                            <il style={{padding:'3px'}}>
                                <img src={Logo_main3.src} alt="logoMain" width={65} />
                            </il>
                            <il style={{padding:'3px'}}>
                                <img src={Logo_main4.src} alt="logoMain" width={55} />
                            </il>
                        </ui>
                        {/* {accessToken ? (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row'
                                }}>
                                    
                                <a style={{ color: 'white', fontSize: '16px' }}>
                                    ยินดีต้อนรับ : {Cookie.get('name')}
                                </a>
                                &ensp; &ensp;
                                <Button
                                    style={{
                                        background: '#FFF',
                                        width: '150px',
                                        color: 'green',
                                        fontWeight: 600,
                                        borderRadius: '12px',
                                        border: 'none'
                                    }}
                                    onClick={logout}
                                    size="md">
                                    ออกจากระบบ
                                </Button>
                            </div>
                        ) : (
                            <Nav.Link
                            href="/login"
                            className={[
                                styles.text_gray,
                                styles.text_nav,
                                router.pathname == '/login' ? styles.active_text : ''
                            ].join(' ')}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <div
                                    className={[styles.img_icon]}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <div className={styles.none_hover}>
                                    </div>
                                    <div className={styles.ic_hover}>
                                    </div>
                                </div>
                                <span style={{ marginLeft: '.2rem' }}>เข้าสู่ระบบ</span>
                            </div>
                        </Nav.Link>

                        )}{' '} */}
                    </div>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarMain;
