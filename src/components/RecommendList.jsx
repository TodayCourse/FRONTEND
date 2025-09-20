import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecommendList.css";
import image from "../assets/images/image.png";
import dayjs from "dayjs";

const RecommendList = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [recommendList, setRecommendList] = useState([]);
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendList = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/travel`);
        const data = await response.json();

        const sorted = data
          .sort((a, b) => b.travelId - a.travelId) // 최신순
          .slice(0, 12); // 최대 12개
        setRecommendList(sorted);
      } catch (error) {
        console.error("추천 코스 불러오기 실패:", error);
      }
    };

    fetchRecommendList();
  }, []);

  const goToContents = (travelId) => {
    navigate(`/travelinfo/${travelId}`);
  };

  const getRegionText = (region) => {
    const map = {
      SEOUL: "서울",
      BUSAN: "부산",
      DAEGU: "대구",
      INCHEON: "인천",
      GWANGJU: "광주",
      DAEJEON: "대전",
      ULSAN: "울산",
      SEJONG: "세종",
      GYEONGGI: "경기",
      GANGWON: "강원",
      CHUNGBUK: "충북",
      CHUNGNAM: "충남",
      JEONBUK: "전북",
      JEONNAM: "전남",
      GYEONGBUK: "경북",
      GYEONGNAM: "경남",
      JEJU: "제주",
    };
    return map[region] || "알 수 없는 지역";
  };

  const getTripDurationText = (startDate, endDate) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const diff = end.diff(start, "day");
    return diff === 0 ? "당일치기" : `${diff}박 ${diff + 1}일`;
  };

  // 현재 페이지에 보여줄 아이템만 slice
  const startIndex = page * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, recommendList.length);
  const visibleItems = recommendList.slice(startIndex, endIndex);

  const nextPage = () => {
    if (endIndex < recommendList.length) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="RecommendList">
      <ul className="RecommendList-items">
        <button
          className="carousel-btn prev"
          onClick={prevPage}
          disabled={page === 0}
        >
          &lsaquo;
        </button>
        {visibleItems.map((course) => (
          <li
            key={course.travelId}
            className="RecommendList-item"
            onClick={() => goToContents(course.travelId)}
          >
            <div className="RecommendList-img-wrapper">
              <img src={image} alt="썸네일" className="RecommendList-img" />
              <div className="RecommendList-overlay">
                <p className="RecommendList-region">
                  {getRegionText(course.region)} |{" "}
                  {getTripDurationText(
                    course.travelStartDt,
                    course.travelEndDt
                  )}
                </p>
                <div className="RecommendList-content">
                  <h4>{course.title}</h4>
                  <p>
                    {course.contents
                      .replace(/#[^\s#]+/g, "")
                      .trim()
                      .slice(0, 40)}
                    ...
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
        <button
          className="carousel-btn next"
          onClick={nextPage}
          disabled={(page + 1) * ITEMS_PER_PAGE >= recommendList.length}
        >
          &rsaquo;
        </button>
      </ul>
    </div>
  );
};

export default RecommendList;
