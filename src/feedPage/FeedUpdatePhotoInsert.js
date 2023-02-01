// import React, {useState} from 'react';
// import axios from "axios";
//
// function FeedUpdatePhotoInsert(props) {
//     const filePathList = props.filePathList;
//     const photoNoList = props.photoNoList;
//
//     const [getPhotoNoList, setPhotoNoList] = useState(photoNoList);
//     const putPhotoNo = (PhotoNo) => {
//         const newList=[...getPhotoNoList,PhotoNo];
//         setPhotoNoList(newList);
//         console.log(newList);
//         props.addPhotoNoList(newList);
//     }
//
//     const [getPhotoList,setPhotoList]=useState(filePathList);
//     const putPhoto = (newPhoto) => {
//         const newPList=[...getPhotoList,newPhoto]
//         setPhotoList(newPList);
//         console.log(newPList)
//         props.addPhotoPathList(newPList)
//     }
//
//
//
//     const onChange = async (e) => {
//         e.preventDefault();
//         if(e.target.files){
//             const uploadFile = e.target.files[0]
//             const formData = new FormData()
//             formData.append('files',uploadFile)
//
//             const response = await axios({
//                 method: 'post',
//                 url: '/api/feed/insertPhoto',
//                 data: formData,
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             }
//             );
//             if(response.data.code==='2000'){
//                 console.log(response.data.result.filePath);
//                 console.log(response.data.result.changeName);
//
//                 const newFilePath = (response.data.result.filePath);
//                 const newChangeName = (response.data.result.changeName);
//
//                 const newFilePathName = newFilePath+newChangeName;
//                 // console.log(newFilePathName);
//                 putPhoto([newFilePathName]);
//                 putPhotoNo(response.data.result.photoNo) // photoNo List 시키기
//
//                 // props.newPhotoNoList();
//                 // props.newPhotoPathList();
//
//                 e.target.value="";
//             }
//         }
//     }
//
//
//     return (
//         <div>
//             <input
//                 type="file"
//                 accept="image/*"
//                 onChange={onChange}
//             /><br/>
//             <button onClick={()=>{
//                 props.newPhotoNoList();
//                 props.newPhotoPathList();
//             }}>수정하기</button>
//         </div>
//     );
// }
//
// export default FeedUpdatePhotoInsert;