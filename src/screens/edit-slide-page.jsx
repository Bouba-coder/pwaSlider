import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import { updateDoc, collection, doc } from "firebase/firestore";
import useWindowDimensions from "../components/useWindowDimentions";
import TextEditor from "../components/TextEditor";
import { database } from "../services/firebase";
import CheckIcon from '@mui/icons-material/Check';

export default function EditSlide({ slide , styles}) {
  console.log("slide bro", slide);
  const screenDimensions = useWindowDimensions();
  const collectionRef = collection(database, "slideList");
  const [slideId, setSlideId] = useState(slide?.id || "");
  const [title, setTitle] = useState(slide?.title || "");
  const [description, setDescription] = useState(slide?.description || "");
  const document = doc(collectionRef, slideId);

  useEffect(() => {
    const updateInfo = () => {
      if (slide !== null) {
        setTitle(slide.title);
        setDescription(slide.description);
        setSlideId(slide.id);
      }
    };
    updateInfo();
  }, [slide]);

  const getQuillData = (value) => {
    setDescription(value);
  };


  const updateSlide = () => {
    if (description && title && slideId.length > 0) {
      updateDoc(document, {
        description: description,
        title: title,
      })
        .then(() => {
          toast.success("Document Saved");
        })
        .catch(() => {
          toast.error("Cannot Save Document", {
            autoClose: 2000,
          });
        });
    }
 
  };
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="editDocs-main">
        <div className={`flex flex-row mt-2 mb-4  w-full items-center justify-end ${styles?.secondary}`}>
          <div onClick={updateSlide}>
          <CheckIcon />{"Save"}
          </div>
        </div>
        <div>
          <input
            placeholder="Add the Title"
            className="add-input"
            onChange={onChangeTitle}
            value={title}
            style={{
              marginBottom: 50,
              width:
                screenDimensions.width < 600
                  ? screenDimensions.width - 20
                  : 420,
            }}
          />
        </div>

        <div
          className={`editDocs-inner overflow-y-scroll ${styles?.primary}`}
          style={{
            width:
              screenDimensions.width < 600 ? screenDimensions.width - 20 : 420,

            height:
              screenDimensions.height < 600
                ? 0.6 * screenDimensions.height
                : 550,
          }}
        >
          <TextEditor
            description={description}
            onChange={getQuillData}
            handleImage
          />
        </div>
      </div>
    </div>
  );
}
