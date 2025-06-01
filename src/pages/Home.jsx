import "./Home.css";
import { useEffect, useRef, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Dots from "../components/Dots";

const Home = () => {
  const DIVIDER_HEIGHT = 5;
  const outerDivRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log("현재 1페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log("현재 2페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(3);
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          //현재 2페이지
          console.log("현재 3페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(4);
        } else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
          //현재 2페이지
          console.log("현재 4페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 4 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(5);
        } else {
          // 현재 5페이지
          console.log("현재 5페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 5 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log("현재 1페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log("현재 2페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(1);
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          //현재 3페이지
          console.log("현재 3페이지, up");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(2);
        } else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
          //현재 4페이지
          console.log("현재 4페이지, up");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(3);
        } else {
          // 현재 5페이지
          console.log("현재 5페이지, up");
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(4);
        }
      }
    };
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);
  return (
    <>
      <Header />
      <div ref={outerDivRef} className="outer">
        <Dots currentPage={currentPage} />
        <div className="inner bg-01">
          <p>1</p>
        </div>
        <div className="divider"></div>
        <div className="inner bg-02">
          <p>2</p>
        </div>
        <div className="divider"></div>
        <div className="inner bg-03">
          <p>3</p>
        </div>
        <div className="divider"></div>
        <div className="inner bg-04">
          <p>4</p>
        </div>
        <div className="divider"></div>
        <div className="inner bg-05">
          <p>5</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
