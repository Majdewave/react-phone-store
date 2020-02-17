import React, { Component } from 'react';
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";

const SearchPage = () => {
    return (
        <MDBCol md="6">
            <MDBFormInline className="md-form">
                <input className=" search form-control form-control-sm col-md-12" type="text" placeholder="Search" aria-label="Search" />
                <div className="searchIcon"></div>
            </MDBFormInline>
        </MDBCol>
    );
}

export default SearchPage;