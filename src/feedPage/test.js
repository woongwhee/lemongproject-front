import React from 'react';


function Test(props) {

    const handleFileOnChange = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file : file,
                previewURL : reader.result
            })
        }
        reader.readAsDataURL(file);
    }

    function constructor(props) {
        this.state = {
            file : '',
            previewURL : ''
        }
    }

    return(
        <div>
            <input type='file'
                   accept='image/jpg,impge/png,image/jpeg,image/gif'
                   name='profile_img'
                   onChange={this.handleFileOnChange}>
            </input>
        </div>
    )

}

export default Test;