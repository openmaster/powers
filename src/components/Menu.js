import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Menu extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <img src="../../logo/logo.png" width="140" height="35" alt="" />
                <div className="menu-items">
                    <Link className="btn btn-light" to={'/CT'}>CT File</Link>&nbsp;
                    <Link className="btn btn-light" to={'/PJT'}>Project File</Link>&nbsp;
                    <Link className="btn btn-light" to={'/'}>Home</Link>&nbsp;
                </div>
            </nav>
        );
    }
}
