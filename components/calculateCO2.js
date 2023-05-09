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
import CardGroup from 'react-bootstrap/CardGroup';

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
    const [listProduct, setListProduct] = useState([]);

    const [filterProduct, setFilterProduct] = useState({
        name: null,
        category_id: null,
        page: 1,
        per_page: 10
    });
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);

    const [listProductCetagory, setListProductCetagory] = useState();

    // const handleChangeInputSearchFilter = (event) => {
    //     setFilterSearch({ ...filterSearch, [event.target.name]: event.target.value });
    // };

    // const hendleChange = (event) => {
    //     setFilterProduct({ ...filterProduct, [event.target.id]: event.target.value });
    // };

    const clearFilter = () => {
        setFilterProduct({ ...filterProduct, ['name']: '' });
        setFilterProduct({ ...filterProduct, ['category_id']: null });
        // router.push('/')

        // location.reload();
        getCategories();

        searchFilter();
    };
    // const hendleChange = (event) => {
    //     if (event.target.id == 'category_id' && event.target.value == -1) {
    //         console.log(filterProduct);

    //         setFilterProduct({ ...filterProduct, [event.target.id]: null });
    //     } else {
    //         setFilterProduct({ ...filterProduct, [event.target.id]: event.target.value });
    //     }
    // };
    const selectProduct = async (in_id) => {
        try {
            await axios
                .get(`http://localhost:5000/api/select_product?in_id=${in_id}`)
                .then((response) => {
                    console.log(response.data.data);
                    setListProduct(response.data.data);
                });
        } catch (error) {
            console.log(error);
        }
    };
    const [isLoading, setLoading] = useState(false);
    // const handlePageChange = async (pageNumber) => {
    //     setLoading(true);
    //     try {
    //         const response = await axios.get('http://localhost:5000/api/products_list', {
    //             params: {
    //                 category_id: filterProduct.category_id,
    //                 name: filterProduct.name,
    //                 page: pageNumber,
    //                 perPage: filterProduct.per_page
    //             }
    //         });
    //         setListProduct(response.data.data);
    //         console.log('thissssss', response.data.data);
    //         setPage(response.data.currentPage);

    //         setTotalPages(response.data.totalPages);

    //         setLoading(false);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    const [q, setq] = useState([]);
    const [list, setlist] = useState([]);
    const [nulldat, setNulldat] = useState(false);

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('json'))) {
            setNulldat(true);
            return;
        }
        let all_id = JSON.parse(localStorage.getItem('json'));
        console.log(all_id);
        let ayy = [];
        let q = [];
        all_id.forEach((x_data) => {
            ayy.push(x_data.pdID);
            q.push(x_data.quantity);
            console.log(x_data.quantity);
        });
        let arr = Array.from(new Set(ayy));
        let arr_q = Array.from(new Set(q));
        console.log(q);

        setq(q);
        setlist(arr);
        selectProduct(arr);
        setNulldat(false);
    }, []);
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
    const calculateCO2 = () => {
        let sum = 0;
        listProduct.map((data, index) => {
            console.log(data);
            sum += data.CO2 * q[index];
        });
        return sum;
    };
    // useEffect(() => {
    //     if (filterProduct.name == '' || filterProduct.name == null) {
    //         searchFilter();
    //     }
    //     // searchFilter();
    // }, [filterProduct.name]);
    // // console.log(setFilter_Product);
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
                                <Row
                                    xs={12}
                                    md={12}
                                    style={{ padding: '5px', justifyContent: 'center' }}>
                                    <div className="Destop_side">
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
                                    
                                    <CardGroup>
                                        {/* <Table striped>
                                        <thead>
                                            <tr align="center">
                                                <th width={300}></th>
                                                <th width={300}>ชื่อ Product</th>
                                                <th width={300}>Carbon (CO2Kg)</th>
                                                <th width={300}>จำนวน</th>
                                            </tr>
                                        </thead>
                                        <tbody> */}
                                        {listProduct && !isLoading
                                            ? listProduct.map((data, index) => {
                                                  return (
                                                      <div style={{ padding: '5px' }}>
                                                          <Card key={data.id}>
                                                              <Card.Img
                                                                  align="center"
                                                                  variant="top"
                                                                  src={
                                                                      data
                                                                          ? data.image
                                                                          : STORE.cart
                                                                  }
                                                                  style={{
                                                                      width: '200px',
                                                                      height: '210px',
                                                                      alignItems: 'center',
                                                                      margin: 'auto'
                                                                  }}
                                                              />
                                                              <Card.Body>
                                                                  <Card.Title>
                                                                      {data ? data.name : '-'}
                                                                  </Card.Title>
                                                                  <Card.Text></Card.Text>
                                                              </Card.Body>
                                                              <Card.Footer
                                                                  style={{
                                                                      backgroundColor: '#7a7a7a',
                                                                      color: 'white',
                                                                      textAlign: 'center'
                                                                  }}>
                                                                  <a style={{ color: 'white' }}>
                                                                      {data ? data.CO2 : '0.00'}{' '}
                                                                      KgCO2
                                                                  </a>
                                                              </Card.Footer>
                                                              <Card.Footer
                                                                  style={{
                                                                      backgroundColor: '#007a06',
                                                                      color: 'white',
                                                                      textAlign: 'center'
                                                                  }}>
                                                                  <a  style={{
                                                                      color: 'white',
                                                                  }}>
                                                                      จำนวน {q[index]} ชิ้น
                                                                  </a>
                                                              </Card.Footer>
                                                          </Card>

                                                          <br />
                                                      </div>
                                                  );
                                              })
                                            : 'ไม่พบข้อมูล'}
                                    </CardGroup>
                                    {/* </tbody>
                                    </Table> */}
                                    {/*                                    
                                                <div style={{fontSize:"20px",float:'right'}}>
                                                    ลดคาร์บอน ทั้งหมด <a style={{color:'green' ,fontWeight:550}}>{calculateCO2()} </a>CO2Kg
                                                </div> */}

                                    <MydModalWithGrid
                                        show={modalShow}
                                        data={productid}
                                        onHide={() => setModalShow(false)}
                                    />
                                    {nulldat && (
                                        <Col md={12} sm={12} style={{ textAlign: 'center' }}>
                                            <h3> ไม่พบข้อมูล</h3>
                                        </Col>
                                    )}

                                    <Col md={2} sm={12}>
                                        <br />
                                        <Button
                                            size="md"
                                            type="submit"
                                            variant="success"
                                            style={{
                                                // float: 'right',
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                            // onClick={handleSubmit}
                                        >
                                            ยืนยัน
                                        </Button>{' '}
                                    </Col>
                                    <Col md={2} sm={12}>
                                        <br />
                                        <Button
                                            variant="danger"
                                            size="md"
                                            color="secondary"
                                            style={{
                                                // float: 'right',
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                                // marginLeft: '15px'
                                            }}
                                            onClick={() => {
                                                router.push('/');
                                                localStorage.removeItem('json');
                                            }}>
                                            {/* <MdAdd fontSize={'25px'} /> */}
                                            ยกเลิก
                                        </Button>{' '}
                                    </Col>
                                </Row>
                                {/* <div style={{ float: 'right' }}>
                                    <PaginationCustom  handlePageChange={handlePageChange} currentPage={page} totalPages={totalPages}/>
                                   
                                    <br />
                                    <br />
                                    <br />
                                </div> */}
                            </Container>
                            <br /> <br />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}
