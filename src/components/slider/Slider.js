import React from 'react';
import Slider from 'infinite-react-carousel';

export const SimpleSlider = ({settings, width, heigth, image1, image2, image3}) => {

   
    return(
        <Slider { ...settings }>
            
                <div>
                    <img width={width} height={heigth} src={image1} alt="img1"/>
                </div>
                <div>
                    <img width={width} height={heigth} src={image2}  alt="img2"/>
                </div>
                <div>
                    <img width={width} height={heigth} src={image3}  alt="img3"/>
                </div>
         
        </Slider>
        )
};