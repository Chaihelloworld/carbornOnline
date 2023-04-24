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
import Table from 'react-bootstrap/Table';
import { MdAdd } from 'react-icons/md';

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
    const [listProductCetagory, setListProductCetagory] = useState();
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
    const [selectedImage, setSelectedImage] = useState(null);

    const handleFileInputChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submit here
    };
    const searchFilter = async (event) => {
        try {
            await axios.get('http://localhost:5000/api/categories').then((response) => {
                // console.log(response.data);
                setListProductCetagory(response.data.data);
            });
        } catch (error) {
            console.log(error);
        }
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
                                        <Col xs={12} md={12}>
                                            <div
                                                style={{
                                                    background: 'green',
                                                    width: '100%',
                                                    height: '10px'
                                                }}></div>
                                        </Col>
                                        <br />
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center'
                                            }}>
                                            <h4> เพิ่มข้อมูล ผลิตภัณฑ์</h4>
                                        </div>
                                        <br />

                                        <Col xs={12} md={12}>
                                            <div
                                                style={{
                                                    background: 'green',
                                                    width: '100%',
                                                    height: '10px'
                                                }}></div>
                                        </Col>
                                        <br />
                                        <br />
                                    </div>
                                    <Col md={4}>
                                        <Form>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center'
                                                }}>
                                                {selectedImage ? (
                                                    <div
                                                        style={{
                                                            width: '300px',
                                                            height: '300px',
                                                            position: 'relative'
                                                        }}>
                                                        <Image
                                                            src={URL.createObjectURL(selectedImage)}
                                                            alt="Selected Image"
                                                            width="400px"
                                                            height="300px"
                                                            layout="fill"
                                                            objectFit="cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div
                                                        style={{
                                                            width: '300px',
                                                            height: '300px',
                                                            position: 'relative'
                                                        }}>
                                                        <Image
                                                            src={STORE.cart}
                                                            width="300px"
                                                            height="300px"
                                                            alt="Picture of the author"
                                                            layout="fill"
                                                            // objectFit="cover"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center'
                                                }}>
                                                <label
                                                    for="inputField"
                                                    style={{
                                                        color: '#FFF',
                                                        background: '#008000',
                                                        padding: '10px',
                                                        borderRadius: '5px'
                                                    }}>
                                                    เลือกรูป
                                                </label>

                                                <input
                                                    id="inputField"
                                                    type="file"
                                                    style={{ display: 'none' }}
                                                    accept="image/*"
                                                    onChange={handleFileInputChange}
                                                />
                                            </div>

                                            {/* <button type="submit">Upload</button> */}
                                        </Form>
                                    </Col>
                                    <Col md={8}>
                                        <Form>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1">
                                                <Form.Label>ชื่อ ผลิตภัณฑ์</Form.Label>
                                                <Form.Control type="text" />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>รายละเอียด ผลิตภัณฑ์</Form.Label>
                                                <Form.Control as="textarea" rows={3} />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1">
                                                <Form.Label>ค่า CO2Kg</Form.Label>
                                                <Form.Control type="number" />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1">
                                                <Form.Select aria-label="Default select example">
                                                    <option key={-1} value={-1}>
                                                        ประเภทอุตสาหกรรม
                                                    </option>
                                                    {listProductCetagory &&
                                                        listProductCetagory.map((data, index) => {
                                                            return (
                                                                <option key={index} value={data.id}>
                                                                    {data.name}
                                                                </option>
                                                            );
                                                        })}
                                                </Form.Select>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col
                                        md={12}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}>
                                        <br />
                                        <Button
                                            variant="primary"
                                            size="md"
                                            style={{
                                                // float: 'right',
                                                width: '150px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                            onClick={() => {
                                                router.push('/createStore');
                                            }}>
                                            {/* <MdAdd fontSize={'25px'} /> */}
                                            สร้าง
                                        </Button>{' '}
                                        <Button
                                            variant="secondary"
                                            size="md"
                                            color="secondary"
                                            style={{
                                                // float: 'right',
                                                width: '150px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginLeft: '15px'
                                            }}
                                            onClick={() => {
                                                router.push('/createStore');
                                            }}>
                                            {/* <MdAdd fontSize={'25px'} /> */}
                                            ย้อนกลับ
                                        </Button>{' '}
                                        <br />
                                        <br />
                                    </Col>
                                </Row>

                                {/* <div style={{ float: 'right' }}>
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
                                </div> */}
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}
