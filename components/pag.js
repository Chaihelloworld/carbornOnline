import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // Assuming you're using Bootstrap
import Image from 'react-bootstrap/Image';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; //

// import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Side1 from '../public/newimg/slide_1z1.png';
import Side2 from '../public/newimg/slide_1z2.png';
import Side3 from '../public/newimg/slide_1z3.png';

// import { Container } from 'react-bootstrap';
// import { Col } from 'react-bootstrap';
// import { Row } from 'react-bootstrap';
import Navbars from './NavbarMain';

function ActionBottom() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    const SideImages = [Side1.src, Side2.src, Side3.src]; // Assuming Side1, Side2, and Side3 are defined
    
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    
    const openLightbox = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };
    
    const closeLightbox = () => {
        setLightboxOpen(false);
    };
    return (
        <>
            <Navbars />
            <Container fluid={'sm'} style={{ alignContent: 'center' }}>
            <Row style={{ paddingTop: '25px' }}>
                <Col md={12} xs={12}>
                    <div style={{ padding: '10px' }}>
                        <h1 style={{ textAlign: 'center' }}>รู้ก่อนเที่ยว</h1>
                    </div>
                </Col>
                <Col md={12} xs={12}>
                    {SideImages.map((src, index) => (
                        <div key={index} style={{ display: 'flex' }}>
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
            {lightboxOpen && (
                <Lightbox
                    mainSrc={SideImages[lightboxIndex]}
                    nextSrc={SideImages[(lightboxIndex + 1) % SideImages.length]}
                    prevSrc={SideImages[(lightboxIndex + SideImages.length - 1) % SideImages.length]}
                    onCloseRequest={closeLightbox}
                    onMovePrevRequest={() => setLightboxIndex((lightboxIndex + SideImages.length - 1) % SideImages.length)}
                    onMoveNextRequest={() => setLightboxIndex((lightboxIndex + 1) % SideImages.length)}
                />
            )}
        </Container>
        </>
    );
}
export default ActionBottom;
