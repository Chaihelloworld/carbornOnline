// import Logo_main1 from '../public/newimg/logo_main1.png';
// import Logo_main2 from '../public/newimg/logo_main2.png';
// import Logo_main3 from '../public/newimg/logo_main3.png';
// import Logo_main4 from '../public/newimg/logo_main4.png';
// import Logo_main5 from '../public/newimg/logo_main5.webp';
import styles from '../styles/actionBottom.module.scss';

import Logo_main1 from '../public/newimg/logo_main1.png';
import Logo_main2 from '../public/newimg/logo_main2.png';
import Logo_main3 from '../public/newimg/logo_main3.png';
import Logo_main4 from '../public/newimg/logo_main4.png';
import Logo_main5 from '../public/newimg/logo_main5.png';

import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
export default function Home() {
    return (
        <div
            style={{
                // position: 'fixed',
                // position: 'fixed',
                left: '0',
                bottom: '0',
                width: '100%',
                color: 'white',
                textAlign: 'center',
                padding: '10px',
                backgroundColor: '#212120'
            }}
            className={styles.display}>
            <div>
                แผนงานงานวิจัย
                การยกระดับการบริหารจัดการการท่องเที่ยวและความร่วมมือการพัฒนาคุณภาพอุทยานแห่งชาติใน
                พื้นที่ภาคเหนือตอนบนมุ่งสู่การท่องเที่ยวคาร์บอนสุทธิเป็นศูนย์ (2566)
                <Row style={{ padding: '5px' }}>
                    <Col>
                        <img
                            src={Logo_main1.src}
                            alt="logoMain"
                            width={45}
                            style={{ padding: '2px' }}
                        />

                        <img
                            src={Logo_main2.src}
                            alt="logoMain"
                            width={92}
                            style={{ padding: '2px' }}
                        />

                        <img
                            src={Logo_main5.src}
                            alt="logoMain"
                            width={70}
                            style={{ padding: '2px' }}
                        />

                        <img
                            src={Logo_main3.src}
                            alt="logoMain"
                            width={65}
                            style={{ padding: '2px' }}
                        />

                        <img
                            src={Logo_main4.src}
                            alt="logoMain"
                            width={55}
                            style={{ padding: '2px' }}
                        />
                    </Col>
                </Row>
            </div>
            <div>Copyright 2023 All Rights Reserved. By Develop</div>
        </div>
    );
}
