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
import { storage } from '../libs/firebase';
import { getStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import Swal from 'sweetalert2';

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
    const [paramData, setParamData] = useState({
        name: '',
        description: '',
        image: '',
        CO2: 0,
        // type_products: [],
        category_id: 0
    });
    const [urls, setUrl] = useState();

    const handleChangeInputSearchFilter = (event) => {
        setFilterSearch({ ...filterSearch, [event.target.name]: event.target.value });
    };

    // const fileRef = ref(storage, 'images/322009532_612865703940880_7966293539931641968_n.pngea9ff755-edd7-4cc3-8ec5-dc10ef31006b');
    // useEffect(() => {
    //     getDownloadURL(fileRef)
    //         .then((url) => {
    //             // Use the URL to download the file or display it in your application
    //             console.log(url);
    //         })
    //         .catch((error) => {
    //             // Handle any errors
    //         });
    // });
    const clearFilter = () => {
        setFilterProduct({ ...filterProduct, [name]: '' });
        setFilterProduct({ ...filterProduct, [category_id]: '' });
        searchFilter();
    };
    const [selectedImage, setSelectedImage] = useState(null);
    const [stateUplaod, setUpload] = useState(false);

    const handleFileInputChange = async (event) => {
        const data = event.target.files[0];
        // const res = await axios.post('https://api.cloudinary.com/v1_1/dn3cgnwcy/image/uplaod', {
        //     body: data
        // });
        // console.log(res);

        if (data == null) return;
        console.log(data);
        const imageRef = ref(storage, `images/${data.name + v4()}`);
        uploadBytes(imageRef, data).then(async (res) => {
            setUpload(true);

            const fileRef = ref(storage, `images/${res.metadata.name}`);
            try {
                const url = await getDownloadURL(fileRef);

                setParamData({ ...paramData, ['image']: url });
            } catch (error) {
                console.log(error);
                return null;
            }
        });

        // downloadTokens
    };
    const hendleChange = (event) => {
        console.log(selectedImage);

        console.log('this', event.target.id, event.target.value);
        setParamData({ ...paramData, [event.target.id]: event.target.value });
    };

    const handleSubmit = async () => {
        // handle form submit here

        try {
            await axios
                .post('http://localhost:5000/api/create_products', {
                    name: paramData.name,
                    description: paramData.description,
                    image: paramData.image,
                    CO2: paramData.CO2,
                    // type_products: [],
                    category_id: paramData.category_id
                })
                .then((response) => {
                    // console.log(response.data);
                    console.log('success', response.data.message);
                });
        } catch (error) {
            console.log(error);
        }
    };
    const searchFilter = async (event) => {
        try {
            await axios.get('http://localhost:5000/api/categories').then((response) => {
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
                                                            // src={URL.createObjectURL(selectedImage)}
                                                            src={URL.createObjectURL(selectedImage)}
                                                            alt="Selected Image"
                                                            // width="400px"
                                                            // height="300px"
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
                                                            // width="300px"
                                                            // height="300px"
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
                                                    htmlFor="image"
                                                    style={{
                                                        color: '#FFF',
                                                        background: '#008000',
                                                        padding: '10px',
                                                        borderRadius: '5px'
                                                    }}>
                                                    เลือกรูป
                                                </label>

                                                <input
                                                    id="image"
                                                    // name='image'
                                                    type="file"
                                                    style={{ display: 'none' }}
                                                    accept="image/*"
                                                    onChange={(event) => {
                                                        setSelectedImage(event.target.files[0]);
                                                        handleFileInputChange(event);
                                                    }}
                                                />
                                            </div>

                                            {/* <button type="submit">Upload</button> */}
                                        </Form>
                                    </Col>
                                    <Col md={8}>
                                        <Form>
                                            <Form.Group
                                                className="mb-3"
                                                name="name"
                                                id="name"
                                                value="name"
                                                onChange={hendleChange}>
                                                <Form.Label>ชื่อ ผลิตภัณฑ์</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    aria-autocomplete="false"
                                                    name="name"
                                                    id="name"
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                name="description"
                                                id="description"
                                                value="description"
                                                onChange={hendleChange}>
                                                <Form.Label>รายละเอียด ผลิตภัณฑ์</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    aria-autocomplete="false"
                                                    name="description"
                                                    id="description"
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                name="CO2"
                                                value="CO2"
                                                id="CO2"
                                                onChange={hendleChange}>
                                                <Form.Label>ค่า CO2Kg</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    aria-autocomplete="false"
                                                    name="CO2"
                                                    id="CO2"
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                name="category_id"
                                                value="category_id"
                                                id="category_id"
                                                onChange={hendleChange}>
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    aria-autocomplete="false"
                                                    name="category_id"
                                                    id="category_id">
                                                    <option key={-1} value={-1}>
                                                        ประเภทอุตสาหกรรม
                                                    </option>
                                                    {listProductCetagory &&
                                                        listProductCetagory.map((data, index) => {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={Number(data.id)}>
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
                                                if (stateUplaod) {
                                                    handleSubmit;
                                                } else {

                                                    Swal.fire({
                                                        title: 'คุณไม่ได้อัปโหลดรูป ต้องการ<br/>ทำรายการต่อ ใช่หรือไม่',
                                                        showCloseButton: true,
                                                        icon: 'info',
                                                        reverseButtons: true,
                                                        showCancelButton: true,
                                                        confirmButtonText: `ยืนยัน`,
                                                        cancelButtonColor: '#d33',
                                                        cancelButtonText: 'ยกเลิก'
                                                    }).then(async (result) => {
                                                        if (result.isConfirmed) {
                                                            if (result.isConfirmed) {
                                                                handleSubmit;
                                                            }
                                                        }
                                                    });
                                                }
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
                                                router.push('/productList');
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
