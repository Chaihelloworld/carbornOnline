import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/navbarMain.module.scss';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import ImageCarousel from './Carousel'; // Import your ImageCarousel component
import Side1 from '../public/newimg/side_5.png';
import Side2 from '../public/newimg/side_7.png';
import Side3 from '../public/newimg/side_4.png';
import Side4 from '../public/newimg/side_5.png';
import Side5 from '../public/newimg/side_6.png';

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
    const router = useRouter();
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <Navbars />
            <Container fluid={'true'} style={{ alignContent: 'center' }}>
                <Row>
                    <div style={{ paddingTop: '10px' }}>
                        <Col md={12} xs={12}>
                            <ImageCarousel />
                        </Col>
                    </div>
                    <br />
                </Row>
            </Container>

            <Container fluid={'sm'} style={{ alignContent: 'center' }}>
                <Row style={{ paddingTop: '25px' }}>
                    <Col md={12} xs={12}>
                        <h1 style={{ textAlign: 'center' }}>
                            {' '}
                            การท่องเที่ยวคาร์บอนสุทธิเป็นศูนย์ กลุ่มอุทยานแห่งชาติสีเขียว
                        </h1>
                        <div style={{ padding: '15px' }}>
                            <h5>
                                COMMING SOON CONTENT ...
                            </h5>
                            {/* <h5>
                                CIRCULAR คัดแยกของเสียจากอุตสาหกรรมสิ่งทอตามเฉดสี และ
                                นำมาแปรสภาพเป็นผ้าหลากสี หรือ เสื้อผ้าใหม่
                                โดยไม่ผ่านกระบวนการฟอกย้อม เพื่อนำกลับมาใช้เป็นสินค้าที่ยั่งยืน และ
                                สร้างผลกระทบที่ดีต่อโลกใบนี้
                            </h5>
                            <h5>
                                สิ่งที่ CIRCULAR ทำ
                                ถือเป็นส่วนหนึ่งในการแก้ไขปัญหาสำหรับอนาคตร่วมกันของทุกคนที่เป็นส่วนหนึ่งของโลกใบนี้
                            </h5> */}
                        </div>

                        <br />
                        {/* <Row style={{ marginBottom: '15px' }}>
                            <ImageCarousel />
                        </Row> */}
                    </Col>
                    <Col md={12} xs={12}>
                        <div style={{ display: 'flex' }}>
                            <Row>
                                {/* <Col md={2} xs={1} style={{ paddingBottom: '15px' }}></Col>
                                <Col md={4} xs={5} style={{ paddingBottom: '15px' }}>
                                    <Card style={{ borderRadius: '15px' }}>
                                        <Button
                                            onClick={() => {
                                                router.push('/plan');
                                            }}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                display: 'contents'
                                            }}>
                                            <Card.Img
                                                variant="top"
                                                style={{ borderRadius: '15px' }}
                                                src={Side1.src}
                                            />
                                        </Button>
                                    </Card>
                                </Col>
                                <Col md={4} xs={5} style={{ paddingBottom: '15px' }}>
                                    {' '}
                                    <Card style={{ borderRadius: '15px' }}>
                                        <Button
                                            onClick={() => {
                                                router.push('/location');
                                            }}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                display: 'contents'
                                            }}>
                                            <Card.Img
                                                variant="top"
                                                style={{ borderRadius: '15px' }}
                                                src={Side1.src}
                                            />
                                        </Button>
                                    </Card>
                                </Col>
                                <Col md={2} xs={1} style={{ paddingBottom: '15px' }}></Col>
                                <Col md={2} xs={1} style={{ paddingBottom: '15px' }}></Col>
                                <Col md={4} xs={5} className={styles.menuCard}>
                                    <Card style={{ borderRadius: '15px' }}>
                                        <Button
                                            onClick={() => {
                                                router.push('/products');
                                            }}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                display: 'contents'
                                            }}>
                                            <Card.Img
                                                variant="top"
                                                style={{ borderRadius: '15px' }}
                                                src={Side1.src}
                                            />
                                        </Button>
                                    </Card>
                                </Col>
                                <Col md={4} xs={5} className={styles.menuCard}>
                                    {' '}
                                    <Card style={{ borderRadius: '15px' }}>
                                        <Button
                                            onClick={() => {
                                                router.push('/compensate');
                                            }}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                display: 'contents'
                                            }}>
                                            <Card.Img
                                                variant="top"
                                                style={{ borderRadius: '15px' }}
                                                src={Side1.src}
                                            />
                                        </Button>
                                    </Card>
                                </Col>
                                <Col md={2} xs={1} style={{ paddingBottom: '15px' }}></Col> */}
                                <Col md={3} xs={6} style={{ paddingBottom: '15px' }}>
                                    <Card style={{ borderRadius: '15px' }}>
                                        <Button
                                            onClick={() => {
                                                router.push('/infopainning');
                                            }}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                display: 'contents'
                                            }}>
                                            <Card.Img
                                                variant="top"
                                                style={{ borderRadius: '15px' }}
                                                src={Side5.src}
                                            />
                                        </Button>
                                    </Card>
                                </Col>
                                <Col md={3} xs={6} style={{ paddingBottom: '15px' }}>
                                    {' '}
                                    <Card style={{ borderRadius: '15px' }}>
                                        <Button
                                            onClick={() => {
                                                router.push('/location');
                                            }}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                display: 'contents'
                                            }}>
                                            <Card.Img
                                                variant="top"
                                                style={{ borderRadius: '15px' }}
                                                src={Side3.src}
                                            />
                                        </Button>
                                    </Card>
                                </Col>
                                <Col md={3} xs={6} className={styles.menuCard}>
                                    <Card style={{ borderRadius: '15px' }}>
                                        <Button
                                            onClick={() => {
                                                router.push('/products');
                                            }}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                display: 'contents'
                                            }}>
                                            <Card.Img
                                                variant="top"
                                                style={{ borderRadius: '15px' }}
                                                src={Side4.src}
                                            />
                                        </Button>
                                    </Card>
                                </Col>
                                <Col md={3} xs={6} className={styles.menuCard}>
                                    {' '}
                                    <Card style={{ borderRadius: '15px' }}>
                                        <Button
                                            onClick={() => {
                                                router.push('/compensate');
                                            }}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                display: 'contents'
                                            }}>
                                            <Card.Img
                                                variant="top"
                                                style={{ borderRadius: '15px' }}
                                                src={Side2.src}
                                            />
                                        </Button>
                                    </Card>
                                </Col>
                                <Col md={12} xs={12}  style={{ paddingTop: '50px' }}>
                                    <h1 style={{ textAlign: 'center' }}>
                                        {' '}
                                        COMMING SOON CONTENT ...
                                    </h1>
                                    <div style={{ padding: '15px' }}>
                                        {/* <h5>
                                            CIRCULAR
                                            นำของเสียจากอุตสหากรรมสิ่งทอมาใช้เป็นวัตถุดิบในการผลิต
                                            เช่น ของเสียจากภาคการผลิตอุตสาหกรรมแฟชั่น หรือ
                                            เศษผ้าจากการตัดเย็บ และ ขยะสิ่งทอแฟชั่น ต่างๆ
                                        </h5>
                                        <h5>
                                            CIRCULAR คัดแยกของเสียจากอุตสาหกรรมสิ่งทอตามเฉดสี และ
                                            นำมาแปรสภาพเป็นผ้าหลากสี หรือ เสื้อผ้าใหม่
                                            โดยไม่ผ่านกระบวนการฟอกย้อม
                                            เพื่อนำกลับมาใช้เป็นสินค้าที่ยั่งยืน และ
                                            สร้างผลกระทบที่ดีต่อโลกใบนี้
                                        </h5> */}
                                        {/* <h5>
                                            สิ่งที่ CIRCULAR ทำ
                                            ถือเป็นส่วนหนึ่งในการแก้ไขปัญหาสำหรับอนาคตร่วมกันของทุกคนที่เป็นส่วนหนึ่งของโลกใบนี้
                                        </h5> */}
                                    </div>

                                    <br />
                                    {/* <Row style={{ marginBottom: '15px' }}>
                            <ImageCarousel />
                        </Row> */}
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
            <br />
            <br />
            <br />
            <Product />
        </>
    );
}
export default ActionBottom;
