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

            const fileRef = ref(storage, `images/${res.metadata.name}`);
            try {
                const url = await getDownloadURL(fileRef);
                setUpload(true);

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
        console.log('submit is now!')
        try {
            await axios
                .post('https://api.carbon-greentravel.com/api/create_products', {
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
                    router.reload('/createStore')
                });
        } catch (error) {
            console.log(error);
        }
    };
    const searchFilter = async (event) => {
        try {
            await axios.get('https://api.carbon-greentravel.com/api/categories').then((response) => {
                setListProductCetagory(response.data.data);
            });
        } catch (error) {
            console.log(error);
        }
    };
console.log(stateUplaod)
    useEffect(() => {
        if (filterProduct.name == '') {
            searchFilter();
        }
        // searchFilter();
    }, [filterProduct.name]);
    // console.log(setFilter_Product);
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
                                <Row xs={12} md={12} style={{ padding: '5px' }}>
                                        <Col xs={12} md={12}>
                                        <iframe src="https://locatestore.com/Oakuod" style={{border:'none',width:'100%',height:"600px"}} allow="geolocation"></iframe>

                                        </Col>
                                        
                                </Row>

                            </Container>
                        </Col>
                    </Row>
                </Container>
        </div>
    );
}
