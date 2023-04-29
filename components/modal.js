import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Image from 'next/image';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';
import STORE from '../libs/store.image';
function MydModalWithGrid(props) {
    const [name, setName] = useState();
    const [CO2, setCO2] = useState(0);
    const [type, setType] = useState();
    const [description, setDescription] = useState();
    const [img, setImg] = useState();
    const [datail, setDetail] = useState([]);

    const searchFilter = async () => {
        try {
            await axios
                .get(`http://localhost:5000/api/info_product?id=${props.data.id}`)
                .then((response) => {
                    setDetail(response.data.data);
                    setName(response.data.data[0].name);
                    setCO2(response.data.data[0].CO2);
                    setType(response.data.data[0].category_name);
                    setDescription(response.data.data[0].description);
                    setImg(response.data.data[0].image);
                    console.log(response.data.data[0].image);
                });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        searchFilter();
    }, [props.data]);

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
                                                    src={data.image ? data.image:STORE.cart}
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
                                            <p className="text"> ข้อมูลรายละเอียด &ensp;<br/>{data ? data.description : ''}</p>

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
                                            <Col xs={4} md={4}>
                                                <div
                                                    style={{
                                                        margin: 'auto',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column',
                                                        alignContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                    <Image
                                                        src={STORE.cart}
                                                        alt="cart"
                                                        margin={'auto'}
                                                        width={120}
                                                        height={120}
                                                    />

                                                    <p className="text">
                                                        {props.data ? props.data.title : ''}
                                                    </p>
                                                </div>
                                            </Col>
                                            <Col xs={4} md={4}>
                                                <div
                                                    style={{
                                                        margin: 'auto',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column',
                                                        alignContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                    <Image
                                                        src={STORE.cart}
                                                        alt="cart"
                                                        margin={'auto'}
                                                        width={120}
                                                        height={120}
                                                    />

                                                    <p className="text">
                                                        {props.data ? props.data.title : ''}
                                                    </p>
                                                </div>
                                            </Col>
                                            <Col xs={4} md={4}>
                                                <div
                                                    style={{
                                                        margin: 'auto',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column',
                                                        alignContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                    <Image
                                                        src={STORE.cart}
                                                        alt="cart"
                                                        margin={'auto'}
                                                        width={120}
                                                        height={120}
                                                    />

                                                    <p className="text">
                                                        {props.data ? props.data.title : ''}
                                                    </p>
                                                </div>
                                            </Col>
                                        </Row>
                                        {/* <Sonnet /> */}
                                    </Tab>
                                    <Tab eventKey="longer-tab" title="จุดขาย">
                                        {/* <Sonnet /> */}
                                    </Tab>
                                    {/* <Tab eventKey="contact" title="Contact" disabled>
                                </Tab> */}
                                </Tabs>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default MydModalWithGrid;
