import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import './FeedPicture.css'

function FeedPicture(props) {
    //파일 미리볼 url을 저장해줄 state
    const [fileImage, setFileImage] = useState("");

    // 파일 저장
    const saveFileImage = (e) => {
        for(let i = 0; i<e.target.files.length; i++){

            setFileImage(URL.createObjectURL(e.target.files[i]));
        }
    };

    // 파일 삭제
    const deleteFileImage = () => {
        URL.revokeObjectURL(fileImage);
        setFileImage("");
    };



    return (
        <>
            <table>
                <thead>
                <tr>
                <th>이미지 미리 보기</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <input
                            name="imgUpload"
                            type="file"
                            accept="image/*"
                            onChange={saveFileImage}
                            multiple
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="imagePreview" >
                            {fileImage && (<img
                                    alt="sample"
                                    src={fileImage}
                                    style={{margin: "auto", width: "500px", height: "500px"}}
                                />)}
                        </div>
                        <div>
                            <button
                                style={{
                                    backgroundColor: "gray",
                                    color: "white",
                                    width: "55px",
                                    height: "40px",
                                    cursor: "pointer",
                                }} onClick={() => deleteFileImage()}>
                                삭제
                            </button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <button> 사진 저장 하기 </button>
        </>
    );
}

export default FeedPicture;