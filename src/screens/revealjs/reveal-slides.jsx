import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import RevealClass from "./revealjs";

const RevealSlides = () => {
const location = useLocation();
const { slideList, presentation_background, styles } = location.state;
  const [reveal, setReveal] = useState(null);

  useEffect(() => {
    setReveal(new RevealClass());
  }, []);

  return (
    <div style={{   background: "lightgray",
    display: "flex",
    width: "90vw",
    height: "80vh",
    margin: "0px auto 0 auto",
    position: "relative",}}>


     <div className="reveal"  style={{
              backgroundImage: `url(${presentation_background})`,
            }}>
      <div className="slides">
        <section>
          {slideList.map((slide, index) => (
            <section
              className={` ${styles?.primary}`}
              id={slide.title}
              key={index}
            >
              <div  className="capitalize">
                 <p className="text-7xl font-bold" >{slide.title}</p>
              </div>
             
              <div 
              className={`  ${styles?.secondary}`}
              dangerouslySetInnerHTML={{ __html: slide.description }}></div>
            </section>
          ))}
        </section>
      </div>
    </div>
    </div>
  );
};

export default RevealSlides;
