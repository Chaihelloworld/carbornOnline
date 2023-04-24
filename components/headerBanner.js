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

export default function HeaderBanner(props) {
    const [modalShow, setModalShow] = useState(false);
    const [productid, Productid] = useState();

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
        category_id: null
    });
    // const handleChangeInputSearchFilter = (event) => {
    //     setFilterSearch({ ...filterSearch, [event.target.name]: event.target.value });
    // };
    const [listProductCetagory, setListProductCetagory] = useState();

    const clearFilter = () => {
        setFilterProduct({ ...filterProduct, [name]: '' });
        setFilterProduct({ ...filterProduct, [category_id]: '' });
        searchFilter();
    };
    const hendleChange = (event) => {
        console.log(filterProduct);
        setFilterProduct({ ...filterProduct, [event.target.id]: event.target.value });
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
                            name: filterProduct.name
                        }
                    })
                    .then((response) => {
                        // console.log(response.data);
                        setListProduct(response.data.data);
                    });
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                await axios.get('http://localhost:5000/api/products_list').then((response) => {
                    // console.log(response.data);
                    setListProduct(response.data.data);
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        if (filterProduct.name == '') {
            searchFilter();
        }
        // searchFilter();
    }, [filterProduct.name]);
    useEffect(() => {
        getCategories();
    }, []);
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
                                <Row xs={12} md={12} style={{ padding: '5px' }}>
                                    <div className="Destop_side">
                                        <Form autoComplete="off" onSubmit={searchFilter}>
                                            <Row>
                                                <Col md={2} xs={12} style={{ padding: '5px' }}>
                                                    <InputGroup>
                                                        <Form.Select
                                                            name={filterProduct.category_id}
                                                            id="category_id"
                                                            onChange={hendleChange}>
                                                            {/* <option> ประเภทสินค้า</option>
                                                            <option value={1}>ของใช้</option>
                                                            <option value={2}>อาหาร</option> */}
                                                            <option key={-1} value={-1}>
                                                                ประเภทอุตสาหกรรม
                                                            </option>
                                                            {listProductCetagory &&
                                                                listProductCetagory.map(
                                                                    (data, index) => {
                                                                        return (
                                                                            <option
                                                                                key={index}
                                                                                value={data.id}>
                                                                                {data.name}
                                                                            </option>
                                                                        );
                                                                    }
                                                                )}
                                                        </Form.Select>
                                                    </InputGroup>
                                                </Col>
                                                <Col md={2} xs={12} style={{ padding: '5px' }}>
                                                    <Form.Select>
                                                        <option>จังหวัด</option>
                                                    </Form.Select>
                                                </Col>
                                                <Col xs={12} md={8} style={{ padding: '5px' }}>
                                                    <InputGroup>
                                                        <Form.Control
                                                            placeholder="Search..."
                                                            aria-label="Search"
                                                            enterKeyHint=""
                                                            name={filterProduct.name}
                                                            id="name"
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
                                        </Form>

                                        <Col xs={12} md={12}>
                                            <div
                                                style={{
                                                    width: '100%',
                                                    // height: '150px'

                                                    position: 'relative'

                                                }}>
                                                <Image src={STORE.banner} alt="banner" 
                                                   objectFit="cover"

                                                  />
                                            </div>
                                        </Col>
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
                                                            onClick={() => {
                                                                setModalShow(true), Productid(data);
                                                            }}>
                                                            <Card key={index}>
                                                                <div style={{ margin: 'auto' }}>
                                                                    <Image
                                                                        src={STORE.cart}
                                                                        // src={`${i.img}`}
                                                                        alt="cart"
                                                                        width={120}
                                                                        height={120}
                                                                    />
                                                                </div>
                                                                <Card.Body
                                                                    style={{ color: 'black' }}>
                                                                    <Card.Title>
                                                                        {data.name}
                                                                    </Card.Title>
                                                                    <div>
                                                                        ปริมาณ CF: {data.CO2} kgCO2e
                                                                    </div>
                                                                    <br />{' '}
                                                                    <Card.Text>
                                                                        {/* สถานที่จำหน่าย : {i.marksell} */}
                                                                    </Card.Text>
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
