import { useNavigate, useLocation } from "react-router-dom";
import "./TravelList.css";
import React, { useEffect, useState } from "react";
import image from "../assets/images/image.png";

import dayjs from "dayjs";

const TravelList = () => {
  const [travelList, setTravelList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();

  // 목록조회
  const TravelList = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/travel");
      if (!response.ok) {
        throw new Error("데이터를 가져오는 데 실패했습니다.");
      }
      const data = await response.json();
      setTravelList(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    TravelList();
  }, []);

  useEffect(() => {
    if (location.state?.refresh) {
      TravelList(); // 새로고침 요청 시 다시 불러옴
    }
  }, [location.state]);

  const navigate = useNavigate();

  const goToContents = (travelId) => {
    navigate(`/travelinfo/${travelId}`);
  };

  // 지역을 텍스트로 변환하는 함수
  const getRegionText = (region) => {
    switch (region) {
      case "SEOUL":
        return "서울";
      case "BUSAN":
        return "부산";
      case "DAEGU":
        return "대구";
      case "INCHEON":
        return "인천";
      case "GWANGJU":
        return "광주";
      case "DAEJEON":
        return "대전";
      case "ULSAN":
        return "울산";
      case "SEJONG":
        return "세종";
      case "GYEONGGI":
        return "경기";
      case "GANGWON":
        return "강원";
      case "CHUNGBUK":
        return "충북";
      case "CHUNGNAM":
        return "충남";
      case "JEONBUK":
        return "전북";
      case "JEONNAM":
        return "전남";
      case "GYEONGBUK":
        return "경북";
      case "GYEONGNAM":
        return "경남";
      case "JEJU":
        return "제주";
      default:
        return "알 수 없는 지역";
    }
  };

  // 여행 일정 텍스트 반환
  const getTripDurationText = (startDate, endDate) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const diffDays = end.diff(start, "day");

    if (diffDays === 0) {
      return "당일치기";
    } else {
      return `${diffDays}박 ${diffDays + 1}일`;
    }
  };

  // 해시태그 추출: #기호는 제거해서 리턴
  const extractHashtags = (text) => {
    const matches = text.match(/#[^\s#]+/g);
    return matches ? matches.map((tag) => tag.slice(1)) : [];
  };

  // 해시태그 제거한 본문 텍스트
  const removeHashtags = (text) => {
    return text.replace(/#[^\s#]+/g, "").trim();
  };

  return (
    <div className="TravelList">
      <div className="TravelList-main">
        <div className="TravelList-content">
          {loading && <p>로딩 중입니다...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p className="TravelList-length">총 {travelList.length}개</p>
          <ul>
            {travelList && travelList.length > 0 ? (
              travelList.map((course) => (
                <li key={course.travelId} className="TravelList-item">
                  <div
                    className="TravelList-contents"
                    onClick={() => goToContents(course.travelId)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="image">
                      <img src={image} alt="이미지" />
                    </div>
                    <div className="TravelList-contents-text">
                      <p>
                        {getRegionText(course.region)}&nbsp;|&nbsp;
                        {getTripDurationText(
                          course.travelStartDt,
                          course.travelEndDt
                        )}
                      </p>
                      <h3>{course.title}</h3>
                      <p className="TravelList-description">
                        {removeHashtags(course.contents)}
                      </p>
                      <div className="TravelList-hashtags">
                        {extractHashtags(course.contents).map((tag, index) => (
                          <span key={index} className="hashtag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p>여행 정보를 불러오는 중이거나 없습니다.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TravelList;
