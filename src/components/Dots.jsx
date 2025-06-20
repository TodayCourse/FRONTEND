import "./Dots.css";

const Dot = ({ num, currentPage }) => {
  return (
    <div
      style={{
        width: 10,
        height: 10,
        border: "1px solid black",
        borderRadius: 999,
        backgroundColor: currentPage === num ? "black" : "transparent",
        transitionDuration: 1000,
        transition: "background-color 0.5s",
      }}
    ></div>
  );
};

const Dots = ({ currentPage }) => {
  return (
    <div className="home-dots">
      <div className="home-dots-content">
        <Dot num={1} currentPage={currentPage}></Dot>
        <Dot num={2} currentPage={currentPage}></Dot>
        <Dot num={3} currentPage={currentPage}></Dot>
        <Dot num={4} currentPage={currentPage}></Dot>
        <Dot num={5} currentPage={currentPage}></Dot>
      </div>
    </div>
  );
};

export default Dots;
