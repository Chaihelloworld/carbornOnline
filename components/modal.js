import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Image from 'next/image';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import { BiPlus, BiMinus } from 'react-icons/bi';

import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';
import STORE from '../libs/store.image';
import Map from './map';
import { stringify } from 'uuid';
import { useRouter } from 'next/router';
function MydModalWithGrid(props) {
    const [name, setName] = useState();
    const [CO2, setCO2] = useState(0);
    const [type, setType] = useState();
    const [description, setDescription] = useState();
    const [img, setImg] = useState();
    const [datail, setDetail] = useState([]);
    const [categoryId, setCategoryId] = useState(0);
    const [pdID, setPdID] = useState(0);

    const searchFilter = async () => {
        try {
            await axios
                .get(`http://188.166.232.11:5000/api/info_product?id=${props.data.id}`)
                .then((response) => {
                    setDetail(response.data.data);
                    setName(response.data.data[0].name);
                    setCO2(response.data.data[0].CO2);
                    setType(response.data.data[0].category_name);
                    setDescription(response.data.data[0].description);
                    setImg(response.data.data[0].image);
                    setCategoryId(response.data.data[0].category_id);
                    Comparesame();
                    setPdID(response.data.data[0].id);
                });
        } catch (error) {
            console.log(error);
        }
    };
    const [samelist, setSameList] = useState([]);
    const [loading, setLoading] = useState(false);

    const Comparesame = async () => {
        // console.log('props.data.CO2',props.data.CO2)
        // console.log('props.data.category_id',props.data.category_id)
        // console.log('props.data.id',props.data.id)

        try {
            await axios
                .get(
                    `http://188.166.232.11:5000/api/check_product?value_co2=${props.data.CO2}&type=${props.data.category_id}&id=${props.data.id}`
                )
                .then((response) => {
                    if (response.data.success) {
                        // console.log(response.data);
                        setSameList(response.data.data);
                        setLoading(true);
                    } else {
                        setLoading(false);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };
    const router = useRouter();
    useEffect(() => {
        if (!props) {
            return;
        }
        searchFilter();
    }, [props.data]);
    const [lod, setLod] = useState(true);
    const [cartItems, setCartItems] = useState(
        JSON.parse(localStorage.getItem('json')) ? JSON.parse(localStorage.getItem('json')) : []
    );
    const [quantity, setQuantity] = useState(1);

    const addToCart = (product) => {
        console.log(product)
        setCartItems([...cartItems, product]);
        let array = [...cartItems, product];
        props.onHide();
        localStorage.setItem('toggle', 'true');
        localStorage.setItem('json', `${JSON.stringify(array)}`);
        router.push('/')
        setQuantity(1)
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(quantity);
    };

    // const handleQuantityChange = (event) => {
    //     setQuantity(parseInt(event.target.value));
    // };
    const dld = (event) => {
        if (parseInt(event.target.value) - 1 !== 0) {
            setQuantity(parseInt(event.target.value) - 1);
        } else {
            setQuantity(1);
        }
    };
    const add = (event) => {
        setQuantity(parseInt(event.target.value) + 1);
    };
    const handleIncrement = () => {
        setQuantity(quantity + 1);
      };
    
      const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
      };
    
      const handleInputChange = (event) => {
        const newValue = parseInt(event.target.value);
        if (!isNaN(newValue) && newValue > 0) {
            setQuantity(newValue);
        }
      };
    return (
        <>
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                size="lg"
                fullscreen={'sm-down'}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">รายละเอียดสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        {datail.map((data, index) => {
                            return (
                                <>
                                    <Row key={index}>
                                        <Col xs={12} md={4}>
                                            <div
                                                style={{
                                                    margin: 'auto',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column',
                                                    alignContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                {/* {console.log(i.img)} */}
                                                <Image
                                                    src={data.image ? data.image : STORE.cart}
                                                    // src='/newimg/img1.jpg'
                                                    // src={props.data ? props.data.img : ''}
                                                    alt="cart"
                                                    margin={'auto'}
                                                    width={400}
                                                    height={400}
                                                />
                                                {/* <p
                                                    style={{
                                                        fontSize: '25px',
                                                        background: '#4d8b37',
                                                        width: '100%',
                                                        borderRadius: '35px',
                                                        color: '#FFF',
                                                        padding: '11px'
                                                    }}>
                                                    &ensp;{data ? data.name : ''}
                                                </p> */}
                                            </div>
                                        </Col>
                                        <Col xs={12} md={8}>
                                            <style jsx>{`
                                                .text {
                                                    font-size: 10px;
                                                    // background-color: #d0e523;
                                                    width: 100%;
                                                    padding: 10px;
                                                }
                                                .texthead {
                                                    font-size: 15px;
                                                    // background-color: #d0e523;
                                                    // border-radius: 10px;
                                                    color: #007a06;
                                                    width: 100%;
                                                    padding: 10px;
                                                }

                                                .textheadDes {
                                                    font-size: 15px;
                                                    width: 100%;
                                                    padding: 10px;
                                                }
                                                @media (min-width: 991.98px) {
                                                    .text {
                                                        font-size: 15px;
                                                    }
                                                    .texthead {
                                                        font-size: 20px;
                                                    }
                                                }
                                                @media (min-width: 791.98px) {
                                                    .text {
                                                        font-size: 15px;
                                                    }
                                                    .texthead {
                                                        font-size: 25px;
                                                    }
                                                }
                                            `}</style>

                                            <p className="texthead"> {data ? data.name : ''}</p>
                                            <hr />
                                            <p className="text">
                                                {' '}
                                                ข้อมูลรายละเอียด &ensp;
                                                <br />
                                                {data ? data.description : ''}
                                            </p>

                                            <Row>
                                                <Col>
                                                    <hr />
                                                    <p style={{ fontSize: '20px' }}>
                                                        {' '}
                                                        ประเภทสินค้า : {type}
                                                    </p>
                                                    <p style={{ fontSize: '20px' }}>
                                                        {' '}
                                                        ลดคาร์บอน : {data ? data.CO2 : ''} kgCO2e
                                                    </p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </>
                            );
                        })}

                        <Row>
                            <Col xs={12} md={12}>
                                <Tabs
                                    defaultActiveKey="profile"
                                    id="justify-tab-example"
                                    className="mb-3"
                                    justify>
                                    <Tab eventKey="home" title="ข้อมูลคาร์บอน">
                                        {/* <Sonnet /> */}
                                    </Tab>
                                    <Tab eventKey="profile" title="เปรียบเทียบสินค้า">
                                        <span> สินค้าใกล้เคียง</span>

                                        <Row>
                                            {loading ? (
                                                samelist.map((data, index) => {
                                                    return (
                                                        <Col xs={4} md={4} key={data.id}>
                                                            {' '}
                                                            <div
                                                                style={{
                                                                    margin: 'auto',
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    flexDirection: 'column',
                                                                    alignContent: 'center',
                                                                    alignItems: 'center'
                                                                }}>
                                                                {data ? (
                                                                    <Image
                                                                        src={data.image?data.image:STORE.cart}
                                                                        alt="cart"
                                                                        margin={'auto'}
                                                                        width={120}
                                                                        height={120}
                                                                    />
                                                                ) : (
                                                                    <Image
                                                                        src={STORE.cart}
                                                                        alt="cart"
                                                                        margin={'auto'}
                                                                        width={120}
                                                                        height={120}
                                                                    />
                                                                )}

                                                                <p className="text">
                                                                    {data ? data.name : ''}
                                                                </p>
                                                                <p className="text">
                                                                    {' '}
                                                                    ลดคาร์บอน :{' '}
                                                                    {data ? data.CO2 : ''} kgCO2e
                                                                </p>
                                                            </div>
                                                        </Col>
                                                    );
                                                })
                                            ) : (
                                                <Col>
                                                    <div
                                                        colSpan="16"
                                                        style={{ textAlign: 'center' }}>
                                                        <div style={{ display: 'inline-block' }}>
                                                            ไม่พบข้อมูล
                                                        </div>
                                                    </div>
                                                </Col>
                                            )}
                                        </Row>

                                        {/* <Sonnet /> */}
                                    </Tab>
                                    <Tab eventKey="longer-tab" title="จุดขาย">
                                        {/* <Sonnet /> */}
                                        <Map />
                                    </Tab>
                                    {/* <Tab eventKey="contact" title="Contact" disabled>
                                </Tab> */}
                                </Tabs>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-between align-items-center">
                        <Button style={{ borderRadius: '15px 0px 0px 15px' }} onClick={handleDecrement}>
                            <BiMinus fontSize={16} />
                        </Button>
                        <Form>
                            <Form.Group controlId="quantity" style={{ width: '40px' }}>
                                <Form.Control
                                    type="number"
                                    min={1}
                                    value={quantity}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Form>
                        <Button style={{ borderRadius: '0px 15px 15px 0px' }} onClick={handleIncrement}>
                            <BiPlus fontSize={16} />
                        </Button>
                    </div>

                    <Button
                        color='success'
                        variant="success"
                        style={{width:'150px'}}
                        onClick={() => {
                            addToCart({ pdID ,quantity});
                        }}>
                        เลือก
                    </Button>
                    <Button style={{width:'75px'}} variant="danger"  onClick={props.onHide}> ปิด </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default MydModalWithGrid;
