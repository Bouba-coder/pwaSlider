import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ReactQuill from "react-quill";
import CloseIcon from "@mui/icons-material/Close";
import { Upload } from "upload-js";
import AddIcon from "@mui/icons-material/Add";
import useWindowDimensions from "./useWindowDimentions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export default function PresentationModal({
  open,
  setOpen,
  title,
  setTitle,
  content,
  setContent,
  addPresentation,
  presentationBkg,
  setPresentationBkg,
  lightContent,
  setLightContent,
}) {
  const screenDimensions = useWindowDimensions();
  const handleClose = () => setOpen(false);
  const inputRef = useRef();
  var upload = new Upload({ apiKey: "public_12a1xmX7TnQrpmb2H36CLoF9R1US" });

  useEffect(() => {}, [lightContent]);

  const uploadFile = upload.createFileInputHandler({
    onUploaded: ({ fileUrl, fileId }) => {
      console.log(`File uploaded! ${fileUrl}`);
      console.log("url", fileUrl);
      setPresentationBkg(fileUrl);
    },
  });

  const onUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
      uploadFile(e);
    }
  };
  const uploadBkg = () => {
    inputRef?.current?.click();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-content"
      >
        <Box
          sx={[
            style,
            {
              width:
                screenDimensions.width < 600
                  ? screenDimensions.width - 20
                  : 420,
            },
          ]}
        >
          <div
            style={{
              marginBottom: 30,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </div>

          <input
            placeholder="Add the Title"
            className="add-input"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            style={{ marginBottom: 20 }}
          />
          <div
            style={{
              height:
                screenDimensions.height < 800
                  ? 0.3 * screenDimensions.height
                  : 300,
            }}
            className="presentation-inner overflow-y-scroll"
          >
            <ReactQuill
              className="react-quill"
              value={content}
              onChange={(val) => setContent(val)}
              placeholder="Add your presentation  content here"
            />
          </div>

          <div className="flex flex-col">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              placeholder="Add Presentation Background"
              multiple={false}
              onChange={onUpload}
              className="hidden"
            />
            <div className="flex flex-row items-center justify-between mt-4">
              <div
                onClick={uploadBkg}
                className="cursor flex flex-row items-cente text-sm font-bold"
              >
                <AddIcon />
                <p>Background Image</p>
              </div>
              <label
                className="flex items-center"
                onClick={() => setLightContent(!lightContent)}
              >
                <input
                  type="radio"
                  value={lightContent}
                  checked={lightContent}
                  name="dark-content"
                  className="text-red-500 mr-1"
                />
                Light Content
              </label>
            </div>
            {presentationBkg && (
              <img src={presentationBkg} alt="presentation background" />
            )}
          </div>

          <div className="button-container">
            <button className="add-docs" onClick={addPresentation}>
              Add
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
