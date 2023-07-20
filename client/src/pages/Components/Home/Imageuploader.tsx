import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import { useRef } from "react";
import "../../../styles/Components/Home/imageuploader.css";
import { ButtonComponent } from "../../../styles/Components/Home/ButtonComponent";
import { FileTypes } from "../../../interfaces";
import { useUploadImageMutation } from "../../../generated/graphql";
import { useEffect } from "react";
import { useStateValue } from "../../../context/stateProvider";
import { UPLOAD_IMAGE } from "../../../context/actionsTypes";
interface ImageuploaderProps {}

const Imageuploader: React.FC<ImageuploaderProps> = () => {
    const inputRef = useRef<HTMLInputElement>();
    const fileRef = useRef<HTMLDivElement>();
    const uploadRef = useRef<HTMLDivElement>();
    const { dispatch } = useStateValue();
    const [, uploadimage] = useUploadImageMutation();
    const [loadedfiles, setloadedfiles] = useState<FileTypes[]>([]);
    function fileloaded(file: FileTypes) {
        setloadedfiles([file, ...loadedfiles]);
    }
    useEffect(() => {
        dispatch({
            type: UPLOAD_IMAGE,
            payload: {
                ref: uploadRef,
            },
        });
    }, [uploadRef, dispatch]);
    const submitimages = (e) => {
        e.preventDefault();
        loadedfiles.map(
            async (file) => await uploadimage({ image: file.data })
        );
    };
    const handleRemoveFile = (e) => {
        e.preventDefault();
        //loadedfiles.filter((file) => file !== fileRef.current);
        //setloadedfiles(
        //    loadedfiles.filter(
        //        (file) => file.name !== fileRef.current.accessKey
        //    )
        //);
    };
    function onFileload(
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.DragEvent<HTMLInputElement>
    ) {
        const files = e.currentTarget.files[0];
        let fileReader = new FileReader();
        fileReader.onload = () => {
            const file: FileTypes = {
                name: files.name,
                size: files.size,
                type: files.type,
                data: fileReader.result,
            };
            fileloaded(file);
        };

        fileReader.onabort = () => {
            alert("reading abort");
        };
        fileReader.onerror = () => {
            alert("reading error");
        };
        fileReader.readAsDataURL(files);
    }

    return (
        <div className="imageuploader" ref={uploadRef}>
            <div className="sub-header">Drag an image</div>
            <div className="draggable-container">
                <div className="file-preview-container">
                    <input
                        type="file"
                        className="file-browser-input"
                        name="file-browser-input"
                        ref={inputRef}
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        onChange={onFileload}
                        onDrop={onFileload}
                        accept="image/*"
                    />
                    {loadedfiles.length !== 0 &&
                        loadedfiles
                            .slice(0)
                            .reverse()
                            .map((file) => (
                                <div
                                    className="file"
                                    ref={fileRef}
                                    onClick={handleRemoveFile}
                                >
                                    <img src={file.data} alt="not found" />
                                    <div className="file-content">
                                        <h3>{file.name}</h3>
                                        <h3 id="file-size">
                                            {`${(file.size / 1000000).toFixed(
                                                1
                                            )} MB`.toString()}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                    {loadedfiles.length === 0 && (
                        <div className="draggable-container-text">
                            Drag and Drop Images Here
                        </div>
                    )}
                </div>

                <div className="file-browser-container">
                    <ButtonComponent
                        style={{ marginBottom: "1.2rem", marginTop: "1.2rem" }}
                    >
                        <Button
                            onClick={() => inputRef.current.click()}
                            style={{ width: "100%", height: "100%" }}
                        >
                            Browse
                        </Button>
                    </ButtonComponent>
                </div>
            </div>
            <ButtonComponent
                onClick={submitimages}
                style={{ marginTop: "1.2rem" }}
            >
                <Button style={{ width: "100%", height: "100%" }}>
                    Upload
                </Button>
            </ButtonComponent>
        </div>
    );
};
export default Imageuploader;
