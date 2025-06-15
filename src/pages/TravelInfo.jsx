import "./TravelInfo.css";

import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";

import dayjs from "dayjs";

// 지역
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

// 비용
const getCostTypeText = (costType) => {
  switch (costType) {
    case "UNDER_100K":
      return "10만원 이하";
    case "BETWEEN_100K_200K":
      return "10만원 ~ 20만원";
    case "BETWEEN_200K_300K":
      return "20만원 ~ 30만원";
    case "BETWEEN_300K_400K":
      return "30만원 ~ 40만원";
    case "BETWEEN_400K_500K":
      return "40만원 ~ 50만원";
    case "OVER_500K":
      return "50만원 이상";
    default:
      return "알 수 없음"; // 기본값을 알 수 없음으로 설정
  }
};

// 카테고리
const getCategoryIdText = (categoryId) => {
  const categoryIdMap = {
    1: "가족여행",
    2: "드라이브",
    camp: "캠핑",
    tracking: "트래킹",
    eat: "맛집투어",
    leisure: "레저여행",
    couple: "데이트",
    bike: "자전거여행",
  };

  return categoryIdMap[categoryId] || "알 수 없음"; // 해당 카테고리가 없으면 "알 수 없음" 반환
};

const getVehicleText = (vehicle) => {
  switch (vehicle) {
    case "PUBLIC_TRANSPORT":
      return "대중교통";
    case "CAR":
      return "자동차";
    case "TAXI":
      return "택시";
    case "WALK":
      return "도보";
    case "BICYCLE":
      return "자전거";
    default:
      return "알 수 없음"; // 기본값을 알 수 없음으로 설정
  }
};

const getSeasonText = (season) => {
  switch (season) {
    case "SPRING":
      return "봄";
    case "SUMMER":
      return "여름";
    case "AUTUMN":
      return "가을";
    case "WINTER":
      return "겨울";
    default:
      return "알 수 없음"; // 기본값을 알 수 없음으로 설정
  }
};

const TravelInfo = () => {
  const { travelId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/travel/${travelId}`
        );
        if (!response.ok) {
          throw new Error("게시글을 찾을 수 없습니다.");
        }
        const data = await response.json();
        setPost(data); // 데이터 저장
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost(); // 게시글 가져오기 실행
  }, [travelId]);

  if (loading) {
    return <h2>로딩 중...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!post) {
    return <h2>게시글을 찾을 수 없습니다.</h2>;
  }

  // 삭제 버튼 클릭 시
  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/travel/${travelId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) throw new Error("삭제에 실패했습니다.");

        alert("삭제되었습니다.");
        navigate("/Travel"); // 삭제 후 목록으로 이동
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // 수정 버튼 클릭 시
  const handleUpdate = () => {
    navigate(`/travelupdate/${travelId}`); // 수정 페이지로 이동
  };

  const MobileGoArrowLeft = () => {
    navigate("/Travel");
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
    <>
      <div className="TravelInfo-Mobile-header-none">
        <Header />
      </div>

      <div className="TravelInfo-Mobile-header">
        <div
          className="TravelInfo-Mobile-header-GoArrowLeft"
          onClick={MobileGoArrowLeft}
        >
          <GoArrowLeft size="23" />
        </div>
        <div className="TravelInfo-Mobile-header-h2">
          <h2>여행코스</h2>
        </div>
      </div>

      <div className="TravelInfo">
        <div className="TravelInfo-content">
          {/* 지역과 기간을 텍스트로 변환하여 표시 */}
          <p>
            {getRegionText(post.region)}&nbsp;|&nbsp;
            {getTripDurationText(post.travelStartDt, post.travelEndDt)}
          </p>

          <h2>{post.title}</h2>
          <div className="shareBtn">
            <p onClick={handleUpdate} style={{ cursor: "pointer" }}>
              수정
            </p>
            <p onClick={handleDelete} style={{ cursor: "pointer" }}>
              삭제
            </p>
          </div>

          <div className="TravelInfo-content-des">
            <p className="TravelInfo-des" style={{ justifyContent: "center" }}>
              {removeHashtags(post.contents)}
            </p>

            <div className="TravelInfo-hashtags">
              {extractHashtags(post.contents).map((tag, index) => (
                <span key={index} className="hashtag">
                  {tag}
                </span>
              ))}
            </div>

            <p className="TravelInfo-des">
              여행기간
              <span>
                {dayjs(post.travelStartDt).format("YYYY-MM-DD")} ~{" "}
                {dayjs(post.travelEndDt).format("YYYY-MM-DD")}
              </span>
            </p>
            <p className="TravelInfo-des">
              지역<span>{getRegionText(post.region)}</span>
            </p>
            <p className="TravelInfo-des">
              계절 <span>{getSeasonText(post.season)}</span>
            </p>
            <p className="TravelInfo-des">
              카테고리 <span>{getCategoryIdText(post.categoryId)}</span>
            </p>
            <p className="TravelInfo-des">
              경비<span>{getCostTypeText(post.costType)}</span>
            </p>
            <p className="TravelInfo-des">
              이동수단 <span>{getVehicleText(post.vehicle)}</span>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TravelInfo;
