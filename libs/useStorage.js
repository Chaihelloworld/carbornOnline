import { useState, useEffect, useCallback } from "react";
import firebase from "./firebase";

export const useStorage = () => {
    const [progress, setProgress] = useState(0);
    const [isError, setError] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isMessage, setMessage] = useState(null);
    const [file, setFile] = useState();
    const [url, setUrl] = useState(null);
    const [pathCollection, setPathCollection] = useState("");

    const types = ["image/png", "image/jpeg", "image/jpg"];

    const fetchFireBaseUpload = (file, path) => {
        const storageRef = firebase.storage().ref(path).put(file);
        setLoading(true);

        return new Promise((resolve) => {
            return storageRef.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    setProgress(progress);
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => {
                    console.log("error", error);
                    setError(true);
                    setLoading(false);
                    return resolve("");
                },
                () => {
                    storageRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log("File available at", downloadURL);
                        setSuccess(true);
                        setUrl(downloadURL);
                        setLoading(false);
                        return resolve(downloadURL);
                    });
                },
            );
        });
    };

    useEffect(() => {
        if (!isError && file && pathCollection) {
            uploadFile();
        }
    }, [isError, file]);

    const initState = (file, path) => {
        setProgress(0);
        setMessage("");
        setError(false);
        setSuccess(false);
        setFile(file);
        setPathCollection(path);
    };

    const handleUploadFile = async (file, path) => {
        initState(file, path);
    };

    const uploadFile = useCallback(async () => {
        const checkFileSize = parseFloat(`${file.size / (1024 * 1024)}`).toFixed(2);

        if (+checkFileSize < 5) {
            if (file) {
                if (types.includes(file.type)) {
                    return await fetchFireBaseUpload(file, pathCollection);
                } else {
                    setMessage("Please select an image file (png or jpg)");
                }
            }
        } else {
            setError(true);
            setMessage("Please upload file image maximum 5 mb");
        }
    }, [file, isError, isSuccess, pathCollection]);

    return { progress, url, isError, isSuccess, isLoading, isMessage, handleUploadFile, fetchFireBaseUpload };
};