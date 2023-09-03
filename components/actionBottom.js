import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/actionBottom.module.scss';

import STORE from '../libs/store.image';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
// import Modal_login from './modal_login';

import axios from 'axios';

import { useRouter } from 'next/router';

function ActionBottom(props) {
    const [showAll, setShowAll] = useState(false);

    const router = useRouter();
    const [hrefLinktest, setHrefLinktest] = useState('');
    const [hrefLinktest1, setHrefLinktest1] = useState(false);

    const [trigger, setTrigger] = useState(false);

    const toggleAll = () => {
        setShowAll((val) => !val);
        check_maintanence();
        // console.log(showAll);
    };


    return (
        <>
            {showAll && <div className={styles.bg_blur} onClick={toggleAll}></div>}
            <div className={'d-lg-none d-block' + ' ' + styles.zone_button_bottom}>
                <div className={'container' + ' ' + styles.menu_fix}>
                    <div className={styles.list_tab_menu}>
                        <Link href="https://" passHref>
                            <a target="_blank">
                                <div className={styles.menu__item}>
                                    <Image
                                        src={STORE.menu1}
                                        alt="logo"
                                        loading="lazy"
                                    />
                                    <p style={{ marginTop: '-10px' }}>ติดต่อเรา</p>
                                </div>
                            </a>
                        </Link>
                    </div>
                        <div className={styles.list_tab_menu}>
                            <div className={styles.menu__item} 
                            // onClick={openModalBet}
                            >
                                <Image src={STORE.menu2} alt="logo" loading="lazy" />
                                <p style={{ marginTop: '-10px' }}>กิจกรรม</p>
                            </div>
                        </div>
                   
                  
                        <div className={styles.list_tab_menu}>
                                <button
                                    className={styles.menu__item}
                                    onClick={()=>{router.push('/')}}
                                    >
                                    <Image
                                        src={STORE.menu3}
                                        alt="logo"
                                        loading="lazy"
                                    />
                                    <p style={{ marginTop: '-10px' }}>ผลิตภัณฑ์</p>
                                </button>
                            </div>
                            <div className={styles.list_tab_menu}>
                                <button
                                    className={styles.menu__item}
                                    onClick={()=>{router.push('/map')}}
                                    // onClick={onClickButtonDeposit}
                                    >
                                    <Image
                                        src={STORE.menu4}
                                        alt="logo"
                                        loading="lazy"
                                    />
                                    <p style={{ marginTop: '-10px' }}>แผนที่</p>
                                </button>
                            </div>
                            <div className={styles.list_tab_menu}>
                                <button
                                    className={styles.menu__item}
                                    onClick={()=>{
                                        router.push('/profiles')
                                    }}
                                    >
                                    <Image
                                        src={STORE.menu5}
                                        alt="logo"
                                        loading="lazy"
                                    />
                                    <p style={{ marginTop: '-10px' }}>ฉัน</p>
                                </button>
                            </div>

                    <div className={styles.menu__border}></div>
                </div>
                <div className={styles.svg_container}>
                    <svg viewBox="0 0 202.9 45.5">
                        <clipPath
                            id="menu"
                            clipPathUnits="objectBoundingBox"
                            transform="scale(0.0049285362247413 0.021978021978022)">
                            <path
                                d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7
                    c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5
                    c9.2,3.6,17.6,4.2,23.3,4H6.7z"
                            />
                        </clipPath>
                    </svg>
                </div>
            </div>

            {/*----- modal register -----*/}
            {/* <Modal_register show={modalShow} onHide={() => setModalShow(false)} /> */}

            {/*----- modal login -----*/}
            {/* <Modal_login show={modalLogin} onHide={() => setModalLogin(false)} /> */}
        </>
    );
}
export default ActionBottom;
