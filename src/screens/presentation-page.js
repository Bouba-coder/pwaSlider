import React, { useState, useEffect } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import SlideModal from "../components/create-slide-modal";
import EditSlide from "./edit-slide-page";
import { useAppState } from "../context/app-state-context";
import useWindowDimensions from "../components/useWindowDimentions";
var truncate = require("html-truncate");

const defaultMsg = {
  title: ".",
  description: ".",
  id: ".",
};

export default function Presentation({ database }) {
  const { appState, setAppState } = useAppState();
  const { activeSlide } = appState;
  const [open, setOpen] = React.useState(false);
  const [slideList, setSlideList] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const location = useLocation();
  const { presentation, presentation_background } = location.state;
  const screenDimensions = useWindowDimensions();
  const isMobile = screenDimensions.width < 600;
  const collectionRef = collection(database, "slideList");

  const addData = () => {
    addDoc(collectionRef, {
      title: title,
      description: description,
      presentation_id: presentation.id,
    })
      .then(() => {
        //alert("Data Added");
        handleClose();
      })
      .catch(() => {
        alert("Cannot add data");
      });
  };

  const setActiveSlide = (slide) => {
    setAppState({ activeSlide: slide });
  };

  useEffect(() => {
    const getData = () => {
      onSnapshot(collectionRef, (data) => {
        const slides =
          data.docs.reduce((acc, doc) => {
            const slide = { ...doc.data(), id: doc.id };
            if (slide?.presentation_id === presentation.id) {
              return [...acc, slide];
            }
            return acc;
          }, []) || [];

        setSlideList(slides);
      });
    };

    getData();
  }, [collectionRef, presentation.id, setSlideList]);

  const renderMobile = () => {
    return (
      <div className="flex flex-col justify-center">
        <div className="w-full overflow-x-scroll my-8  flex flex-row  items-center border-2 border-gray-300 px-2">
          {slideList?.map((doc, index) => {
            return (
              <div
                key={index}
                className={`h-full p-2 m-2 ${
                  activeSlide?.id === doc.id ||
                  (slideList?.[0]?.id === doc.id && !activeSlide)
                    ? "bg-teal-300"
                    : ""
                }`}
                style={{
                  maxWidth: screenDimensions.width - 40,
                  minWidth: 0.7 * screenDimensions.width,
                }}
              >
                <div
                  key={index}
                  className="grid-child bg-white h-40 "
                  onClick={() => setActiveSlide(doc)}
                >
                  <p className="font-bold text-xl py-2">
                    {doc.title.charAt(0).toUpperCase() + doc.title.slice(1)}
                  </p>
                  <div
                    className="text-gray-500"
                    style={{ maxHeight: 100 }}
                    dangerouslySetInnerHTML={{
                      __html: truncate(doc.description, 100),
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`border-2 mt-8 mb-16 border-gray-200 ${
            isMobile ? "" : " px-8"
          }`}
          style={{
            backgroundImage: `url(${presentation_background})`,
          }}
        >
          <div className=" mt-4">
            <EditSlide
              presentation_background={presentation_background}
              slide={activeSlide || slideList?.[0] || defaultMsg}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderDesktop = () => {
    return (
      <div className="flex flex-row justify-center min-h-screen mb-8 ">
        <div className="mr-8 border-2 border-gray-300  px-2">
          {screenDimensions.width > 600 &&
            slideList?.map((doc, index) => {
              return (
                <div
                  key={index}
                  className={`p-2 mt-2 ${
                    activeSlide?.id === doc.id ||
                    (slideList?.[0]?.id === doc.id && !activeSlide)
                      ? "bg-teal-300"
                      : ""
                  }`}
                >
                  <div
                    key={index}
                    className="grid-child bg-white h-44"
                    style={{
                      width: 220,
                    }}
                    onClick={() => setActiveSlide(doc)}
                  >
                    <p className="font-bold text-xl py-2">
                      {doc.title.charAt(0).toUpperCase() + doc.title.slice(1)}
                    </p>
                    <div
                      className="text-gray-500"
                      style={{ maxHeight: 100 }}
                      dangerouslySetInnerHTML={{
                        __html: truncate(doc.description, 100),
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <div className="border-2 border-gray-200 px-8">
          <div
            className="grid-child my-4"
            style={{
              backgroundImage: `url(${presentation_background})`,
            }}
          >
            <EditSlide slide={activeSlide || slideList?.[0] || defaultMsg} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="docs-main">
      <button className="add-docs mb-8" onClick={handleOpen}>
        Add a Slide
      </button>
      {slideList.length > 0 && (isMobile ? renderMobile() : renderDesktop())}
      <SlideModal
        open={open}
        setOpen={setOpen}
        title={title}
        setTitle={setTitle}
        addData={addData}
        description={description}
        setDescription={setDescription}
      />
    </div>
  );
}
