import React, { FC } from 'react'

const NotFoundRedirect: FC = () => {

    /* error-box */


    return (
        <div className="main-wrapper">
            <div className="preloader">
                <div className="lds-ripple">
                    <div className="lds-pos" />
                    <div className="lds-pos" />
                </div>
            </div>
            <div className="error-box">
                <div className="error-body text-center">
                    <h1 className="error-title text-danger">404</h1>
                    <h3 className="text-uppercase error-subtitle">PAGE NOT FOUND !</h3>
                    <p className="text-muted mt-4 mb-4">
                        YOU SEEM TO BE TRYING TO FIND HIS WAY HOME
                    </p>
                    <a href="javascript:history.back(1)" className="btn btn-danger btn-rounded waves-effect waves-light mb-5 text-white">Back to home</a>
                </div>
            </div>
        </div>

    )
}

export default NotFoundRedirect