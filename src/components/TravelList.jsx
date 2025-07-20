import { useNavigate, useLocation } from "react-router-dom";
import "./TravelList.css";
import React, { useEffect, useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import image from "../assets/images/image.png";

import dayjs from "dayjs";

const TravelList = () => {
  const [travelList, setTravelList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sortOrder, setSortOrder] = useState("latest"); //eslint-disable-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedList = travelList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(travelList.length / itemsPerPage);

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`page-btn ${i === currentPage ? "active" : ""}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const location = useLocation();
  const sortTravelList = (data, order) => {
    if (order === "latest") {
      return data.sort((a, b) => b.travelId - a.travelId); // 최신순
    } else {
      return data.sort((a, b) => a.travelId - b.travelId); // 등록순
    }
  };

  // 목록조회
  const TravelList = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/travel");
      if (!response.ok) {
        throw new Error("데이터를 가져오는 데 실패했습니다.");
      }
      const data = await response.json();

      const sortedData = sortTravelList(data, sortOrder);

      setTravelList(sortedData);
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
    // 정렬 기준 변경 시 목록 다시 정렬
    setTravelList((prevList) => sortTravelList([...prevList], sortOrder));
  }, [sortOrder]);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 499);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="TravelList">
      <div className="TravelList-main">
        <div className="TravelList-content">
          {loading && <p>로딩 중입니다...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p className="TravelList-length">총 {travelList.length}개</p>
          <ul>
            {paginatedList.length > 0 ? (
              paginatedList.map((course) => (
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
                      <p className="TravelList-contents-text-title">
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
                        {extractHashtags(course.contents)
                          .slice(0, isMobile ? 4 : 5)
                          .map((tag, index) => (
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

          {/* 페이지네이션 추가 */}
          <div className="pagination">
            <button
              className="page-btn"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <GoChevronLeft size={23} />
            </button>

            {renderPageNumbers()}

            <button
              className="page-btn"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <GoChevronRight size={23} />
            </button>
          </div>
        </div>
      </div>

      <div className="TravelList-sort">
        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setCurrentPage(1); // 정렬 변경 시 1페이지로 초기화
          }}
          className="TravelList-sort-select"
        >
          <option value="latest">최신순</option>
          <option value="oldest">등록순</option>
        </select>
      </div>
    </div>
  );
};

export default TravelList;
