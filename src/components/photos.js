import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = "tniodfjg";
const CLOUDINARY_UPLOAD_URL = "";

export default class Photos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadedFile: null,
            uploadedFileCloudinaryUrl: ''
        };
        this.onImageDrop = this.onImageDrop.bind(this)
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });

        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file);

    upload.end((err, response) => {
        if (err) {
            console.log(err)
        }
        if (response.body.secure_url !== '') {
            this.setState({
                uploadedFileCloudinaryUrl: response.body.secure_url
            })
        }
    })
    
    }


  render() {
    return (
        <form>
            <div>
                <Dropzone
                onDrop={this.onImageDrop}
                multiple={false}
                accept="image/*">
                <div>Drop an image or click to select a picture to upload </div>
                </Dropzone>
            </div>
            <div>
                {this.state.uploadedFileCloudinaryUrl === '' ? null :
                <div>
                    <p>{this.state.uploadedFile.name}</p>
                    <img src={this.state.uploadedFileCloudinaryUrl} /> 
                </div>}
            </div>
        </form>
        
    );
  }
}