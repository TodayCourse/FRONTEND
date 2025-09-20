import "./Travel.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TravelList from "../components/TravelList";
import Footer from "../components/Footer";
import Button from "../components/Button";

import add from "../assets/images/add.png";
const Travel = ({ courses }) => {
  const navigate = useNavigate();

  // 새 여행 코스를 추가하는 페이지로 이동
  const goToNewPage = () => {
    navigate(`/travelregister`);
  };

  return (
    <>
      <Header />
      <div className="Travel">
        <div className="Add">
          {/* 새 여행 코스 추가 버튼 */}
          {/* <Button
            className="travel-list-button"
            onClick={goToNewPage}
            text={"+ 새 여행 코스 추가"}
          /> */}
          <img src={add} className="Add__img" onClick={goToNewPage} />
        </div>
        <TravelList courses={courses} />
      </div>

      <Footer />
    </>
  );
};

export default Travel;
