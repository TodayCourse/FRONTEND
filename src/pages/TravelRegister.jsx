import "./TravelRegister.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GoArrowLeft } from "react-icons/go";

import Button from "../components/Button";
import Header from "../components/Header";

import dayjs from "dayjs";

const TravelRegister = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(true); //eslint-disable-line no-unused-vars
  const [region, setRegion] = useState(""); // 지역 상태
  const [title, setTitle] = useState(""); // 제목 상태
  const [costType, setCostType] = useState(""); // 비용 상태
  const [travelStartDt, setTravelStartDt] = useState(null); // 시작 날짜
  const [travelEndDt, setTravelEndDt] = useState(null); // 종료 날짜
  const [categoryId, setCategoryId] = useState(""); // 카테고리
  const [vehicle, setVehicle] = useState(""); // 이동수단
  const [season, setSeason] = useState(""); // 계절
  const [contents, setContents] = useState(""); // 내용
  const [regUserId, setRegUserId] = useState(""); //eslint-disable-line no-unused-vars
  const [travelId, setTravelId] = useState(""); //eslint-disable-line no-unused-vars

  const handleSave = async () => {
    if (
      !title ||
      !contents ||
      !travelStartDt ||
      !travelEndDt ||
      !region ||
      !season ||
      !categoryId ||
      !costType ||
      !vehicle
    ) {
      alert("모든 선택 항목을 입력해주세요!");
      return;
    }

    const travelStartDtFormatted = dayjs(travelStartDt).format("YYYY-MM-DD");
    const travelEndDtFormatted = dayjs(travelEndDt).format("YYYY-MM-DD");

    const newPost = {
      regUserId: null,
      travelId,
      title,
      contents,
      region,
      season,
      categoryId,
      costType,
      vehicle,
      travelStartDt: travelStartDtFormatted,
      travelEndDt: travelEndDtFormatted,
    };

    try {
      const response = await fetch("http://localhost:8080/api/travel/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      navigate("/travel");
    } catch {
      console.error("에러 발생:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const MobileGoArrowLeft = () => {
    navigate("/travel");
  };

  return (
    <>
      <div className="TravelRegister-Mobile-header-none">
        <Header />
      </div>

      <div className="TravelRegister-Mobile-header">
        <div className="Mobile-header-GoArrowLeft" onClick={MobileGoArrowLeft}>
          <GoArrowLeft size="23" />
        </div>
        <div className="TravelRegister-Mobile-header-h2">
          <h2>글쓰기</h2>
        </div>
      </div>
      <div className="TravelRegister-post">
        <div className="TravelRegister-title">
          <label>제목명</label>
          <input
            type="text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="TravelRegister-selectGroup1">
          <div className="TravelRegister-selectRegion">
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
          <div className="TravelRegister-selectSeason">
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

        <div className="TravelRegister-selectCategory">
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
            <option value="캠핑">캠핑</option>
            <option value="트래킹">트래킹</option>
            <option value="맛집투어">맛집투어</option>
            <option value="레저여행">레저여행</option>
            <option value="데이트">데이트</option>
            <option value="자전거여행">자전거여행</option>
          </select>
        </div>

        <div className="TravelRegister-date-picker">
          <div className="TravelRegister-date-StartDt">
            <label>여행 시작일</label>
            <DatePicker
              selected={travelStartDt}
              onChange={(date) => setTravelStartDt(date)}
              selectsStart
              travelStartDtDate={travelStartDt}
              travelEndDtDate={travelEndDt}
              dateFormat="yyyy-MM-dd"
              ClassName="wide-datepicker"
            />
          </div>
          <div className="TravelRegister-date-EndDt">
            <label>여행 종료일</label>
            <DatePicker
              selected={travelEndDt}
              onChange={(date) => setTravelEndDt(date)}
              selectsEnd
              travelStartDt={travelStartDt}
              travelEndDtDate={travelEndDt}
              minDate={travelStartDt}
              dateFormat="yyyy-MM-dd"
              ClassName="wide-datepicker"
            />
          </div>
        </div>

        <div className="TravelRegister-selectGroup2">
          <div className="TravelRegister-selectCostType">
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
          <div className="TravelRegister-selectVehicle">
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

        <div className="TravelRegister-textarea">
          <label>내용</label>
          <textarea
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            placeholder="내용을 입력하세요."
          ></textarea>
        </div>

        <div className="TravelRegister_btn">
          <Button
            className="TravelRegister-handleCancel"
            onClick={handleCancel}
            text={"취소"}
            type="secondary"
          />
          <Button
            className="TravelRegister-handleSave"
            onClick={handleSave}
            text={"저장"}
            type="primary"
          />
        </div>
      </div>
    </>
  );
};

export default TravelRegister;
