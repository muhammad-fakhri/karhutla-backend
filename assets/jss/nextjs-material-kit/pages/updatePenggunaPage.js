import basePage from "./basePage";

const createPenggunaPageStyle = {
  ...basePage,
  textAlignLeft: {
    textAlign: "left",
  },
  closeButton: {
    position: "absolute",
    right: "8px",
    top: "8px",
    color: "#e6e1e1",
  },
  dialogTitle: {
    marginRight: "32px",
  },
};

export default createPenggunaPageStyle;
