import React from "react";

function Footer() {
  return (
    <>
      <footer
        className="navbar navbar-default navbar-static-top"
        style={{
          WebkitTextAlign: "center",
          textAlign: "center",
          fontWeight: "bold",
          margin: "0",
          padding: "0",
          boxSizing: "border-box",
          position: "fixed",
          bottom: "0",
          width: "100%",
        }}
      >
        <section style={{ width: "49%", textAlign: "right" }}>
          Copyright © 2024
        </section>
      </footer>
    </>
  );
}

export default Footer;
