import React, { Component } from 'react';
import CompareCTData from './compareCT';
const axios = require('axios');


export default class CreateCTs extends Component {
    constructor(props) {
        super(props);
        this.state = { ctData: null, error: null }
        this.uploadFile = this.uploadFile.bind(this);
    }

    uploadFile(e) {
        e.preventDefault();
        const file = document.getElementById('ctFiles');
        const selectedFiles = document.getElementById('fileUploader');
        let formData = new FormData(file);

        if (selectedFiles.files.length < 1) {
            return;
        }
        const request = {
            url: '/api/uploadCT',
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        axios(request).then((result) => {
            this.setState({ ctData: result.data })
        }).catch((err) => {
            this.setState({ error: err });
            console.log(err);
        })
    }

    showError() {
        const error = this.state.error;
        if (error) {
            return (<div className="alert alert-danger mb-2" role="alert">{error.toString()}</div>);
        }
    }

    showCompareson() {
        const ctData = this.state.ctData;
        if (ctData) {
            return (<CompareCTData CTData={ctData} />);
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="fileSelect">
                        <h3>Make CT sets From individual CT files.</h3>
                        <form id="ctFiles" name="ctFiles">
                            <input type="file"
                                id="fileUploader"
                                name="uploadedFile"
                                accept="application/xml"
                                onChange={this.uploadFile}
                                multiple={true} />
                        </form>
                    </div>
                </div>
                {this.showError()}
                {this.showCompareson()}
            </div>
        );
    }
}