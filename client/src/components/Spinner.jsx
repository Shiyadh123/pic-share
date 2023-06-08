const Spinner = () => (
  <div
    className="spinner"
    style={{
      position: "relative",
      display: "inline-block",
      width: "13px",
      height: "13px",
      border: "2px solid #ccc",
      borderTopColor: "black",
      borderRadius: "50%",
      animation: "spin 0.7s ease-in-out infinite",
    }}
  >
    <div
      className="spinner-inner"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "5px",
        height: "5px",
        // backgroundColor: "black",'
        borderRadius: "50%",
      }}
    />
    <style>{`
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

export default Spinner;
