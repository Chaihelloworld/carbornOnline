import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // Assuming you're using Bootstrap
import  Lightbox  from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import Image from 'next/image'; // Import the correct Image component for Next.js
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Side1 from '../public/newimg/slide_1z1.png';
import Side2 from '../public/newimg/slide_1z2.png';
import Side3 from '../public/newimg/slide_1z3.png';
import Navbars from './NavbarMain';

const Pag = () => {
    const SideImages = [Side1.src, Side2.src, Side3.src]; // Assuming Side1, Side2, and Side3 are defined
    // const [lightboxOpen, setLightboxOpen] = useState(false);
    // const [lightboxIndex, setLightboxIndex] = useState(0);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    // const openLightbox = (index) => {
    //     setLightboxOpen(true);
    //     setLightboxIndex(index);
    // };

    // const closeLightbox = () => {
    //     setLightboxOpen(false);
    // };
    const openLightbox = (index) => {
        setIsOpen(true);
        setSelectedImageIndex(index);
    };

    const closeLightbox = () => {
        setIsOpen(false);
    };
    return (
        <>
            <Navbars />
            <Container fluid={'sm'} style={{ alignContent: 'center' }}>
                {/* Your other components */}
                <Row style={{ paddingTop: '0px' }}>
                    <Col md={12} xs={12}>
                        <h1 style={{textAlign:'center'}}>รู้ก่อนเที่ยว</h1>
                        <div style={{padding:'15px'}}>
                        {/* <h5>COMMING SOON CONTENT ...</h5> */}
                        {/* <h5>CIRCULAR คัดแยกของเสียจากอุตสาหกรรมสิ่งทอตามเฉดสี และ นำมาแปรสภาพเป็นผ้าหลากสี หรือ เสื้อผ้าใหม่ โดยไม่ผ่านกระบวนการฟอกย้อม เพื่อนำกลับมาใช้เป็นสินค้าที่ยั่งยืน และ สร้างผลกระทบที่ดีต่อโลกใบนี้</h5>
                        <h5>สิ่งที่ CIRCULAR ทำ ถือเป็นส่วนหนึ่งในการแก้ไขปัญหาสำหรับอนาคตร่วมกันของทุกคนที่เป็นส่วนหนึ่งของโลกใบนี้</h5> */}
                        </div>
                    </Col>
                    <Col md={12} xs={12}>
                        {SideImages.map((src, index) => (
                            <div key={index} style={{ display: 'flex' ,padding:'15px',paddingBottom:'25px'}}>
                                <Image
                                    src={src}
                                    width={1400}
                                    height={620}
                                    alt={`Picture ${index + 1}`}
                                    onClick={() => openLightbox(index)}
                                />
                            </div>
                           
                        ))}
                    </Col>
                </Row>
                {isOpen && (
                    <Lightbox
                        mainSrc={SideImages[selectedImageIndex]}
                        nextSrc={SideImages[(selectedImageIndex + 1) % SideImages.length]}
                        prevSrc={
                            SideImages[(selectedImageIndex + SideImages.length - 1) % SideImages.length]
                        }
                        onCloseRequest={closeLightbox}
                        onMovePrevRequest={() =>
                            setSelectedImageIndex(
                                (selectedImageIndex + SideImages.length - 1) % SideImages.length
                            )
                        }
                        onMoveNextRequest={() =>
                            setSelectedImageIndex((selectedImageIndex + 1) % SideImages.length)
                        }
                    />
                )}
                <br/>
            </Container>
        </>
    );
};

export default Pag;
