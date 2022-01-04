import React from 'react'
// import firstslide from './first-slide.jpg'
// import secondslide from './second-slide.jpg'
// import slide from './slide.jpg'
// import thirdslide from './third-slide.jpg


// import Carousel from 'react-bootstrap/Carousel'
import './CarouselComp.css';



function CarouselComp() {
  return (

    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators ">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <h2 className="d-block w-100 text-center">Our team create a new service.</h2>
        </div>
        <div className="carousel-item">
          <h2 className="d-block w-100 text-center">Scan any image to detect if passport or not.</h2>
        </div>
        <div className="carousel-item">
          <h2 className="d-block w-100 text-center">If it's passport, you 'll get its data.</h2>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>


  );
}

export default CarouselComp;
