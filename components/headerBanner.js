import AOS from 'aos';
import 'aos/dist/aos.css';
import { Container, Row, Col, Button, Card, Form, Pagination } from 'react-bootstrap';
import styles from '../styles/headerBanner.module.scss';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import STORE from '../libs/store.image';
import Image from 'next/image';

export default function HeaderBanner(props) {


    const router = useRouter();
    const [modalRegister, setModalResgister] = useState(false);


    const [trigger, setTrigger] = useState(false);



    useEffect(() => {
        AOS.init();
        // fetchLink();
      
    }, []);
    const index = [
        { i: 1 },
        { i: 2 },
        { i: 2 },
        { i: 2 },
        { i: 2 },
        { i: 2 },
        { i: 2 },
        { i: 2 },
        { i: 2 },
        { i: 2 },
        { i: 2 },
        { i: 2 },
        { i: 2 }
    ];
    return (
        <div>
            <div className={styles.x_banner_header}>
                <Container>
                    <Row>
                        <Col xs={12} md={2} style={{ transform: 'translate(0px,5px)' }}>
                            <style jsx>{`
                                .paddingDestop {
                                    padding: 30px;
                                }
                                @media (min-width: 991.98px) {
                                    .paddingDestop {
                                        padding: 2px;
                                    }
                                }     
                                 @media (min-width: 791.98px) {
                                    .paddingDestop {
                                        padding: 0px;
                                    }
                                }
                                .btn-primary {
                                    color: #fff;
                                    background-color: #007a06;
                                    border-color: #007a06;
                                }
                            `}</style>
                            <div className="paddingDestop">
                                <Form>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formGroupEmail"
                                        size="sm">
                                        <Form.Control
                                            type="text"
                                            placeholder="ค้าหา..."
                                            size="sm"
                                        />
                                    </Form.Group>
                                </Form>
                                <Form.Select>
                                    <option>ประเภทสินค้า</option>
                                    <option>ของใช้</option>
                                    <option>อาหาร</option>
                                </Form.Select>
                                <br />
                                <Form.Select>
                                    <option>สถานที่่</option>
                                </Form.Select>
                                <br />
                                <div
                                    style={{ width: '100%', position: 'inherit', display: 'grid' }}>
                                    <Button className='btn-primary' >ค้นหา</Button>
                                </div>
                                <br />
                            </div>
                        </Col>
                        <Col xs={12} md={10}>
                            <Container>
                                <Row xs={12} md={12} style={{ padding: '5px' }}>
                                    {index.map((i) => {
                                        return (
                                            <>
                                                <Col md={3} style={{ paddingBottom: '20px' }}>
                                                    <Card>
                                                        <div style={{ margin: 'auto' }}>
                                                            <Image
                                                                src={STORE.cart}
                                                                alt="cart"
                                                                width={120}
                                                                height={120}
                                                            />
                                                        </div>
                                                        <Card.Body>
                                                            <Card.Title>Product</Card.Title>
                                                            {/* <Card.Text>
                                                                Some quick example text to build on
                                                                the card title and make up the bulk
                                                                of the card's content.
                                                            </Card.Text> */}
                                                            <div style={{ float: 'right' }}>
                                                                <Button className='btn-primary' variant="primary">
                                                                    Buy
                                                                </Button>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </>
                                        );
                                    })}
                                </Row>
                                <div style={{ float: 'right' }}>
                                    <Pagination>
                                        <Pagination.First />
                                        <Pagination.Prev />
                                        <Pagination.Item>{1}</Pagination.Item>
                                        <Pagination.Ellipsis />

                                        <Pagination.Item>{10}</Pagination.Item>
                                        <Pagination.Item>{11}</Pagination.Item>
                                        <Pagination.Item active>{12}</Pagination.Item>
                                        <Pagination.Item>{13}</Pagination.Item>
                                        <Pagination.Item disabled>{14}</Pagination.Item>

                                        <Pagination.Ellipsis />
                                        <Pagination.Item>{20}</Pagination.Item>
                                        <Pagination.Next />
                                        <Pagination.Last />
                                    </Pagination>
                                    <br/><br/><br/>
                                </div>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}
