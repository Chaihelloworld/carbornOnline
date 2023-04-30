import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    Form,
    Pagination,
    InputGroup,
    Spinner
} from 'react-bootstrap';
import styles from '../styles/headerBanner.module.scss';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import STORE from '../libs/store.image';
import Image from 'next/image';
import data from './product.json';
import Cookie from 'js-cookie';

import MydModalWithGrid from './modal';
import axios from 'axios';
import Top_Products from './TopProducts';
import { FaSearch, FaSync, FaFilter, FaRegClipboard, FaTimes } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import { MdAdd } from 'react-icons/md';
import { getStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../libs/firebase';
import firebase from '../libs/firebase';
import { fill } from '@cloudinary/url-gen/actions/resize';
import Swal from 'sweetalert2';
import PaginationCustom from './pagination';
import { CloudinaryImage } from '@cloudinary/url-gen';
export default function HeaderBanner(props) {
    const [modalShow, setModalShow] = useState(false);
    const [productid, Productid] = useState();

    const [modalRegister, setModalResgister] = useState(false);

    const [trigger, setTrigger] = useState(false);
    const router = useRouter();
    useEffect(() => {
        AOS.init();
        // fetchLink();
    }, []);

    const [getLogin, setGetLogin] = useState({
        email: '',
        password: ''
    });
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);

    const [listProductCetagory, setListProductCetagory] = useState();

    const handleChange = (event) => {
        setGetLogin({ ...getLogin, [event.target.name]: event.target.value });
        console.log('event-name', event.target.name);
        console.log('event-value', event.target.value);
    };

    const [isLoading, setLoading] = useState(false);
    const expirationDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); // 7 days from now
    const Login = async () => {
        setLoading(true);
        try {
            await axios
                .post(`http://localhost:5000/api/login`, {
                    email: getLogin.email,
                    password: getLogin.password
                })
                .then((res) => {
                    console.log(res.data.token);
                    Cookie.set('name', res.data.user.name);
                    Cookie.set('token', res.data.token, { expires: expirationDate });
                    router.push('/productList');
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
        }
    };

    // console.log(setFilter_Product);
    return (
        <div>
            <div className={styles.x_banner_header}>
                <Container>
                    <Row>
                        <style jsx>{`
                            .paddingDestop {
                                padding: 30px;
                                display: none;
                            }
                            @media (min-width: 991.98px) {
                                .paddingDestop {
                                    display: none;
                                    padding: 2px;
                                }
                            }
                            @media (min-width: 791.98px) {
                                .paddingDestop {
                                    padding: 0px;
                                    display: none;
                                }
                            }
                            .btn-primary {
                                color: #fff;
                                background-color: #007a06;
                                border-color: #007a06;
                            }
                        `}</style>

                        <Col xs={12} md={12}>
                            <Container>
                                <Row xs={12} md={12} style={{ padding: '5px', paddingTop: '15%' }}>
                                    <div
                                        className="Destop_side"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <Card
                                            bg={'Success'}
                                            text={'white'}
                                            style={{
                                                width: '25rem',
                                                height: '100%',
                                                background: '#007a06'
                                            }}
                                            className="mb-2">
                                            <Card.Body style={{ margin: 'auto' }}>
                                                <Image src={STORE.logo} width={250} alt="logo" />
                                                <div
                                                    style={{
                                                        fontSize: '18px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column',
                                                        alignItems: 'center'
                                                    }}>
                                                    {' '}
                                                    <p>
                                                        เข้าสู่ระบบ <br />
                                                    </p>
                                                    <p>Carbon Green Travel </p>
                                                </div>

                                                <Form>
                                                    <Form.Group className="mb-1">
                                                        <Form.Label>Username</Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            placeholder="Enter email"
                                                            aria-autocomplete="false"
                                                            key="email"
                                                            id="email"
                                                            value={getLogin.email}
                                                            name="email"
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>

                                                    <Form.Group
                                                        className="mb-1"
                                                        aria-autocomplete="false">
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control
                                                            key="password"
                                                            id="password"
                                                            value={getLogin.password}
                                                            name="password"
                                                            onChange={handleChange}
                                                            aria-autocomplete="false"
                                                            type="password"
                                                            placeholder="Password"
                                                        />
                                                    </Form.Group>
                                                    <br />
                                                    <Button
                                                        style={{ width: '-webkit-fill-available' }}
                                                        variant="primary"
                                                        onClick={Login}
                                                        // type="submit"
                                                    >
                                                        ลงชื่อเข้าใช้
                                                    </Button>
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                        <br />
                                    </div>
                                </Row>
                                <div style={{ float: 'right' }}>
                                    <br />
                                    <br />
                                    <br />
                                </div>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}
