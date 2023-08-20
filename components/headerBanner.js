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
import { Border } from '@cloudinary/url-gen/actions';
import Side1 from '../public/newimg/side_1.jpg';

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
    const [listProduct, setListProduct] = useState();
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
            const response = await axios.get('http://localhost:5000/api/products_list', {
                params: {
                    category_id: filterProduct.category_id,
                    name: filterProduct.name,
                    page: pageNumber,
                    perPage: filterProduct.per_page
                }
            });
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
            await axios.get('http://localhost:5000/api/categories').then((response) => {
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
                    .get('http://localhost:5000/api/products_list', {
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
                    .get('http://localhost:5000/api/products_list', {
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

    const Enumclass = () => {
        if (!JSON.parse(localStorage.getItem('json'))) {
            return JSON.parse(localStorage.getItem('json')) ? num : 0;

            return;
        }
        console.log(
            'length ->',
            JSON.parse(localStorage.getItem('json'))
                ? JSON.parse(localStorage.getItem('json')).length
                : 0
        );
        console.log('listcart ->', listcart);
        let d = JSON.parse(localStorage.getItem('json'));
        let num = 0;
        for (let index = 0; index < d.length; index++) {
            const element = d[index];
            num = num + d[index].quantity;
            console.log('-----------', element, num);
        }
        console.log('-----------', num);

        return JSON.parse(localStorage.getItem('json')) ? num : 0;
    };
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
        Enumclass();
    });
    return (
        <>
        {/* // <div> */}
        <Container fluid={'true'} style={{ alignContent: 'center' }}>
        {/* <Row>

            <br />
            </Row> */}
            </Container >

            <Container fluid={'sm'} style={{ alignContent: 'center' }}>

            <Row style={{paddingTop:'25px'}}>
            <Col md={12} xs={12}>
                {/* <h1 style={{textAlign:'center'}}>รู้ก่อนเที่ยว</h1>
                <div style={{padding:'15px'}}>
                <h5>CIRCULAR นำของเสียจากอุตสหากรรมสิ่งทอมาใช้เป็นวัตถุดิบในการผลิต เช่น ของเสียจากภาคการผลิตอุตสาหกรรมแฟชั่น หรือ เศษผ้าจากการตัดเย็บ และ ขยะสิ่งทอแฟชั่น ต่างๆ</h5>
                <h5>CIRCULAR คัดแยกของเสียจากอุตสาหกรรมสิ่งทอตามเฉดสี และ นำมาแปรสภาพเป็นผ้าหลากสี หรือ เสื้อผ้าใหม่ โดยไม่ผ่านกระบวนการฟอกย้อม เพื่อนำกลับมาใช้เป็นสินค้าที่ยั่งยืน และ สร้างผลกระทบที่ดีต่อโลกใบนี้</h5>
                <h5>สิ่งที่ CIRCULAR ทำ ถือเป็นส่วนหนึ่งในการแก้ไขปัญหาสำหรับอนาคตร่วมกันของทุกคนที่เป็นส่วนหนึ่งของโลกใบนี้</h5>
                </div> */}
                

                <br />
                {/* <Row style={{ marginBottom: '15px' }}>
                    <ImageCarousel />
                </Row> */}
            </Col>
        </Row>
    </Container>
        <Container fluid={'true'} style={{ backgroundColor: '#f0f0f0' }}>
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
                        <Col xs={12} md={12} style={{ marginTop: '-100px' }}>
                            <Container >
                                <Row xs={12} md={12} style={{ padding: '5px' }}>
                                    <div className="Destop_side">
                                        <br/>
                                        <h2>PRODUCT</h2>

                                        {/* <Form autoComplete="off" onSubmit={searchFilter}>
                                            <Row>
                                                <Col md={2} xs={12} style={{ padding: '5px' }}>
                                                    <InputGroup>
                                                        <Form.Select
                                                            name={filterProduct.category_id}
                                                            id="category_id"
                                                            onChange={hendleChange}>
                                                            <option key={-1} value={-1}>
                                                                ประเภทอุตสาหกรรม
                                                            </option>
                                                            {listProductCetagory &&
                                                                listProductCetagory.map(
                                                                    (data, index) => {
                                                                        return (
                                                                            <>
                                                                                <option
                                                                                    key={index}
                                                                                    value={data.id}>
                                                                                    {data.name}
                                                                                </option>
                                                                            </>
                                                                        );
                                                                    }
                                                                )}
                                                        </Form.Select>
                                                    </InputGroup>
                                                </Col>
                                                <Col xs={12} md={10} style={{ padding: '5px' }}>
                                                    <InputGroup>
                                                        <Form.Control
                                                            placeholder="Search..."
                                                            aria-label="Search"
                                                            name={filterProduct.name}
                                                            id="name"
                                                            value={filterProduct.name}
                                                            onChange={hendleChange}
                                                        />
                                                        <Button
                                                            variant="outline-secondary"
                                                            type="submit">
                                                            <FaSearch />
                                                        </Button>
                                                        <Button
                                                            variant="outline-secondary"
                                                            onClick={clearFilter}>
                                                            <FaSync />
                                                        </Button>
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                            <br />
                                        </Form> */}
                                        {/* 
                                        <Col xs={12} md={12}>
                                            <div
                                                style={{
                                                    width: '100%',
                                                    // height: '150px'

                                                    position: 'relative'
                                                }}>
                                                <Image
                                                    src={STORE.banner}
                                                    alt="banner"
                                                    objectFit="cover"
                                                />
                                            </div>
                                        </Col> */}
                                        <br />
                                    </div>
                                    {listProduct &&
                                        listProduct.map((data, index) => {
                                            return (
                                                <>
                                                    <Col
                                                        key={index}
                                                        md={3}
                                                        style={{ paddingBottom: '20px' }}>
                                                        <Button
                                                            style={{
                                                                display: 'contents',
                                                                position: 'absolute'
                                                            }}
                                                            // onClick={() => {
                                                            //     setModalShow(true), Productid(data);
                                                            // }}
                                                            >
                                                            <Card key={index}>
                                                                <div style={{ margin: 'auto' }}>
                                                                    <br/>
                                                                    <Image
                                                                        // src={STORE.cart}
                                                                        src={
                                                                            data.image
                                                                                ? data.image
                                                                                : STORE.cart
                                                                        }
                                                                        alt="cart"
                                                                        width={120}
                                                                        height={120}
                                                                    />
                                                                </div>
                                                                <Card.Body
                                                                    style={{ color: 'black' }}>
                                                                    {/* <Card.Title>
                                                                        {data.name}
                                                                    </Card.Title> */}
                                                                    
                                                                    <br />{' '}
                                                                    <Card.Text>
                                                                        {/* สถานที่จำหน่าย : {i.marksell} */}
                                                                    </Card.Text>
                                                                    <Card.Title>
                                                                    {data.name}
                                                                    </Card.Title>
                                                                    <Card.Text>
                                                                    <div>
                                                                        ปริมาณ CF: {data.CO2} kgCO2e
                                                                    </div>
                                                                        สินค้าคาร์บอนต่ำ
                                                                    </Card.Text>
                                                                    <Button variant="primary"
                                                                      onClick={() => {
                                                                        setModalShow(true), Productid(data);
                                                                    }}>
                                                                        รายละเอียด
                                                                    </Button>
                                                                </Card.Body>
                                                            </Card>
                                                        </Button>
                                                    </Col>
                                                </>
                                            );
                                        })}
                                    <MydModalWithGrid
                                        show={modalShow}
                                        data={productid}
                                        onHide={() => setModalShow(false)}
                                    />
                                </Row>
                                <div>
                                    <PaginationCustom
                                        handlePageChange={handlePageChange}
                                        currentPage={page}
                                        totalPages={totalPages}
                                    />
                                    <br />
                                    <br />
                                    <br />
                                </div>
                            </Container>
                        </Col>
                    </Row>
                    <div
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
                        </div>
                </Container>
            </div>
        </Container>
        </>
    );
}
