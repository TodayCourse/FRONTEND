import { useNavigate, useLocation } from "react-router-dom";
import "./TravelList.css";
import React, { useEffect, useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import image from "../assets/images/image.png";
import dayjs from "dayjs";

const TravelList = ({
  searchTerm = "",
  limit = null,
  sortOrder: externalSortOrder,
}) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [travelList, setTravelList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sortOrder, setSortOrder] = useState(externalSortOrder || "latest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();
  const location = useLocation();

  const sortTravelList = (data, order) => {
    if (order === "latest") {
      return data.sort((a, b) => b.travelId - a.travelId);
    } else {
      return data.sort((a, b) => a.travelId - b.travelId);
    }
  };

  const fetchTravelList = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/travel`);
      if (!response.ok) throw new Error("데이터를 가져오는 데 실패했습니다.");
      const data = await response.json();

      let list = [...data];

      // 검색 필터링
      list = list.filter((item) => {
        const keyword = searchTerm.toLowerCase();
        return (
          item.title.toLowerCase().includes(keyword) ||
          item.contents.toLowerCase().includes(keyword) ||
          getRegionText(item.region).toLowerCase().includes(keyword)
        );
      });

      // 정렬
      list = sortTravelList(list, sortOrder);

      // 개수 제한
      if (limit) {
        list = list.slice(0, limit);
      }

      setTravelList(list);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 최초 또는 props 변경 시 목록 불러오기
  useEffect(() => {
    fetchTravelList();
  }, [searchTerm, limit, sortOrder]);

  // 외부에서 새로고침 요청 시
  useEffect(() => {
    if (location.state?.refresh) {
      fetchTravelList();
    }
  }, [location.state]);

  // 윈도우 크기에 따라 해시태그 개수 조정
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const paginatedList = limit
    ? travelList // limit 모드일 땐 페이지 나누기 안 함
    : travelList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

  const totalPages = Math.ceil(travelList.length / itemsPerPage);

  const renderPageNumbers = () => {
    if (limit) return null;
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

  const extractHashtags = (text) => {
    const matches = text.match(/#[^\s#]+/g);
    return matches ? matches.map((tag) => tag.slice(1)) : [];
  };

  const removeHashtags = (text) => {
    return text.replace(/#[^\s#]+/g, "").trim();
  };

  return (
    <div className="TravelList">
      <div className="TravelList-main">
        <div className="TravelList-content">
          {loading && <p>로딩 중입니다...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!limit && (
            <p className="TravelList-length">총 {travelList.length}개</p>
          )}

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
                        {getRegionText(course.region)} |{" "}
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
                          .map((tag, i) => (
                            <span key={i} className="hashtag">
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

          {!limit && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                <GoChevronLeft size={23} />
              </button>

              {renderPageNumbers()}

              <button
                className="page-btn"
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <GoChevronRight size={23} />
              </button>
            </div>
          )}
        </div>
      </div>

      {!limit && (
        <div className="TravelList-sort">
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setCurrentPage(1);
            }}
            className="TravelList-sort-select"
          >
            <option value="latest">최신순</option>
            <option value="oldest">등록순</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default TravelList;
