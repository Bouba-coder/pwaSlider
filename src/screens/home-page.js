import React, { useState, useEffect } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import defaultPresentationBkg from "../assets/images/slide_background.jpeg";
import useWindowDimensions from "../components/useWindowDimentions";
import PresentationModal from "../components/create-presentation-modal";

export default function Home({ database }) {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [presentationList, setPresentationList] = useState([]);
  const [presentationBkg, setPresentationBkg] = useState(null);
  const [lightContent, setLightContent] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const screenDimensions = useWindowDimensions();
  const collectionRef = collection(database, "presentation");
  const slidesRef = collection(database, "slideList");

  const addPresentation = () => {
    addDoc(collectionRef, {
      id_user: "userid_cornelius",
      editors: [],
      title: title,
      content: content,
      presentation_background: presentationBkg,
      lightContent: lightContent,
    })
      .then(() => {
        alert("Presentation Added");
        handleClose();
      })
      .catch(() => {
        alert("Cannot add Presentation");
      });
  };

  useEffect(() => {
    const getData = () => {
      onSnapshot(collectionRef, (data) => {
        setPresentationList(
          data.docs?.map((doc) => {
            return { ...doc.data(), id: doc.id };
          }) || []
        );
      });
    };
    getData();
  }, [collectionRef]);

  const gotoPresentation = (presentation, presentation_background, styles) => {
    navigate(`/presentation/${presentation.id}`, {
      state: {
        presentation: presentation,
        presentation_background: presentation_background,
        styles: styles,
      },
    });
  };

  const gotoReveal = (presentation, presentation_background, styles) => {
    onSnapshot(slidesRef, (data) => {
      const slides = data.docs.reduce((acc, doc) => {
        const slide = { ...doc.data(), id: doc.id };
        if (slide?.presentation_id === presentation.id) {
          return [...acc, slide];
        }
        return acc;
      }, []);
      navigate(`presentation/reveal/${presentation.id}`, {
        state: {
          slideList: slides,
          presentation_background: presentation_background,
          styles: styles,
        },
      });
    });
  };

  return (
    <div className="docs-main">
      <button className="add-docs" onClick={handleOpen}>
        Add a Presentation
      </button>

      <div className="grid-main">
        {presentationList.map((doc, index) => {
          const presentation_background =
            doc?.presentation_background || defaultPresentationBkg;
          const styles =
            doc?.lightContent === true
              ? {
                  primary: "text-white",
                  secondary: "text-gray-100",
                }
              : {
                  primary: "text-black",
                  secondary: "text-gray-700",
                };

          return (
            <div
              key={index}
              className="grid-child mt-4"
              style={{
                width:
                  screenDimensions.width < 600
                    ? screenDimensions.width - 20
                    : 420,
                backgroundImage: `url(${presentation_background})`,
              }}
            >
              <div
                onClick={() => gotoReveal(doc, presentation_background, styles)}
                className="w-8"
              >
                <VisibilityIcon />
              </div>
              <div
                onClick={() =>
                  gotoPresentation(doc, presentation_background, styles)
                }
              >
                <p className="font-bold text-xl py-2">
                  {doc.title.charAt(0).toUpperCase() + doc.title.slice(1)}
                </p>
                <div
                  className="text-xs text-gray-600"
                  dangerouslySetInnerHTML={{ __html: doc.content }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <PresentationModal
        open={open}
        setOpen={setOpen}
        title={title}
        setTitle={setTitle}
        addPresentation={addPresentation}
        content={content}
        setContent={setContent}
        setPresentationBkg={setPresentationBkg}
        presentationBkg={presentationBkg}
        setLightContent={setLightContent}
        lightContent={lightContent}
      />
    </div>
  );
}
