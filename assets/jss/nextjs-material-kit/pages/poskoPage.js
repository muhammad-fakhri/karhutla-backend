import basePage from "./basePage";

const poskoPageStyle = {
  main: basePage.main,
  mainRaised: {
    margin: "88px 104px 0px",
    padding: "4px 16px 0 16px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    "@media (max-width: 830px)": {
      marginLeft: "10px",
      marginRight: "10px",
    },
  },
  textCenter: basePage.textCenter,
  input: {
    marginBottom: "18px",
  },
};

export default poskoPageStyle;
