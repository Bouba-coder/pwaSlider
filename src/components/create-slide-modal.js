import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import useWindowDimensions from "./useWindowDimentions";
import TextEditor from "./TextEditor";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export default function SlideModal({
  open,
  setOpen,
  title,
  setTitle,
  description,
  setDescription,
  addData,
}) {
  const screenDimensions = useWindowDimensions();
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log("title", title, "description", description);
  }, [title, description]);

  const onChangeTitle = (event) => {
    console.log("title changed", title, description);
    setTitle(event?.target?.value);
  };

  const onChangeDescription = (val) => {
    console.log("description changed", title, description);
    setDescription(val);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
            onChange={onChangeTitle}
            value={title}
            style={{ marginBottom: 20 }}
          />
          <div
            className="createSlide-inner overflow-y-scroll"
            style={{
              height:
                screenDimensions.height < 800
                  ? 0.6 * screenDimensions.height
                  : 550,
            }}
          >
            <TextEditor
              description={description}
              onChange={onChangeDescription}
              handleImage
            />
          </div>

          <div className="button-container">
            <button className="add-docs" onClick={addData}>
              Add
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
