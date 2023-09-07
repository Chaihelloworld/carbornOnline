import React from 'react';
import { Carousel } from 'react-bootstrap';
// import Slides_1 from '../public/newimg/slide_1z1.png';
// import Slides_2 from '../public/newimg/slide_1z2.png';
// import Slides_3 from '../public/newimg/slide_1z3.png';
import Slides_1 from '../public/newimg/slideOne.png';
import Slides_2 from '../public/newimg/slideTwo.png';
// import Slides_2 from '../public/newimg/slide_3.jpg';
// import Slides_3 from '../public/newimg/slide_3.jpg';

import Image from 'next/image';
const ImageCarousel = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img className="d-block w-100" src={Slides_2.src} alt="Image 2" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={Slides_1.src} alt="Image 1" />
            </Carousel.Item>
        </Carousel>
    );
};

export default ImageCarousel;
