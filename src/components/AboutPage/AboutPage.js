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
        <div>
            <div className="aboutPageSectionTitle">
                Cite as:
            </div>
            <div className="aboutPageParagraph">
                Gostick J, Khan ZA, Tranter TG, Kok MDR, Agnaou M, Sadeghi MA, Jervis R. PoreSpy: A Python Toolkit for Quantitative Analysis of Porous Media Images. Journal of Open Source Software, 2019. doi:10.21105/joss.01296
            </div>
            <div className="aboutPageSectionTitle">
                What is PoreSpy?
            </div>            
            <div className="aboutPageParagraph">
                PoreSpy is a collection of image analysis tool used to extract information from 3D images of porous materials (typically obtained from X-ray tomography). 
                There are many packages that offer generalized image analysis tools (i.e Skimage and Scipy.NDimage in the Python environment, ImageJ, MatLab’s Image Processing Toolbox), but the all require building up complex scripts or macros to accomplish tasks of specific use to porous media. 
                The aim of PoreSpy is to provide a set of pre-written tools for all the common porous media measurements.
            </div>
            <div className="aboutPageParagraphWithLinks">
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
            <div className="aboutPageSectionTitle">
                Capabilities
            </div>
            <div className="aboutPageParagraph">
                -Generators: Routines for generating artificial images of porous materials useful for testing and illustration
            </div>
            <div className="aboutPageParagraph">
                -Filters: Functions that accept an image and return an altered image
            </div>
            <div className="aboutPageParagraph">
                -Metrics: Tools for quantifying properties of images
            </div>
            <div className="aboutPageParagraph">
                -Networks: Algorithms and tools for analyzing images as pore networks
            </div>
            <div className="aboutPageParagraph">
                -Visualization: Helper functions for creating useful views of the image
            </div>
            <div className="aboutPageParagraph">
                -IO: Functions for outputting image data in various formats for use in common software
            </div>
            <div className="aboutPageParagraph">
                -Tools: Various useful tools for working with images
            </div>
        </div>
    )
}

export default AboutPage;
