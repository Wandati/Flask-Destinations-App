import React from "react";

function Footer() {
  const containerStyle = {
    backgroundColor: "black", // Set the background color to black
    color: "white", // Set text color to white
    marginTop: "200px", // Add a top margin of 100px
  };

  const textCenterStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  };

  // const footerStyle = {
  //   position: "fixed",
  //   bottom: 0,
  //   width: "100%",
  // };

  return (
    <footer className="text-center text-white" style={containerStyle}>
      <div className="container p-4">
        <section>
          <div className="row">
            {/* Your images here */}
          </div>
        </section>
      </div>

      <div className="text-center p-3" style={textCenterStyle}>
        © 2023 Copyright: Destination App
      </div>
    </footer>
  );
}

export default Footer;
