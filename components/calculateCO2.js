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
import MydModalWithGrid from './modal';
import axios from 'axios';
import { BiPlus, BiMinus, BiDownArrow } from 'react-icons/bi';
import Cookies from 'js-cookie';
import CardGroup from 'react-bootstrap/CardGroup';
import Swal from 'sweetalert2';
export default function HeaderBanner(props) {
    const [modalShow, setModalShow] = useState(false);
    const [productid, Productid] = useState();
    const [showButtons, setShowButtons] = useState(false);
    const router = useRouter();
    const [listProduct, setListProduct] = useState([]);
    const [filterProduct, setFilterProduct] = useState({
        name: null,
        category_id: null,
        page: 1,
        per_page: 10
    });

    const [isLoading, setLoading] = useState(false);
    const [q, setq] = useState([]);
    const [nulldat, setNulldat] = useState(false);
    const [listCart, setListCart] = useState([]);
    const [defaultCal, setDefaultCal] = useState([]);

    const [sumCO2, setSumCO2] = useState(0);
    const [buttonsVisibility, setButtonsVisibility] = useState(listCart.map(() => false));

    const submitCal = async (id) => {
        Swal.fire({
            icon: 'success',
            title: 'บันทึกกิจกรรมแล้ว',
            text: 'กรอกชื่อกิจกรรม',
            input: 'text',
            confirmButtonText: `ยืนยัน`,
            showConfirmButton: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                // console.log(result.value);
                const apiSubmit = async () => {
                    const updatedCartItems = listCart.map((item) => ({
                        id: item.id,
                        total_cart_count: item.total_cart_count,
                        user_id: Cookies.get('user_idCk')
                    }));
                    try {
                        await axios
                            .post('https://api.carbon-greentravel.com/api/update_cart_active', {
                                updatedCartItems
                            })
                            .then((response) => {
                                // console.log(response);
                            });
                        router.push('/products');
                    } catch (error) {
                        console.log(error);
                    }
                };
                //

                const apiSubmittoDB = async () => {
                    let sumTotal = 0; // Initialize sumTotal variable
                    const updatedCartItems = listCart.map((item) => {
                        sumTotal += item.total_CO2; // Add total_cart_count to sumTotal
                        return {
                            ...item, // Include all properties from the original item
                            sumTotal // Include the calculated sumTotal
                        };
                    });
                    const param = {
                        dataset: JSON.stringify(updatedCartItems),
                        total_CO2: sumTotal,
                        name: result.value,
                        user_id: Cookies.get('user_idCk')
                    };
                    try {
                        await axios
                            .post('https://api.carbon-greentravel.com/api/historyCart', {
                                param
                            })
                            .then((response) => {
                                // console.log(response);
                            });
                        apiSubmit();
                    } catch (error) {
                        console.log(error);
                    }
                };
                apiSubmittoDB();
            }
        });
    };
    const DeleteRow = async () => {
        try {
            await axios
                .delete(
                    `https://api.carbon-greentravel.com/api/delete_Cart?user_id=${Cookies.get(
                        'user_idCk'
                    )}`
                )
                .then((response) => {
                    // console.log(response);
                    router.push('/');
                });
            apiSubmit();
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (event, index) => {
        const { value } = event.target;
        const updatedCart = listCart.map((item, i) =>
            i === index ? { ...item, total_cart_count: parseInt(value) } : item
        );
        setListCart(updatedCart);
        // console.log(updatedCart);
        callcarbon();
    };

    const handleDecrement = (index) => {
        if (listCart[index].total_cart_count > 1) {
            const updatedCart = listCart.map((item, i) =>
                i === index
                    ? {
                          ...item,
                          total_cart_count: item.total_cart_count - 1,
                          total_CO2: item.total_CO2 - defaultCal[index]
                      }
                    : item
            );
            setListCart(updatedCart);
            callcarbon();
        }
    };

    const handleIncrement = (index) => {
        const updatedCart = listCart.map((item, i) =>
            i === index
                ? {
                      ...item,
                      total_cart_count: item.total_cart_count + 1,
                      total_CO2: defaultCal[index] * (item.total_cart_count + 1)
                  }
                : item
        );
        setListCart(updatedCart);
        callcarbon();
        console.log(defaultCal[index],'*',updatedCart[index].total_cart_count);

        console.log(updatedCart);
    };

    const handleQuantityClick = (index) => {
        const updatedVisibility = [...buttonsVisibility];
        updatedVisibility[index] = !updatedVisibility[index];
        setButtonsVisibility(updatedVisibility);
    };

    const [authUser_id, setAuthUser_id] = useState();

    const Getlist_Cart = async () => {

        const params = {
            user_id: Cookies.get('user_idCk')
        };
        try {
            await axios
                .get('https://api.carbon-greentravel.com/api/cart_list', {
                    params
                })
                .then((response) => {
                    // console.log(response.data);
                    setListCart(response.data.data);
                    response.data.data.forEach((data, i) => {
                        defaultCal.push(data.total_CO2_def);
                        // console.log(data.total_CO2,i)
                    });
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        callcarbon();
        Getlist_Cart();
    }, []);
    // console.log(defaultCal);

    const callcarbon = () => {
        let sum = 0;
        listCart.map((data, i) => (sum += data.total_CO2));
        var convertSum = sum.toFixed(2)
        setSumCO2(convertSum);
    };

    return (
        <div>
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

                                {/* <CardGroup> */}

                                <Row xs={12} md={12}>
                                    <Col
                                        md={12}
                                        xs={12}
                                        style={{
                                            padding: '5px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                        <h6 style={{ fontWeight: 'bold' }}>รายการ</h6>
                                        <h6 style={{ textAlign: 'end', fontWeight: 'bold' }}>
                                            ปริมาณคาร์บอน
                                        </h6>
                                    </Col>
                                    <div>
                                        {listCart && !isLoading ? (
                                            listCart.map((data, index) => (
                                                <div key={data.id} style={{ padding: '5px' }}>
                                                    <Col
                                                        md={12}
                                                        xs={12}
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <Form>
                                                                <Form.Group
                                                                    controlId="quantity"
                                                                    style={{ width: '55px' }}>
                                                                    <div
                                                                        onClick={() =>
                                                                            handleQuantityClick(
                                                                                index
                                                                            )
                                                                        }
                                                                        style={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            cursor: 'pointer',
                                                                            position: 'relative'
                                                                        }}>
                                                                        <Form.Control
                                                                            type="number"
                                                                            min={1}
                                                                            value={
                                                                                data.total_cart_count
                                                                            }
                                                                            onChange={(event) =>
                                                                                handleInputChange(
                                                                                    event,
                                                                                    index
                                                                                )
                                                                            }
                                                                            onClick={(e) =>
                                                                                e.stopPropagation()
                                                                            }
                                                                            style={{
                                                                                paddingRight: '30px'
                                                                            }}
                                                                        />
                                                                        <BiDownArrow
                                                                            fontSize={10}
                                                                            style={{
                                                                                position:
                                                                                    'absolute',
                                                                                top: '50%',
                                                                                right: '10px',
                                                                                transform:
                                                                                    'translateY(-50%)'
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </Form.Group>
                                                            </Form>
                                                            <div
                                                                style={{
                                                                    display: buttonsVisibility[
                                                                        index
                                                                    ]
                                                                        ? 'block'
                                                                        : 'none'
                                                                }}>
                                                                <Button
                                                                    variant="outline-light"
                                                                    style={{
                                                                        borderRadius:
                                                                            '0px 0px 0px 0px',
                                                                        color: 'gray'
                                                                    }}
                                                                    onClick={() =>
                                                                        handleDecrement(index)
                                                                    }>
                                                                    <BiMinus fontSize={16} />
                                                                </Button>
                                                                <Button
                                                                    variant="outline-light"
                                                                    style={{
                                                                        borderRadius:
                                                                            '0px 0px 0px 0px',
                                                                        color: 'gray'
                                                                    }}
                                                                    onClick={() =>
                                                                        handleIncrement(index)
                                                                    }>
                                                                    <BiPlus fontSize={16} />
                                                                </Button>
                                                            </div>
                                                            <h6>x {data.product_name}</h6>
                                                        </div>
                                                        <h6 style={{ textAlign: 'end' }}>
                                                            {/* {calNums(data.total_CO2,data.total_cart_count)} */}
                                                            {Number(data.total_CO2).toFixed(2)}
                                                            {/* {data.total_CO2} */}

                                                        </h6>
                                                    </Col>
                                                </div>
                                            ))
                                        ) : (
                                            <p>ไม่พบข้อมูล</p>
                                        )}
                                    </div>
                                    <hr />
                                    <Col
                                        md={12}
                                        xs={12}
                                        style={{
                                            padding: '5px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                        <h6>รวมปริมาณคาร์บอนทั้งหมด</h6>
                                        <h6 style={{ textAlign: 'end', color: 'green' }}>
                                            {sumCO2}
                                        </h6>
                                    </Col>
                                </Row>
                                {/* </CardGroup> */}
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
                                        onClick={submitCal}>
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
                                            // router.push('/');
                                            DeleteRow();
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
    );
}
