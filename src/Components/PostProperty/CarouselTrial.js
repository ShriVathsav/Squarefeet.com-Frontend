import React from "react";
import { Image, Button, Container } from "semantic-ui-react";

const CarouselTrial = () => {
    const src = 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?ixlib=rb-1.2.1&w=1000&q=80';

    return (

        <div className="card-slider">
            <div className="card-slider-wrapper">
                <Image src={src} />
                <Image src={src} />
                <Image src={src} />
                <Image src={src} />
                <Image src={src} />
                <Image src={src} />
                <Image src={src} />
                <Image src={src} />
            </div>
        </div>

    );
}

export default CarouselTrial;

