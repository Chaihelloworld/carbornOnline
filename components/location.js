import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/navbarMain.module.scss';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import ImageCarousel from './Carousel'; // Import your ImageCarousel component
import Side1 from '../public/newimg/side_1.jpg';
import { Container } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import Navbars from './NavbarMain';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './footer';
import Card from 'react-bootstrap/Card';
import Product from './headerBanner'
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
            <Container fluid={'true'} style={{ alignContent: 'center' }}>
                <Row>

                    <br />
                    </Row>
                    </Container >

                    <Container fluid={'sm'} style={{ alignContent: 'center' }}>

                    <Row style={{paddingTop:'25px'}}>
                    <Col md={12} xs={12}>
                        <h1 style={{textAlign:'center'}}>อุทยานสีเขียว</h1>
                        <div style={{padding:'15px'}}>
                        <h5>COMMING SOON CONTENT ...</h5>
                        </div>
                        

                        <br />
                        {/* <Row style={{ marginBottom: '15px' }}>
                            <ImageCarousel />
                        </Row> */}
                    </Col>
                    <Col md={12} xs={12}>
                        <div style={{display:'flex'}}>
                        <Row>
                          
                            <Col md={6} xs={6} className={styles.menuCard}>
                                {' '}
                                <Card style={{ borderRadius: '15px' }}>
                                    <Button
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
                        </Row>
                        </div>
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
