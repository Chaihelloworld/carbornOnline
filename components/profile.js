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
import stylesPf from '../styles/profiles.module.scss';
import * as dayjs from 'dayjs';

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
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Accordion from 'react-bootstrap/Accordion';
import Cookies from 'js-cookie';

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
        // console.log('event-name', event.target.name);
        // console.log('event-value', event.target.value);
    };

    const [isLoading, setLoading] = useState(false);
    const expirationDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); // 7 days from now
    const Login = async () => {
        setLoading(true);
        try {
            await axios
                .post(`https://api.carbon-greentravel.com/api/login`, {
                    email: getLogin.email,
                    password: getLogin.password
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
    const [listHistory, setListHistory] = useState([]);
    useEffect(() => {
        const Getlist_history = async () => {
            setLoading(true);
            try {
                await axios
                    .get(`https://api.carbon-greentravel.com/api/historycart?user_id=${Cookies.get('user_idCk')}`)
                    .then((res) => {
                        setListHistory(res.data.data);
                    });
            } catch (error) {
                console.log(error);
            }
        };
        Getlist_history();
    }, []);
    const calcal = (x) => {
        var y = +x;
        return y;
    };
    // console.log(listHistory);
    return (
        <div>
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
                    <div style={{ textAlign: 'center' }}>
                        <img
                            src="https://picsum.photos/id/1011/500/500"
                            className={stylesPf.avatar__image}
                        />
                        <br />
                        <p style={{ fontSize: '16px' }}>Hi , {Cookies.get('name')}</p>
                    </div>
                </Row>
                {/* <Row xs={12} md={12} className={stylesPf.body}> */}
                <Tabs defaultActiveKey="profile" id="fill-tab-example" className="mb-3" fill>
                    {/* <Tab eventKey="home" title="Home">
                        Tab content for Home
                    </Tab> */}
                    <Tab eventKey="profile" title="ประวัติกิจกรรม">
                        <Accordion defaultActiveKey="0">
                            {listHistory &&
                                listHistory.map((data, index) => {
                                    // console.log(JSON.parse(data.dataset));
                                    // let dataset = JSON.parse(data.dataset)
                                    return (
                                        <Accordion.Item eventKey={index} key={index}>
                                            <Accordion.Header>
                                                <div>
                                                    <a>{data.name} - วันที่ {dayjs(data.createdate).format(
                                                            'DD/MM/YYYY'
                                                        )}</a>
                                                </div>
                                             
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                {JSON.parse(data.dataset) ? (
                                                    JSON.parse(data.dataset).map(
                                                        (dataX, subIndex) => (
                                                            <>
                                                                <div
                                                                    style={{
                                                                        display: 'flex',
                                                                        flexDirection: 'row',
                                                                        justifyContent:
                                                                            'space-between'
                                                                    }}>
                                                                    <a key={subIndex}>
                                                                        {dataX.product_name}
                                                                    </a>
                                                                    <a key={subIndex}>
                                                                        {dataX.total_cart_count}
                                                                    </a>
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        display: 'flex',
                                                                        flexDirection: 'row',
                                                                        justifyContent:
                                                                            'space-between'
                                                                    }}>
                                                                    <a key={subIndex}>
                                                                        รวมพลังงานที่ใช้ทั้งหมด
                                                                    </a>
                                                                    <a key={subIndex}>
                                                                        {calcal(dataX.sumTotal)}
                                                                    </a>
                                                                </div>
                                                            </>
                                                        )
                                                    )
                                                ) : (
                                                    <p>No datasets available</p>
                                                )}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    );
                                })}
                        </Accordion>
                    </Tab>
                </Tabs>
                {/* </Row> */}
                {/* </Container> */}
                {/* </Col> */}
                {/* </Row> */}
            </Container>
        </div>
    );
}
