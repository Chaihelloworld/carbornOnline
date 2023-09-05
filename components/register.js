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

// import MydModalWithGrid from './modal';
import axios from 'axios';
// import Top_Products from './TopProducts';
// import { FaSearch, FaSync, FaFilter, FaRegClipboard, FaTimes } from 'react-icons/fa';
// import Table from 'react-bootstrap/Table';
// import { MdAdd } from 'react-icons/md';
// import { getStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import { storage } from '../libs/firebase';
// import firebase from '../libs/firebase';
// import { fill } from '@cloudinary/url-gen/actions/resize';
// import Swal from 'sweetalert2';
// import PaginationCustom from './pagination';
// import { CloudinaryImage } from '@cloudinary/url-gen';
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
        name: '',
        email: '',
        password: '',
        CF_password: '',
        role: '1'
    });
    const [totalPages, setTotalPages] = useState(0);
    const [text, setText] = useState('');

    const [listProductCetagory, setListProductCetagory] = useState();

    const handleChange = (event) => {
        setGetLogin({ ...getLogin, [event.target.name]: event.target.value });
        // console.log('event-name', event.target.name);
        // console.log('event-value', event.target.value);
    };

    const [isLoading, setLoading] = useState(false);
    const expirationDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); // 7 days from now
    const register = async () => {
        if (getLogin.CF_password !== getLogin.password) {
            setText('**กรุณากรอก รหัสผ่านให้ตรงกัน');
            return null;
        }
        setLoading(true);
        try {
            await axios
                .post(`https://api.carbon-greentravel.com/api/register`, {
                    name: getLogin.name,
                    email: getLogin.email,
                    password: getLogin.password,
                    role: getLogin.role
                })
                .then((res) => {
                    // console.log(res.data.token);
                    login(getLogin.email, getLogin.password);
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
        }
    };
    const login = async (username, password) => {
        if (getLogin.CF_password !== getLogin.password) {
            setText('**กรุณากรอก รหัสผ่านให้ตรงกัน');
            return null;
        }
        setLoading(true);
        try {
            await axios
                .post(`https://api.carbon-greentravel.com/api/login`, {
                    email: username,
                    password: password
                })
                .then((res) => {
                    // console.log(res.data.token);
                    Cookie.set('name', res.data.user.name);
                    Cookie.set('token', res.data.token, { expires: expirationDate });
                    router.push('/productList');
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (getLogin.CF_password !== getLogin.password) {
            return;
        }
        setText('');
    }, [text]);
    // console.log(setFilter_Product);
    return (
        <div>
            <div className={styles.x_banner_header}>
                <Container>
                    {/* <Row> */}
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

                    {/* <Col xs={12} md={12}> */}
                    {/* <Container> */}
                    <Row xs={12} md={8}>
                        <div className="Destop_side">
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
                                    สมัครสมาชิก <br />
                                </p>
                                {/* <p>Carbon Green Travel </p> */}
                            </div>
                            <Form
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <Col xs={8} md={3}>
                                    <Form.Group className="mb-3">
                                        {/* <Form.Label>Password</Form.Label> */}
                                        <Form.Control
                                            key="name"
                                            placeholder="ชื่อผู้ใช้"
                                            id="name"
                                            value={getLogin.name}
                                            name="name"
                                            onChange={handleChange}
                                            aria-autocomplete="off"
                                            autoComplete="off"
                                            type="text"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={8} md={3}>
                                    <Form.Group className="mb-3">
                                        {/* <Form.Label>Username</Form.Label> */}
                                        <Form.Control
                                            placeholder="Email"
                                            type="email"
                                            aria-autocomplete="off"
                                            autoComplete="off"
                                            key="email"
                                            id="email"
                                            value={getLogin.email}
                                            name="email"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={8} md={3}>
                                    <Form.Group className="mb-3" >
                                        {/* <Form.Label>Password</Form.Label> */}
                                        <Form.Control
                                            key="password"
                                            placeholder="Password"
                                            id="password"
                                            value={getLogin.password}
                                            name="password"
                                            onChange={handleChange}
                                            aria-autocomplete="off"
                                            autoComplete="off"
                                            type="password"
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={8} md={3}>
                                    <Form.Group className="mb-3" >
                                        {/* <Form.Label>Password</Form.Label> */}
                                        <Form.Control
                                            key="CF_password"
                                            placeholder="ยืนยัน Password"
                                            id="CF_password"
                                            value={getLogin.CF_password}
                                            name="CF_password"
                                            onChange={handleChange}
                                            aria-autocomplete="off"
                                            autoComplete="off"
                                            type="password"
                                            error={getLogin.CF_password !== getLogin.password}
                                        />
                                    </Form.Group>
                                </Col>
                                <p style={{ color: 'red' }}>{text}</p>
                                <Col xs={8} md={3}>
                                    <Button
                                        style={{ width: '-webkit-fill-available' }}
                                        variant="primary"
                                        onClick={register}
                                        // type="submit"
                                    >
                                        ยืนยัน
                                    </Button>
                                    {/* <Button
                                        style={{ width: '-webkit-fill-available' }}
                                        variant="outlet"
                                        onClick={Login}
                                        // type="submit"
                                    >
                                        สมัครสมาชิก
                                    </Button> */}
                                    {/* <Button
                                        style={{ width: '-webkit-fill-available' ,color:'black',marginTop:'5px'}}
                                        variant="outline-light" >
                                        สมัครสมาชิก
                                    </Button>{' '} */}
                                </Col>
                            </Form>
                            {/* </Card.Body>
                                        </Card> */}
                            <br />
                        </div>
                    </Row>
                    <div style={{ float: 'right' }}>
                        <br />
                        <br />
                        <br />
                    </div>
                    {/* </Container> */}
                    {/* </Col> */}
                    {/* </Row> */}
                </Container>
            </div>
        </div>
    );
}
