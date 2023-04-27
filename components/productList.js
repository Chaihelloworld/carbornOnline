import AOS from 'aos';
import 'aos/dist/aos.css';
import { Container, Row, Col, Button, Card, Form, Pagination, InputGroup,Spinner } from 'react-bootstrap';
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
import { FaSearch, FaSync, FaFilter, FaRegClipboard } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import { MdAdd } from 'react-icons/md';
import { getStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../libs/firebase';
import firebase from '../libs/firebase';
import { fill } from '@cloudinary/url-gen/actions/resize';
import Swal from 'sweetalert2'

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
    const [listProduct, setListProduct] = useState();
    const [filterProduct, setFilterProduct] = useState({
        name: '',
        category_id: null
    });
    // const handleChangeInputSearchFilter = (event) => {
    //     setFilterSearch({ ...filterSearch, [event.target.name]: event.target.value });
    // };
    const clearFilter = () => {
        setFilterProduct({ ...filterProduct, [name]: '' });
        setFilterProduct({ ...filterProduct, [category_id]: '' });
        searchFilter();
    };
    const hendleChange = (event) => {
        setFilterProduct({ ...filterProduct, [event.target.id]: event.target.value });
    };
  const [isLoading,setLoading] = useState(false)
    const searchFilter = async (event) => {
        setLoading(true)
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
                        setLoading(false)

                    });
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                await axios.get('http://localhost:5000/api/products_list').then((response) => {
                    // console.log(response.data);
                    setListProduct(response.data.data);
                    setLoading(false)

                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    const deleteProduct = async (id) => {

        Swal.fire({
            title: 'คุณต้องการลบรายการนี้ ใช่หรือไม่',
            showCloseButton: true,
            icon: 'error',
            reverseButtons: true,
            showCancelButton: true,
            confirmButtonText: `ยืนยัน`,
            cancelButtonColor: '#d33',
            cancelButtonText: 'ยกเลิก'
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (result.isConfirmed) {
                    try {
                        console.log(id);
                        await axios
                            .delete(`http://localhost:5000/api/delete_product?id=${id}`)
                            .then((response) => {
                                console.log(response);
                                searchFilter();
                            });
                    } catch (error) {
                        console.log(error);
                    }
            }
        }});
    };
    useEffect(() => {
        if (filterProduct.name == '') {
            searchFilter();
        }
        // searchFilter();
    }, [filterProduct.name]);
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
                                                            <option> ประเภทสินค้า</option>
                                                            <option value={1}>ของใช้</option>
                                                            <option value={2}>อาหาร</option>
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
                                                <Image
                                                    src={STORE.banner}
                                                    alt="banner"
                                                    objectFit="cover"
                                                />
                                            </div>
                                        </Col>
                                        <br />
                                    </div>
                                    <div>
                                        <Button
                                            variant="primary"
                                            size="md"
                                            style={{
                                                float: 'right',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                            onClick={() => {
                                                router.push('/createStore');
                                            }}>
                                            <MdAdd fontSize={'25px'} />
                                            เพิ่มข้อมูล
                                        </Button>{' '}
                                        <br />
                                    </div>
                                    <Table striped>
                                        <thead>
                                            <tr align="center">
                                                <th>#</th>
                                                <th>รูป Product</th>
                                                <th>ชื่อ Product</th>
                                                <th>Carbon (CO2Kg)</th>
                                                <th>ประเภท</th>
                                                <th>จัดการ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { listProduct && !isLoading ?
                                                listProduct.map((data, index) => {
                                                    return (
                                                        <tr
                                                            key={index}
                                                            style={{
                                                                fontSize: '16px',
                                                                paddingTop: '25px'
                                                            }}>
                                                            <td
                                                                align="center"
                                                                style={{ paddingTop: '25px' }}>
                                                                {index + 1}
                                                            </td>
                                                            <td align="center">
                                                                <Image
                                                                    src={data.image}
                                                                    alt="My Image"
                                                                    width={50}
                                                                    height={50}
                                                                />
                                                                {/* <Image src={myImage} /> */}
                                                                {/* {data.image} */}
                                                                {/* {data.image} */}
                                                                {/* {Preview(`${data.image}`)} */}
                                                            </td>
                                                            <td
                                                                align="center"
                                                                style={{ paddingTop: '25px' }}>
                                                                {data.name}
                                                            </td>
                                                            <td
                                                                align="center"
                                                                style={{ paddingTop: '25px' }}>
                                                                {' '}
                                                                {data.CO2}
                                                            </td>
                                                            <td
                                                                align="center"
                                                                style={{ paddingTop: '25px' }}>
                                                                {data.category_name}
                                                            </td>
                                                            <td
                                                                align="center"
                                                                style={{ paddingTop: '20px' }}>
                                                                {/* <Button size='sm' style={{ backgroundColor: '#ac2bac' ,borderRadius:'50%'}} href='#'> */}
                                                                <Button
                                                                    variant="link"
                                                                    onClick={() => {
                                                                        setModalShow(true),
                                                                            Productid(data);
                                                                    }}>
                                                                    {' '}
                                                                    <FaRegClipboard fontSize={18} />
                                                                </Button>

                                                                <Button
                                                                    variant="link"
                                                                    onClick={() => {
                                                                        deleteProduct(data.id);
                                                                    }}>
                                                                    {' '}
                                                                    <FaRegClipboard fontSize={18} />
                                                                </Button>
                                                                {/* </Button> */}
                                                            </td>
                                                        </tr>
                                                    );
                                                }): 
                                                <tr>
                                                <td colSpan="16" style={{ textAlign: 'center' }}>
                                                  <div style={{ display: 'inline-block' }}>
                                                  <Spinner animation="border" variant="success" />

                                                  </div>
                                                </td>
                                              </tr>
                                                }
                                        </tbody>
                                    </Table>
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
