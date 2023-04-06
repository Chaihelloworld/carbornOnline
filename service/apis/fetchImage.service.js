import { baseURL } from '../axois.config';

export const LoaderImageAws = ({ src } = { src }) => {
    return `${baseURL}/fileupload/get_image_v2?path=${src}`;
};
 