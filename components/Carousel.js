import React from 'react';
import { Carousel } from 'react-bootstrap';
import Slides_1 from '../public/newimg/slide_3.jpg';
import Slides_2 from '../public/newimg/slide_2.jpg';

import Image from 'next/image';
const ImageCarousel = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img className="d-block w-100" src={Slides_1.src} alt="Image 1" />
            </Carousel.Item>
            {/* <Carousel.Item>
                <Image src={Banner} className="d-block w-100" alt="Picture of the author" />
            </Carousel.Item> */}
            <Carousel.Item>
                <img className="d-block w-100" src={Slides_1.src} alt="Image 2" />
            </Carousel.Item>
            {/* <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://via.placeholder.com/800x400?text=Image%203"
                    alt="Image 3"
                />
            </Carousel.Item> */}
        </Carousel>
    );
};

export default ImageCarousel;
