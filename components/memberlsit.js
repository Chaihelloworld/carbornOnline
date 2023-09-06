import { useEffect, useState } from 'react';
import styles from '../styles/stylecss.module.css'; // Import the CSS module
import Memberlist from '../public/newimg/memberlist.png';
import Image from 'next/image';
import Footer from '../components/footer';

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
const FriendsList = () => {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        fetch('https://randomuser.me/api/?results=12')
            .then((response) => response.json())
            .then((data) => {
                setPeople(data.results);
            })
            .catch((error) => console.error(error.toString()));
    }, []);

    return (
        <div>
            <div className={styles.x_banner_header}>
                <Container>
                    {/* <Row> */}
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

                    {/* <Col xs={12} md={12}> */}
                    {/* <Container> */}
                    <Row xs={12} md={8}>
                        <Image
                            // layout="fill"
                            objectFit="cover"
                            quality={100}
                            src={Memberlist}
                            alt="image list"
                            style={{ width: '1200px' }}
                        />
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    );
};

export default FriendsList;
