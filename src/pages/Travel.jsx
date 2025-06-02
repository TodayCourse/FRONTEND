import "./Travel.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TravelList from "../components/TravelList";
import Footer from "../components/Footer";
import Button from "../components/Button";

const Travel = ({ courses, addPost }) => {
  const navigate = useNavigate();

  // 새 여행 코스를 추가하는 페이지로 이동
  const goToNewPage = () => {
    navigate(`/travelregister`);
  };

  return (
    <>
      <Header />

      <div className="Travel">
        <div className="course-list-btn">
          {/* 새 여행 코스 추가 버튼 */}
          <Button
            className="Button_1"
            onClick={goToNewPage}
            text={"+ 새 여행 코스 추가"}
          />
        </div>
        <TravelList courses={courses} />
      </div>

      <Footer />
    </>
  );
};

export default Travel;
