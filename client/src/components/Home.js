import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {
  return (
    <div className="singlePageImgBackground2">
      <img className="logo" src="https://api.logo.com/api/v2/images?logo=logo_c417cd03-c2bc-4ca8-8a8f-9d82311134da&format=webp&margins=0&quality=60&width=500&background=transparent&u=1670268202"/>
      <div>
        <Carousel autoPlay dynamicHeight infiniteLoop className="main-slide">
          <div className="slide">
            <img
              alt="dog walking"
              src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
          </div>
          <div className="slide">
            <img
              alt="dog walking"
              src="https://images.unsplash.com/photo-1578301978018-3005759f48f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
          </div>
          <div className="slide">
            <img
              alt="dog walking"
              src="https://images.unsplash.com/photo-1579541671172-43429ce17aca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTQ5fHxhcnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            />
          </div>
          <div className="slide">
            <img
              alt="dog walking"
              src="https://images.unsplash.com/photo-1531913764164-f85c52e6e654?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBhaW50aW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            />
          </div>
        </Carousel>
      </div>
      <h4>Where artists connect.</h4>
    </div>
  );
};

export default Home;
