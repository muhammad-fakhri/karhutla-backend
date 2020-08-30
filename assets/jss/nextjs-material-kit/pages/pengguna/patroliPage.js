const manualPageStyle = {
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "88px 56px 0px",
    padding: "4px 0 16px 0",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    "@media (max-width: 830px)": {
      marginLeft: "10px",
      marginRight: "10px"
    }
  },
  textCenter: {
    textAlign: "center"
  },
  textAlignLeft: {
    textAlign: 'left',
  },
  form: {
    marginTop: '32px'
  },
  title: {
    marginTop: '24px'
  },
  submitButton: {
    paddingTop: '16px'
  }
};

export default manualPageStyle;
