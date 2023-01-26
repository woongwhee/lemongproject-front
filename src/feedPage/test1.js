import React, {useState} from 'react';
import axios from "axios";

function Test1(props) {
    const [file, setFile] = useState(null);	//파일

    const handleChangeFile = (event) => {
        setFile(event.target.files);
        console.log(file)
    }

    function Send(){
        const formData = new FormData();
        // 파일 데이터 저장
        Object.values(file).forEach((file) => formData.append("file", file));


        axios.post('/api/feed/feedImage', formData, {
            headers: {
                "Content-Type": `multipart/form-data; `,
            }
        }).then((response) => {
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            })

    }

    return (
        <div>
            FileData
            <div>
                fileData1:  <input type="file" id="file" onChange={handleChangeFile} multiple="multiple"/>
            </div>


            <div>
                <button onClick={()=> Send()}>Send</button>
            </div>
        </div>
    );
}


export default Test1;