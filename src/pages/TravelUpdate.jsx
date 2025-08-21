import "./TravelUpdate.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../components/Button";
import Header from "../components/Header";
import { GoArrowLeft } from "react-icons/go";

import dayjs from "dayjs";

// 문자열/숫자/Date 모두 안전하게 Date 객체로 변환
const toDate = (value) => {
  if (!value) return null; // null, undefined
  if (value instanceof Date) return value; // 이미 Date
  if (typeof value === "number") return new Date(value); // timestamp
  if (typeof value === "string") {
    // yyyy-MM-dd 형식
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m, d] = value.split("-").map(Number);
      return new Date(y, m - 1, d);
    }
    // yyyyMMdd 형식
    if (/^\d{8}$/.test(value)) {
      const y = Number(value.slice(0, 4));
      const m = Number(value.slice(4, 6));
      const d = Number(value.slice(6, 8));
      return new Date(y, m - 1, d);
    }
    // ISO 문자열 등 나머지
    const parsed = Date.parse(value);
    return isNaN(parsed) ? null : new Date(parsed);
  }
  return null; // 그 외 타입
};

const TravelUpdate = ({ onSave }) => {
  const { travelId } = useParams(); // travelId를 URL에서 받아옵니다.
  const navigate = useNavigate();

  const [post, setPost] = useState(null); //eslint-disable-line no-unused-vars
  const [loading, setLoading] = useState(true); //eslint-disable-line no-unused-vars

  // 상태 초기값 설정
  const [region, setRegion] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [costType, setCostType] = useState("");
  const [travelStartDt, setTravelStartDt] = useState(null);
  const [travelEndDt, setTravelEndDt] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [season, setSeason] = useState("");
  const [regUserId, setRegUserId] = useState(""); //eslint-disable-line no-unused-vars
  const [vehicle, setVehicle] = useState("");

  const [placeName, setPlaceName] = useState("");
  const [address, setAddress] = useState("");
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [currentCourse, setCurrentCourse] = useState({
    place: "",
    address: "",
    opentime: "",
  });

  const handleAddClick = () => {
    setIsEditing(true);
    setCurrentCourse({ place: "", address: "", opentime: "" });
  };

  const handleSaveClick = () => {
    const editList = [...courseList, currentCourse];
    setCourseList(editList);
    setIsEditing(false);
    onSave(editList); // 상위 컴포넌트로 전달
  };

  const handleDelete = (index) => {
    const editList = courseList.filter((_, i) => i !== index);
    setCourseList(editList);
    onSave(editList);
  };

  const handleEdit = (index) => {
    setCurrentCourse(courseList[index]);
    setIsEditing(true);
    handleDelete(index); // 수정은 삭제 후 다시 추가하는 방식
  };

  // 게시글이 변경될 때 상태 업데이트
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
        setPost(data);

        // 게시글 데이터로 초기값 설정
        setRegion(data.region);
        setTitle(data.title);
        setContents(data.contents);
        setCostType(data.costType);
        setTravelStartDt(toDate(data.travelStartDt));
        setTravelEndDt(toDate(data.travelEndDt));
        setCategoryId(data.categoryId);
        setVehicle(data.vehicle);
        setSeason(data.season);
      } catch (error) {
        alert(error.message);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/travel/${travelId}/courses`
        );
        if (!response.ok) {
          throw new Error("코스 정보를 불러올 수 없습니다.");
        }
        const data = await response.json();
        setCourseList(data);

        setPlaceName(data.placeName);
        setAddress(data.address);
        setLon(data.lon);
        setLat(data.lat);
        setOpenTime(data.openTime);
        setCloseTime(data.closeTime);
      } catch (error) {
        console.error("코스 불러오기 실패:", error);
      }
    };

    fetchPost();
    fetchCourses();
  }, [travelId]); // travelId가 변경될 때마다 호출

  // 저장 버튼 클릭 시 실행되는 함수
  const handleSave = async () => {
    if (
      !title ||
      !contents ||
      !region ||
      !season ||
      !categoryId ||
      !costType ||
      !vehicle ||
      !travelStartDt ||
      !travelEndDt ||
      !placeName ||
      !address ||
      !lon ||
      !lat ||
      !openTime ||
      !closeTime
    ) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    const travelStartDtFormatted = dayjs(travelStartDt).format("YYYY-MM-DD");
    const travelEndDtFormatted = dayjs(travelEndDt).format("YYYY-MM-DD");

    const updatedPost = {
      travelId,
      title,
      region,
      season,
      categoryId,
      travelStartDt: travelStartDtFormatted,
      travelEndDt: travelEndDtFormatted,
      costType,
      vehicle,
      contents,
    };

    const CourseUpdatedPost = {
      placeName,
      address,
      lon,
      lat,
      openTime,
      closeTime,
      regUserId,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/travel/${travelId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPost),
        }
      );

      if (!response.ok) {
        throw new Error("네트워크 응답에 문제가 있습니다");
      }

      navigate(`/travelinfo/${travelId}`);
      alert("수정되었습니다!");
    } catch (error) {
      error("수정 오류:", error);
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/travel/${travelId}/courses`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(CourseUpdatedPost),
        }
      );

      if (!response.ok) {
        throw new Error("네트워크 응답에 문제가 있습니다");
      }

      navigate(`/travelinfo/${travelId}`);
      alert("수정되었습니다!");
    } catch (error) {
      error("수정 오류:", error);
    }
  };

  const MobileGoArrowLeft = () => {
    navigate(`/travelinfo/${travelId}`);
  };

  return (
    <>
      <div className="TravelUpdate-Mobile-header-none">
        <Header />
      </div>

      <div className="TravelUpdate-Mobile-header">
        <div
          className="TravelUpdate-Mobile-header-GoArrowLeft"
          onClick={MobileGoArrowLeft}
        >
          <GoArrowLeft size="23" />
        </div>
        <div className="TravelUpdate-Mobile-header-h2">
          <h2>수정하기</h2>
        </div>
      </div>

      <div className="TravelUpdate-post">
        <div className="title">
          <label>제목명</label>{" "}
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="TravelUpdate-selectGroup1">
          <div className="TravelUpdate-selectRegion">
            <label>지역</label>
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="" disabled>
                지역을 선택해주세요.
              </option>
              <option value="SEOUL">서울</option>
              <option value="BUSAN">부산</option>
              <option value="DAEGU">대구</option>
              <option value="INCHEON">인천</option>
              <option value="GWANGJU">광주</option>
              <option value="DAEJEON">대전</option>
              <option value="ULSAN">울산</option>
              <option value="SEJONG">세종</option>
              <option value="GYEONGGI">경기</option>
              <option value="GANGWON">강원</option>
              <option value="CHUNGBUK">충북</option>
              <option value="CHUNGNAM">충남</option>
              <option value="JEONBUK">전북</option>
              <option value="JEONNAM">전남</option>
              <option value="GYEONGBUK">경북</option>
              <option value="GYEONGNAM">경남</option>
              <option value="JEJU">제주</option>
            </select>
          </div>

          <div className="TravelUpdate-selectSeason">
            <label>계절</label>
            <select value={season} onChange={(e) => setSeason(e.target.value)}>
              <option value="" disabled>
                계절을 선택해주세요.
              </option>
              <option value="SPRING">봄</option>
              <option value="SUMMER">여름</option>
              <option value="AUTUMN">가을</option>
              <option value="WINTER">겨울</option>
            </select>
          </div>
        </div>

        <div className="TravelUpdate-selectCategory">
          <label>카테고리</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="" disabled>
              카테고리를 선택해주세요.
            </option>
            <option value="1">가족여행</option>
            <option value="2">드라이브</option>
            <option value="camp">캠핑</option>
            <option value="tracking">트래킹</option>
            <option value="eat">맛집투어</option>
            <option value="leisure">레저여행</option>
            <option value="couple">데이트</option>
            <option value="bike">자전거여행</option>
          </select>
        </div>

        <div className="TravelUpdate-date-picker">
          <div className="TravelUpdate-date-StartDt">
            <label>여행 시작일</label>
            <DatePicker
              selected={travelStartDt}
              onChange={(date) => setTravelStartDt(date)}
              selectsStart
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div className="TravelUpdate-date-EndDt">
            <label>여행 종료일</label>
            <DatePicker
              selected={travelEndDt}
              onChange={(date) => setTravelEndDt(date)}
              selectsEnd
              minDate={travelStartDt}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>

        <div className="TravelUpdate-selectGroup2">
          <div className="TravelUpdate-selectCostType">
            <label>경비</label>
            <select
              value={costType}
              onChange={(e) => setCostType(e.target.value)}
            >
              <option value="" disabled>
                비용을 선택해주세요.
              </option>
              <option value="UNDER_100K">10만원 이하</option>
              <option value="BETWEEN_100K_200K">10만원 ~ 20만원</option>
              <option value="BETWEEN_200K_300K">20만원 ~ 30만원</option>
              <option value="BETWEEN_300K_400K">30만원 ~ 40만원</option>
              <option value="BETWEEN_400K_500K">40만원 ~ 50만원</option>
              <option value="OVER_500K">50만원 이상</option>
            </select>
          </div>

          <div className="TravelUpdate-selectVehicle">
            <label>이동수단</label>
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
            >
              <option value="" disabled>
                비용을 선택해주세요.
              </option>
              <option value="PUBLIC_TRANSPORT">대중교통</option>
              <option value="CAR">자동차</option>
              <option value="TAXI">택시</option>
              <option value="WALK">도보</option>
              <option value="BICYCLE">자전거</option>
            </select>
          </div>
        </div>

        <div className="TravelUpdate-textarea-content">
          <div className="TravelUpdate-textarea">
            <label>내용</label>
            <textarea
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              placeholder="내용을 입력하세요."
            ></textarea>
          </div>{" "}
          <div className="TravelUpdate-hashtags-text">
            <p>* 해시태그는 최대 5개까지만 사용 가능합니다</p>
          </div>
        </div>

        {/*코스등록*/}
        <div className="TravelRegister-Course">
          <div className="TravelRegister-CourseAdd">
            {!isEditing && (
              <button onClick={handleAddClick}>+ 코스 등록하기</button>
            )}
          </div>

          {isEditing && (
            <div className="CourseForm">
              <div className="TravelRegister-courseButtons">
                <p>코스 등록</p>
                <div className="TravelRegister-courseButtons-btn">
                  <Button
                    text={"초기화"}
                    type="secondary"
                    onClick={() => setIsEditing(false)}
                  />
                  <Button
                    onClick={handleSaveClick}
                    text={"입력완료"}
                    type="primary"
                  />
                </div>
              </div>
              <div className="CourseForm-place">
                <label>장소명</label>
                <input
                  type="text"
                  placeholder="장소명"
                  value={placeName}
                  onChange={(e) => setContents(e.target.placeName)}
                />
              </div>
              <div className="CourseForm-address">
                <label>주소</label>
                <input
                  type="text"
                  placeholder="주소"
                  value={address}
                  onChange={(e) => setContents(e.target.address)}
                />
              </div>
              <div className="CourseForm-time">
                <label>영업시간</label>
                <input
                  type="text"
                  placeholder="영업시간"
                  value={openTime}
                  onChange={(e) => setContents(e.target.openTime)}
                />
              </div>
            </div>
          )}

          <ul className="CourseForm-Content">
            {courseList.map((course, index) => (
              <li key={index}>
                <p className="course-number">
                  코스 {String(index + 1).padStart(2, "0")}
                </p>
                <div className="CourseForm-Content-btn">
                  <button onClick={() => handleDelete(index)}>삭제</button>
                  <button
                    className="CourseForm-EditBtn"
                    onClick={() => handleEdit(index)}
                  >
                    수정
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 버튼 */}
        <div className="TravelUpdate_btn">
          <Button
            className="TravelUpdate-End"
            onClick={() => navigate(`/travelinfo/${travelId}`)}
            text={"취소"}
            type="secondary"
          />
          <Button
            className="TravelUpdate-handleSave"
            onClick={handleSave}
            text={"저장"}
            type="primary"
          />
        </div>
      </div>
    </>
  );
};

export default TravelUpdate;
