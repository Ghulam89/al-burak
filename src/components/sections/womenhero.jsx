import React from "react";
import back from "../../assets/images/herobg.jpg";

const PerfumeBanner = () => {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h2 style={styles.topText}>Women Perfumes</h2>
        <div style={styles.bottomSection}>
          <h1 style={styles.bottomText}>BEST PERFUMES</h1>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "auto",
    backgroundImage: `url(${back})`, // Replace this with your actual image path
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px 0 0 0",
    boxSizing: "border-box",
  },
  topText: {
    color: "#E5D0A5",
    fontSize: "64px",
    fontFamily: "Rozha One",
    textAlign: "center",
    fontWeight: "400",
    letterSpacing: "8px",
    marginTop: "10px",
  },
  bottomSection: {
    backgroundColor: "#000",
    padding: "25px",
    textAlign: "left",
  },
  bottomText: {
    color: "#E5D0A5",
    fontSize: "40px",
    ontFamily: "Roboto",
    fontWeight: "600",
    letterSpacing: "10px",
    margin: 0,
  },
};

export default PerfumeBanner;
