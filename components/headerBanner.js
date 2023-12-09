import AOS from 'aos';
import 'aos/dist/aos.css';
import { Container, Row, Col, Button, Card, Form, Pagination, InputGroup } from 'react-bootstrap';
import styles from '../styles/headerBanner.module.scss';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import STORE from '../libs/store.image';
import Image from 'next/image';
import data from './product.json';
import MydModalWithGrid from './modal';
import axios from 'axios';
import Top_Products from './TopProducts';
import { FaSearch, FaSync, FaFilter } from 'react-icons/fa';
import PaginationCustom from './pagination';
// import { Border } from '@cloudinary/url-gen/actions';
import Side1 from '../public/newimg/side_1.jpg';
import Cookies from 'js-cookie';

export default function HeaderBanner(props) {
    const [modalShow, setModalShow] = useState(false);
    const [productid, Productid] = useState();
    // const [modalShow, setModalShow] = useState(false);

    const router = useRouter();
    const [modalRegister, setModalResgister] = useState(false);

    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        AOS.init();
        // fetchLink();
    }, []);
    const [listProduct, setListProduct] = useState([]);
    const [filterProduct, setFilterProduct] = useState({
        name: '',
        category_id: null,
        page: 1,
        per_page: 16
    });
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    // const handleChangeInputSearchFilter = (event) => {
    //     setFilterSearch({ ...filterSearch, [event.target.name]: event.target.value });
    // };
    const [listProductCetagory, setListProductCetagory] = useState();
    const [isLoading, setLoading] = useState(false);
    const [tigger, setTigger] = useState(false);

    const clearFilter = () => {
        setFilterProduct({
            ...filterProduct,
            name: '',
            category_id: null,
            page: 1,
            per_page: 16
        });
        console.log('cear', filterProduct);

        // router.push('/')

        // location.reload();
        router.push('/products');
        setTigger(!tigger);

        // getCategories();
        // searchFilter();
    };

    const submitmodal = (e) => {
        // console.log('is submit ->', e);
    };
    const handlePageChange = async (pageNumber) => {
        setLoading(true);
        try {
            const response = await axios.get(
                'https://api.carbon-greentravel.com/api/products_list',
                {
                    params: {
                        category_id: filterProduct.category_id,
                        name: filterProduct.name,
                        page: pageNumber,
                        perPage: filterProduct.per_page
                    }
                }
            );
            setListProduct(response.data.data);
            setPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    const hendleChange = (event) => {
        if (event.target.id == 'category_id' && event.target.value == -1) {
            // console.log(filterProduct);

            setFilterProduct({ ...filterProduct, [event.target.id]: null });
        } else {
            setFilterProduct({ ...filterProduct, [event.target.id]: event.target.value });
        }
    };
    const getCategories = async (event) => {
        try {
            await axios
                .get('https://api.carbon-greentravel.com/api/categories')
                .then((response) => {
                    console.log(response.data.data);
                    setListProductCetagory(response.data.data);
                });
        } catch (error) {
            console.log(error);
        }
    };
    const searchFilter = async (event) => {
        if (event) {
            event.preventDefault();
            try {
                await axios
                    .get('https://api.carbon-greentravel.com/api/products_list', {
                        params: {
                            category_id: filterProduct.category_id,
                            name: filterProduct.name,
                            page: filterProduct.page,
                            perPage: filterProduct.per_page
                        }
                    })
                    .then((response) => {
                        // console.log(response.data);
                        setListProduct(response.data.data);
                        setPage(response.data.currentPage);
                        setTotalPages(response.data.totalPages);
                    });
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                await axios
                    .get('https://api.carbon-greentravel.com/api/products_list', {
                        params: {
                            category_id: filterProduct.category_id,
                            name: filterProduct.name,
                            page: filterProduct.page,
                            perPage: filterProduct.per_page
                        }
                    })
                    .then((response) => {
                        // console.log(response.data);
                        setListProduct(response.data.data);
                        setPage(response.data.currentPage);
                        setTotalPages(response.data.totalPages);
                    });
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        getCategories();
        searchFilter();
    }, [filterProduct.page, filterProduct.perPage, tigger]);
    const [toggle, setToggle] = useState(localStorage.getItem('toggle') == 'true' ? true : false);
    const [listcart, setCart] = useState(JSON.parse(localStorage.getItem('json')));
    const [totalCount, setTotal_count] = useState(0);

    useEffect(() => {
        if (listcart == null) {
            getCategories();
            // Enumclass();
            return;
        }
        getCategories();
        if (toggle == false) {
            return;
        }
        localStorage.setItem('toggle', 'false');
    }, [listcart]);
    // console.log(setFilter_Product);
    useEffect(() => {
        const Enumclass = async () => {
            try {
                await axios
                    .get('https://api.carbon-greentravel.com/api/cart_count', {
                        params: {
                            user_id: Cookies.get('user_idCk') ? Cookies.get('user_idCk') : 0
                        }
                    })
                    .then((response) => {
                        console.log(response);
                        setTotal_count(response.data.data[0].total_count);
                    });
            } catch (error) {
                console.log(error);
            }
        };
        Enumclass();
    });
    return (
        <>
            {/* // <div> */}

            <Container>
                <div
                    style={{
                        // display: 'flex',
                        position: 'sticky',
                        zIndex: 999,
                        backgroundColor: '#FFF',
                        height: 100,
                        top: 0.5
                        // justifyContent: 'center'
                    }}>
                    <Form autoComplete="off" onSubmit={searchFilter}>
                        <Row style={{ padding: 25 }}>
                            <Col md={2} xs={12} style={{ padding: '5px' }}>
                                <InputGroup>
                                    <Form.Select
                                        name="category_id"
                                        value={filterProduct.category_id}
                                        id="category_id"
                                        onChange={hendleChange}>
                                        <option key={-1} value={-1}>
                                            ประเภทอุตสาหกรรม
                                        </option>
                                        {listProductCetagory &&
                                            listProductCetagory.map((data, index) => {
                                                return (
                                                    <>
                                                        <option key={index} value={data.id}>
                                                            {data.name}
                                                        </option>
                                                    </>
                                                );
                                            })}
                                    </Form.Select>
                                </InputGroup>
                            </Col>
                            <Col xs={12} md={10} style={{ padding: '5px' }}>
                                <InputGroup>
                                    <Form.Control
                                        placeholder="Search..."
                                        aria-label="Search"
                                        enterKeyHint=""
                                        name="name"
                                        id="name"
                                        value={filterProduct.name}
                                        autoComplete="off"
                                        onKeyPress={(ev) => {
                                            if (ev.key === 'Enter') {
                                                ev.preventDefault();
                                                searchFilter();
                                            }
                                        }}
                                        onChange={hendleChange}
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        // type="submit"
                                        disableElevation
                                        onClick={() => {
                                            searchFilter();
                                        }}>
                                        <FaSearch />
                                    </Button>
                                    <Button variant="outline-secondary" onClick={clearFilter}>
                                        <FaSync />
                                    </Button>
                                </InputGroup>
                            </Col>
                        </Row>
                        <br />
                    </Form>
                </div>
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

                    {/* <div
                            className={styles.btncart_content}
                        >
                            <Button
                                className={styles.btncart}
                                onClick={()=> router.push('/calculateCO2')}
                            >
                                <div
                                    style={{
                                        height: '25px',
                                        width: '25px',
                                        backgroundColor: 'red',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        display: 'inline-block',
                                        transform: 'translate(50px, 40px)',
                                        zIndex: 999
                                    }}>
                                        {Enumclass()}
                                    
                                </div>
                                <Image
                                    // src={STORE.cart}
                                    src={STORE.IconCal}
                                    alt="cart"
                                    width={70}
                                    height={70}
                                />
                            </Button>
                        </div> */}
                    <Col xs={12} md={12} style={{ marginTop: '0' }}>
                        <Container>
                            <br />

                            <div>
                                <Row
                                    xs={1}
                                    md={4}
                                    className="g-2"
                                    style={{
                                        height: 'auto',
                                        overflowX: 'auto',
                                        marginTop: '-25px',
                                        padding: '25px'
                                    }}>
                                    {listProduct && listProduct.length > 0 ? (
                                        listProduct.map((data, index) => (
                                            <Col key={index}>
                                                <Card
                                                    style={{
                                                        border: 'none',
                                                        minHeight: '150px',
                                                        border: '1px solid #f0f0f0'
                                                    }}>
                                                    <div className="text-center">
                                                        {data.image ? (
                                                            <Image
                                                                src={
                                                                    data.image
                                                                        ? data.image
                                                                        : STORE.cart
                                                                }
                                                                alt="cart"
                                                                width={120}
                                                                height={120}
                                                                className="mt-3"
                                                            />
                                                        ) : (
                                                            <Image
                                                                src={STORE.cart}
                                                                alt="cart"
                                                                width={120}
                                                                height={120}
                                                                className="mt-3"
                                                            />
                                                        )}
                                                    </div>
                                                    <Card.Body className="text-center">
                                                        <Card.Title>{data.name}</Card.Title>
                                                        <Card.Text>
                                                            <div>ปริมาณ CF: {data.CO2} kgCO2e</div>
                                                            สินค้าคาร์บอนต่ำ
                                                        </Card.Text>
                                                        <Button
                                                            variant="primary"
                                                            onClick={() => {
                                                                setModalShow(true);
                                                                Productid(data);
                                                            }}>
                                                            รายละเอียด
                                                        </Button>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))
                                    ) : (
                                        <Col md={12}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center'
                                                }}>
                                                <p>ไม่พบข้อมูล</p>
                                            </div>
                                        </Col>
                                    )}
                                </Row>
                                <MydModalWithGrid
                                    show={modalShow}
                                    data={productid}
                                    onHide={() => setModalShow(false)}
                                />
                            </div>
                        </Container>
                    </Col>
                </Row>

                <br />
                <PaginationCustom
                    handlePageChange={handlePageChange}
                    currentPage={page}
                    totalPages={totalPages}
                />

                <div className={styles.btncart_content}>
                    <Button className={styles.btncart} onClick={() => router.push('/calculateCO2')}>
                        <div
                            style={{
                                height: '25px',
                                width: '25px',
                                backgroundColor: 'red',
                                borderRadius: '50%',
                                position: 'absolute',
                                display: 'inline-block',
                                transform: 'translate(50px, 40px)',
                                zIndex: 999
                            }}>
                            {totalCount ? totalCount : 0}
                        </div>
                        <Image
                            // src={STORE.cart}
                            src={STORE.IconCal}
                            alt="cart"
                            width={70}
                            height={70}
                        />
                    </Button>
                </div>
            </Container>
        </>
    );
}
