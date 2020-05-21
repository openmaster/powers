import React, {Component} from 'react';

export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <h3 className="text-center">Welcome to Powersmiths online tools</h3>
                <h4>Create Project File</h4>
                <p>
                    Create a Project xml file from a clean excel file. <a href="../assets/sample.xls" download> Click here </a> to see the sample clean excel file. 
                    You can also share Project xml file with other users via Google Drive.
                </p>
                
                <h4>Create CT's File</h4>
                <p>
                    Compare various CT's based on their recent tests and create a set of similar behaving CT's for a job. 
                    You can also share CT's set xml with other users via Google Drive.
                </p>
                
            </div>
        );
    }
}
