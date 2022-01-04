import "./Help.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import arnb from "./images/arnoub.jpg";
import kareem from "./images/kareem.jpg";
import bodykh from "./images/bodykh.jpg";
import farouk from "./images/farouk.jpg";
import halemo from "./images/halemo.jpg";
import koko from "./images/koko.jpg";
import abbas from "./images/abbas.jpg";
import adry from "./images/adry.jpg";
import haram from "./images/haram.jpg";
import ostaz from "./images/ostaz.jpg";
import ahmedH from "./images/ahmedH.jpg";
import ahmedAli from "./images/ahmedAli.jpg";
import mazen from "./images/mazen.jpg";
import mosalah from "./images/mosalah.jpg";
// logos

import react from "./images/3.png";
import Flask from "./images/10.png";
import font from "./images/4.png";
import jwt from "./images/2.png";
import mysql from "./images/7.png";
import bootstrap from "./images/5.png";
import tessract from "./images/9.png";
import axios from "./images/6.png";
import Werkzeug from "./images/8.png";
import ras from "./images/1.png";


function Help() {
  return (
    <div className="container  w-5 my-5">
      {/* info section */}
      <section className="row d-flex justify-content-evenly ">
        <div class="card text-dark bg-light mb-3 col-lg-4 border-0 p-4 shadow-sm border-start border-primary rounded-0 ">
          <div className="header fw-bold  mb-4">
            There are always clear and explicit goals for any system, and the
            goals of this system are
          </div>
          <div className="text">
            <div>
              Recognizing and identifying a person through his passport Verify
              the validity of the passport.
            </div>
            <div>
              Recognizing and identifying a person through his passport Verify
              the validity of the passport.
            </div>
          </div>
        </div>

        <div class="card text-dark bg-light mb-3 col-lg-4 border-0 p-4 shadow-sm border-start border-primary rounded-0 ">
          <div className="header fw-bold mb-4">
            The system consists of three parts, each part is complementary to
            the other and without any part the system will collapse, and these
            parts are
          </div>
          <div className="text">
            <div>
              -A system based on microprocessors, and this is the hardware.
            </div>
            <div>- Web API, and this is the back end.</div>
            <div>- Web graphic user interface, and this is the front end.</div>
          </div>
        </div>
      </section>
      {/* developers section */}
      <hr className="hr  w-50  text-center mx-auto my-5"></hr>
      <h1 className="text-center ourteam mb-2 ">Our Team</h1>
      <section className="row mt-5 d-flex justify-content-center">
        <div className="col">
          <Splide
            options={{
              type: "loop",
              gap: "1rem",
              perPage: 4,
              autoplay: true,
              pauseOnHover: false,
              resetProgress: false,
              arrows: true,
            }}
            className="p-4"
          >
            <SplideSlide className="slide">
              <div className="imgcircle">
                <img className="shadow" src={arnb} alt="Image 1" />
              </div>
            </SplideSlide>
            <SplideSlide className="slide">
              <div className="imgcircle">
                <img className="shadow" src={haram} alt="Image 1" />
              </div>
            </SplideSlide>
            <SplideSlide className="slide">
              <div className="imgcircle">
                <img className="shadow" src={adry} alt="Image 1" />
              </div>
            </SplideSlide>
            <SplideSlide className="slide">
              <div className="imgcircle">
                <img className="shadow" src={koko} alt="Image 1" />
              </div>
            </SplideSlide>
            <SplideSlide className="slide">
              <div className="imgcircle">
                <img className="shadow" src={bodykh} alt="Image 1" />
              </div>
            </SplideSlide>
            <SplideSlide className="slide">
              <div className="imgcircle">
                <img className="shadow" src={farouk} alt="Image 1" />
              </div>
            </SplideSlide>
            <SplideSlide className="slide">
              <div className="imgcircle">
                <img className="shadow" src={ostaz} alt="Image 1" />
              </div>
            </SplideSlide>
            <SplideSlide className="slide">
              <div className="imgcircle">
                <img className="shadow" src={kareem} alt="Image 1" />
              </div>
            </SplideSlide>
            <SplideSlide className="slide">
              <div className="imgcircle">
                <img className="shadow" src={abbas} alt="Image 1" />
              </div>
            </SplideSlide>
            <SplideSlide className="slide">
              <div className="imgcircle">
                <img className="shadow" src={halemo} alt="Image 1" />
              </div>
            </SplideSlide>
            <SplideSlide className="slide">
              <div className="imgcircle">
                <img className="shadow" src={ahmedAli} alt="Image 1" />
              </div>
            </SplideSlide>
            <SplideSlide className="slide">
              <div className="imgcircle">
                <img className="shadow" src={ahmedH} alt="Image 1" />
              </div>
            </SplideSlide>
            <SplideSlide className="slide">
              <div className="imgcircle">
                <img className="shadow" src={mazen} alt="Image 1" />
              </div>
            </SplideSlide>
            <SplideSlide className="slide">
              <div className="imgcircle">
                <img className="shadow" src={mosalah} alt="Image 1" />
              </div>
            </SplideSlide>
          </Splide>
        </div>
      </section>
      {/* tech section */}
      <hr className="hr  w-50  text-center mx-auto my-5"></hr>
      <h1 className="text-center ourteam mb-2 ">
        The tools we used to create the system, and the tools and frameworks we
        used in the project are
      </h1>
      <section className="row ">
        <div className=" d-flex justify-content-evenly mt-5 flex-wrap    ">
          <div className="logos">
              <img src={react}/>
          </div>
          <div className="logos">
          <img src={Flask}/>
          </div>
          <div className="logos">
          <img src={jwt}/>
          </div>
          <div className="logos">
          <img src={mysql}/>
          </div>
          <div className="logos">
          <img src={font}/>
          </div>
          <div className="logos">
          <img src={bootstrap}/>
          </div>
          <div className="logos">
              <img src={ras}/>
          </div>
          <div className="logos">
              <img src={tessract}/>
          </div>
          <div className="logos">
              <img src={Werkzeug}/>
          </div>
          <div className="logos">
              <img src={axios}/>
          </div>
          
        </div>
      </section>
    </div>
  );
}

export default Help;
