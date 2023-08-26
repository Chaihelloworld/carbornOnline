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
import { useCookies } from 'react-cookie';
import STORE from '../libs/store.image';
import Image from 'next/image';
import data from './product.json';
import MydModalWithGrid from './modal';
import axios from 'axios';
import Top_Products from './TopProducts';
import { FaSearch, FaSync, FaFilter, FaRegClipboard, FaTimes } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import { MdAdd } from 'react-icons/md';
import { getStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../libs/firebase';
import firebase from '../libs/firebase';
// import { fill } from '@cloudinary/url-gen/actions/resize';
import Swal from 'sweetalert2';
import PaginationCustom from './pagination';
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
    const [listProduct, setListProduct] = useState([]);

    const [filterProduct, setFilterProduct] = useState({
        name: '',
        category_id: null,
        page: 1,
        per_page: 10
    });
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);

    const [listProductCetagory, setListProductCetagory] = useState();
    const [tigger, setTigger] = useState(false);

    // const handleChangeInputSearchFilter = (event) => {
    //     setFilterSearch({ ...filterSearch, [event.target.name]: event.target.value });
    // };

    // const hendleChange = (event) => {
    //     setFilterProduct({ ...filterProduct, [event.target.id]: event.target.value });
    // };

    const clearFilter = () => {
        setFilterProduct({
            ...filterProduct,
            name: "",
            category_id: null,
            page: 1,
            per_page:10
        });
        console.log('cear',filterProduct)

        // router.push('/')

        // location.reload();
        router.push('/productList');
        setTigger(!tigger);

        // getCategories();
        // searchFilter();
    };
    const hendleChange = (event) => {
        if (event.target.id == 'category_id' && event.target.value == -1) {
            console.log(filterProduct);

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
    const [isLoading, setLoading] = useState(false);
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
            console.log('thissssss', response.data.data);
            setPage(response.data.currentPage);

            setTotalPages(response.data.totalPages);

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    const searchFilter = async (event) => {
        setLoading(true);
        // if (event) {
        //     event.preventDefault();

        const params = {
            category_id: filterProduct.category_id,
            name: filterProduct.name,
            page: filterProduct.page,
            perPage: filterProduct.per_page
        };
        try {
            await axios
                .get('http://localhost:5000/api/products_list', {
                    params
                })
                .then((response) => {
                    // console.log(response.data);
                    setListProduct(response.data.data);
                    setTotalPages(response.data.totalPages);
                    setPage(response.data.currentPage);

                    // setFilterProduct
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
        }
        // }
        //  else {
        //     try {
        //         await axios.get('http://localhost:5000/api/products_list', {
        //             params: {
        //                 category_id: filterProduct.category_id,
        //                 name: filterProduct.name,
        //                 page: filterProduct.page,
        //                 perPage: filterProduct.per_page
        //             }
        //         }).then((response) => {
        //             // console.log(response.data);
        //             setListProduct(response.data.data);
        //             setTotalPages(response.data.totalPages);
        //             setPage(response.data.currentPage);
        //             setLoading(false);
        //         });
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
    };
    // useEffect(() => {
    //     getCategories();
    //     searchFilter();
    // }, []);

    useEffect(() => {
        getCategories();
        searchFilter();
    }, [
        filterProduct.page,
        filterProduct.perPage,
        tigger,
 
    ]);
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
            }
        });
    };
    // useEffect(() => {
    //     if (filterProduct.name == '' || filterProduct.name == null) {
    //         searchFilter();
    //     }
    //     // searchFilter();
    // }, [filterProduct.name]);

    // console.log(setFilter_Product);
    return (
        <div>
            {/* <div className={styles.x_banner_header}> */}
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
                                                            name='category_id'
                                                            value={filterProduct.category_id}
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
                                            {listProduct && !isLoading ? (
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
                                                                    src={
                                                                        data.image
                                                                            ? data.image
                                                                            : STORE.cart
                                                                    }
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
                                                                style={{ paddingTop: '15px' }}
                                                                // style={{ paddingTop: '15px' }}
                                                            >
                                                                <Button
                                                                    variant="link"
                                                                    onClick={() => {
                                                                        setModalShow(true),
                                                                            Productid(data);
                                                                    }}>
                                                                    {' '}
                                                                    <FaRegClipboard fontSize={15} />
                                                                </Button>
                                                                <Button
                                                                    variant="link"
                                                                    onClick={() => {
                                                                        deleteProduct(data.id);
                                                                    }}>
                                                                    {' '}
                                                                    <FaTimes fontSize={15} />
                                                                </Button>{' '}
                                                                {/* <Button size='sm' style={{ backgroundColor: '#ac2bac' ,borderRadius:'50%'}} href='#'> */}
                                                                {/* </Button> */}
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan="16"
                                                        style={{ textAlign: 'center' }}>
                                                        <div style={{ display: 'inline-block' }}>
                                                            <Spinner
                                                                animation="border"
                                                                variant="success"
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                    <MydModalWithGrid
                                        show={modalShow}
                                        data={productid}
                                        onHide={() => setModalShow(false)}
                                    />
                                </Row>
                                <div style={{ float: 'right' }}>
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
                </Container>
            {/* </div> */}
        </div>
    );
}
