//
//  AboutPage.js
//  porespy-frontend
//

import React from 'react';
import Link from '@material-ui/core/Link';
import './AboutPage.css';

const AboutPage = () => {
    const preventDefault = (e) => {
        e.preventDefault();
    }

    return (
        <div className="aboutPageWrapper">
            <br />

            <div>
                Cite as:
            </div>

            <br />

            <div>
                Gostick J, Khan ZA, Tranter TG, Kok MDR, Agnaou M, Sadeghi MA, Jervis R. PoreSpy: A Python Toolkit for Quantitative Analysis of Porous Media Images. Journal of Open Source Software, 2019. doi:10.21105/joss.01296
            </div>

            <br />

            <div>
                What is PoreSpy?
            </div>

            <br />
            
            <div>
                PoreSpy is a collection of image analysis tool used to extract information from 3D images of porous materials (typically obtained from X-ray tomography). 
                There are many packages that offer generalized image analysis tools (i.e Skimage and Scipy.NDimage in the Python environment, ImageJ, MatLab’s Image Processing Toolbox), but the all require building up complex scripts or macros to accomplish tasks of specific use to porous media. 
                The aim of PoreSpy is to provide a set of pre-written tools for all the common porous media measurements.
            </div>

            <br />

            <div>
                PoreSpy relies heavily on two general image analysis packages:&nbsp;
                <Link 
                    href="https://docs.scipy.org/doc/scipy/reference/ndimage.html"
                    preventDefault={preventDefault}
                    target="_blank"
                >
                    scipy.ndimage 
                </Link>
                &nbsp;and&nbsp;
                <Link 
                    href="https://scikit-image.org/"
                    preventDefault={preventDefault}
                    target="_blank"
                >
                    scikit-image
                </Link>
                &nbsp;also known as skimage. 
                The former contains an assortment of general image analysis tools such as image morphology filters, while the latter offers more complex but still general functions such as watershed segmentation. 
                PoreSpy does not duplicate any of these general functions so you will also have to install and learn how to use them to get the most from PoreSpy. 
                The functions in PoreSpy are generally built up using several of the more general functions offered by skimage and scipy. 
                There are a few functions in PoreSpy that are implemented natively, but only when necessary. 
            </div>
        </div>
    )
}

export default AboutPage;
