import { makeStyles } from "@material-ui/core/styles";
import background from "./background.jpeg";

export default makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    width: "100%",
    height: "100vh",
    backgroundRepeat: "no-repeat",
    justifyContent: "center",
    overflowY: "auto",
    overflowX: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.70)",
    width: "100%",
    height: "100vh",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    padding: "0px 50px",
    [theme.breakpoints.down("md")]: {
      padding: "0px 0px",
    },
  },
  logo: {
    alignSelf: "baseline",
    flex: 1,
    marginTop: "2%",
    marginLeft: "2%",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      flex: 5,
      display: "block",
      marginLeft: "5%",
    },
    width: "100%",
    justifyContent: "center",
    flex: 3,
  },
  subContainer1: {
    width: "30%",
    padding: "0px 10px",
    [theme.breakpoints.up("lg")]: {
      width: "50%",
    },
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },

    "@media (min-width: 800px) and (max-width: 1300px)": {
      width: "80%",
    },
  },
  subContainer2: {
    width: "36%",
    padding: "0px 10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: 280,
    [theme.breakpoints.down("xs")]: {
      height: "auto",
      width: "100%",
    },
    "@media (min-width: 1920px)": {
      width: "35%",
      height: "350px",
    },
    "@media (min-width: 2560px)": {
      width: "31%",
      height: "350px",
    },
    "@media (min-width: 800px) and (max-width: 1024px)": {
      width: "100%",
      display: "block",
    },
    "@media (min-width: 1280px) and (max-width: 1365.95px)": {
      width: "51%",
    },
  },
  heading1: {
    color: "white",
    "&.css-1sra7t5-MuiTypography-root": {
      "@media (max-width: 320.95px)": {
        fontSize: "2.5rem",
      },
      "@media (min-width: 321px) and (max-width: 432.95px)": {
        fontSize: "2.6rem",
      },
      "@media (min-width: 800px) and (max-width: 1023px)": {
        fontSize: "5rem",
      },
      "@media (min-width: 1024px) and (max-width: 1300px)": {
        fontSize: "5rem",
      },
      "@media (min-width: 1920px)": {
        fontSize: "6rem",
      },
      "@media (min-width: 2560px)": {
        fontSize: "7rem",
      },
    },
  },
  heading2: {
    width: "80%",
    color: "white",
    fontSize: "1.5rem",
    "&.css-ag7rrr-MuiTypography-root": {
      "@media (max-width: 320.95px)": {
        fontSize: "0.95rem",
      },
      "@media (min-width: 321px) and (max-width: 432.95px)": {
        fontSize: "1.3rem",
      },
      "@media (min-width: 800px) and (max-width: 1023px)": {
        fontSize: "2.4rem",
      },
      "@media (min-width: 1024px) and (max-width: 1279.95px)": {
        fontSize: "3rem",
      },
      "@media (min-width: 1920px)": {
        fontSize: "2rem",
      },
      "@media (min-width: 2560px)": {
        fontSize: "2.4rem",
      },
    },
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#e0fe9c",
    color: "black",
    margin: "10px 0px",
    borderRadius: 0,
    width: 350,
    height: "70px",
    [theme.breakpoints.down("xs")]: {
      width: 250,
      height: "50px",
    },
    "@media (min-width: 800px) and (max-width: 1023.95px)": {
      width: 600,
      height: "100px",
    },
    "@media (min-width: 1024px) and (max-width: 1279.95px)": {
      width: 700,
      height: "100px",
    },
    "@media (min-width: 432px) and (max-width: 799.95px)": {
      width: 300,
      height: "70px",
    },
    "@media (min-width: 1920px)": {
      width: 457,
    },
    "@media (min-width: 2560px)": {
      width: 565,
    },
    boxShadow: "2px 2px 15px 2px rgba(255, 255, 255, 0.2)",
    padding: "0px 5px",
    justifyContent: "space-around",
    alignItems: "center",
    "&.css-1e6y48t-MuiButtonBase-root-MuiButton-root": {
      alignSelf: "flex-start",
      backgroundColor: "#e0fe9c",
      color: "black",
      margin: "10px 0px",
      borderRadius: 0,
      padding: "0px 5px",
      justifyContent: "space-around",
      alignItems: "center",
    },
    "&:hover": {
      color: "white",
    },
  },
  buttonTitle: {
    width: 150,
    textAlign: "left",
  },
  iconContainer: {
    width: 30,
    justifyContent: "center",
    display: "flex",
  },
}));
