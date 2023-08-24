import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/navbarMain.module.scss';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Side1 from '../public/newimg/slide_1z1.png';
import Side2 from '../public/newimg/slide_1z2.png';
import Side3 from '../public/newimg/slide_1z3.png';
import ImageCarousel from './CarouselPag'; // Import your ImageCarousel component

import { Container } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import Navbars from './NavbarMain';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './footer';
import Card from 'react-bootstrap/Card';
import Product from './headerBanner';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
function ActionBottom() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <Navbars />
            {/* <Container fluid={'true'} style={{ alignContent: 'center' }}>
                <Row>
                <h1 style={{ textAlign: 'center' }}>เตรียมตัวก่อนเที่ยว</h1>

                    <div style={{ paddingTop: '10px' }}>
                        <Col md={12} xs={12}>
                            <ImageCarousel />
                        </Col>
                    </div>
                    <br />
                </Row>
            </Container> */}

            <Container fluid={'sm'} style={{ alignContent: 'center' }}>
                
                <Row style={{ paddingTop: '25px' }}>
                    <Col md={12} xs={12}>
                        <div style={{ padding: '10px' }}>
                        <h1 style={{ textAlign: 'center' }}>เตรียมตัวก่อนเที่ยว</h1>

                            {/* <h5>COMMING SOON CONTENT ...</h5> */}
                            {/* <h5>CIRCULAR คัดแยกของเสียจากอุตสาหกรรมสิ่งทอตามเฉดสี และ นำมาแปรสภาพเป็นผ้าหลากสี หรือ เสื้อผ้าใหม่ โดยไม่ผ่านกระบวนการฟอกย้อม เพื่อนำกลับมาใช้เป็นสินค้าที่ยั่งยืน และ สร้างผลกระทบที่ดีต่อโลกใบนี้</h5>
                        <h5>สิ่งที่ CIRCULAR ทำ ถือเป็นส่วนหนึ่งในการแก้ไขปัญหาสำหรับอนาคตร่วมกันของทุกคนที่เป็นส่วนหนึ่งของโลกใบนี้</h5> */}
                        </div>

                        {/* <Row style={{ marginBottom: '15px' }}>
                            <ImageCarousel />
                        </Row> */}
                    </Col>
                   
                    <Col md={12} xs={12}>
                        <div style={{ display: 'flex' }}>
                                    <Image
                                        src={Side1.src}
                                        width={1400}
                                        height={680}
                                        alt="Picture of the author"
                                    />
                        </div>
                        <br/>
                        <div style={{ display: 'flex' }}>
                                    <Image
                                        src={Side2.src}
                                        width={1400}
                                        height={620}
                                        alt="Picture of the author"
                                    />
                        </div>
                        <br/>
                        <div style={{ display: 'flex' }}>
                                    <Image
                                        src={Side3.src}
                                        width={1400}
                                        height={620}
                                        alt="Picture of the author"
                                    />
                        </div>
                        <br/>
                    </Col>
                </Row>
            </Container>
            {/* <br/>
            <br/>
            <br/> */}
            {/* <Product/> */}
        </>
    );
}
export default ActionBottom;
