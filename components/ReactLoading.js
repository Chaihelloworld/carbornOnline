import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={30} width={20} className='m-auto' />
);
 
export default Loading;