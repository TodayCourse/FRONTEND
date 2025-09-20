import "./TravelRegister.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GoArrowLeft } from "react-icons/go";
import { GoTrash } from "react-icons/go";

import Button from "../components/Button";
import Header from "../components/Header";

import dayjs from "dayjs";

const TravelRegister = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [region, setRegion] = useState("");
  const [title, setTitle] = useState("");
  const [costType, setCostType] = useState("");
  const [travelStartDt, setTravelStartDt] = useState(null);
  const [travelEndDt, setTravelEndDt] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [season, setSeason] = useState("");
  const [contents, setContents] = useState("");

  {
    /* 코스 등록 */
  }

  const [courseList, setCourseList] = useState([
    {
      courseId: null,
      placeName: "",
      address: "",
      lon: null,
      lat: null,
      openTime: "",
      closeTime: "",
      regUserId: null,
      mdfcUserId: null,
    },
  ]);

  const handlePlaceChange = (index, field, value) => {
    const newPlaces = [...courseList];
    newPlaces[index][field] = value;
    setCourseList(newPlaces);
  };

  const addPlace = () => {
    setCourseList([
      ...courseList,
      {
        courseId: null,
        placeName: "",
        address: "",
        lon: null,
        lat: null,
        openTime: "",
        closeTime: "",
        regUserId: null,
        mdfcUserId: null,
      },
    ]);
  };

  const removePlace = (index) => {
    if (courseList.length > 1) {
      setCourseList(courseList.filter((_, i) => i !== index));
    }
  };

  {
    /* 여행 등록 */
  }
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

    if (
      courseList.some(
        (p) => !p.placeName || !p.address || !p.openTime || !p.closeTime
      )
    ) {
      alert("모든 장소 정보를 입력해주세요!");
      return;
    }

    const travelStartDtFormatted = dayjs(travelStartDt).format("YYYY-MM-DD");
    const travelEndDtFormatted = dayjs(travelEndDt).format("YYYY-MM-DD");

    try {
      // Step 1: 여행 등록
      const travelData = {
        regUserId: null,
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

      const response = await fetch(`${API_BASE_URL}/api/travel/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(travelData),
      });

      if (!response.ok) {
        throw new Error("여행 등록 실패");
      }

      const travelResult = await response.json();
      const travelId = travelResult.travelId; // 새로 생성된 여행 ID

      console.log("Travel 등록 완료:", travelResult);
      console.log("Travel Data:", travelData);

      // Step 2: 코스 등록
      console.log("코스 등록 시도:", courseList);

      await Promise.all(
        courseList.map(async (course) => {
          const bodyData = [
            {
              placeName: course.placeName,
              address: course.address,
              openTime: course.openTime,
              closeTime: course.closeTime,
              // 다른것도 추가해줭
            },
          ];
          console.log("보낼 body:", JSON.stringify(bodyData));

          const res = await fetch(
            `${API_BASE_URL}/api/travel/${travelId}/courses`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(bodyData),
            }
          );

          if (!res.ok) {
            const errText = await res.text();
            console.error("코스 등록 실패:", errText);
          }
        })
      );

      navigate("/travel");
    } catch (e) {
      console.error("에러 발생:", e);
      alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      {/* 모바일 */}
      <div className="TravelRegister-Mobile-header-none">
        <Header />
      </div>

      <div className="TravelRegister-Mobile-header">
        <div
          className="Mobile-header-GoArrowLeft"
          onClick={() => navigate("/travel")}
        >
          <GoArrowLeft size="23" />
        </div>
        <div className="TravelRegister-Mobile-header-h2">
          <h2>글쓰기</h2>
        </div>
      </div>

      <div className="TravelRegister-post">
        {/* 제목 */}
        <div className="TravelRegister-title">
          <label>제목명</label>
          <input
            type="text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* 지역 & 계절 */}
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

        {/* 카테고리 */}
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
            <option value="3">캠핑</option>
            <option value="4">트래킹</option>
            <option value="5">맛집투어</option>
            <option value="6">레저여행</option>
            <option value="7">데이트</option>
            <option value="8">자전거여행</option>
          </select>
        </div>

        {/* 날짜 선택 */}
        <div className="TravelRegister-date-picker">
          <div className="TravelRegister-date-StartDt">
            <label>여행 시작일</label>
            <DatePicker
              selected={travelStartDt}
              onChange={(date) => setTravelStartDt(date)}
              selectsStart
              startDate={travelStartDt}
              endDate={travelEndDt}
              dateFormat="yyyy-MM-dd"
              className="wide-datepicker"
            />
          </div>
          <div className="TravelRegister-date-EndDt">
            <label>여행 종료일</label>
            <DatePicker
              selected={travelEndDt}
              onChange={(date) => setTravelEndDt(date)}
              selectsEnd
              startDate={travelStartDt}
              endDate={travelEndDt}
              minDate={travelStartDt}
              dateFormat="yyyy-MM-dd"
              className="wide-datepicker"
            />
          </div>
        </div>

        {/* 비용 & 교통수단 */}
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
                이동수단을 선택해주세요.
              </option>
              <option value="PUBLIC_TRANSPORT">대중교통</option>
              <option value="CAR">자동차</option>
              <option value="TAXI">택시</option>
              <option value="WALK">도보</option>
              <option value="BICYCLE">자전거</option>
            </select>
          </div>
        </div>

        {/* 내용 */}
        <div className="TravelRegister-textarea-content">
          <div className="TravelRegister-textarea">
            <label>내용</label>
            <textarea
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              placeholder="내용을 입력하세요."
            ></textarea>
          </div>
          <div className="TravelRegister-hashtags-text">
            <p>* 해시태그는 최대 5개까지만 사용 가능합니다</p>
          </div>
        </div>

        {/* 장소 등록 */}
        <div className="travel-course-item">
          <div className="travel-courseList-header">
            <h3 className="text-lg font-semibold">장소 등록</h3>
            <Button
              className="TravelRegister-addPlace"
              onClick={addPlace}
              text={"+ 장소추가"}
              type="primary"
            />
          </div>

          <div className="space-y-6">
            {courseList.map((place, index) => (
              <div key={index} className="TravelRegister-CourseItem">
                <div className="TravelRegister-CourseItem-content">
                  <h4 className="font-medium">장소 {index + 1}</h4>
                  {courseList.length > 1 && (
                    <div
                      className="TravelRegister-CourseItem-content-GoTrash"
                      onClick={() => removePlace(index)}
                    >
                      <GoTrash size="18" />
                    </div>
                  )}
                </div>

                <div className="TravelRegister-Course-selectPlace">
                  <label
                    htmlFor={`place-name-${index}`}
                    className="block text-sm font-medium mb-1"
                  >
                    장소
                  </label>
                  <input
                    id={`place-name-${index}`}
                    value={place.placeName}
                    onChange={(e) =>
                      handlePlaceChange(index, "placeName", e.target.value)
                    }
                    placeholder="장소명을 입력하세요"
                    required
                    className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>

                <div className="TravelRegister-selectGroup3">
                  <div className="TravelRegister-Course-selectHourse">
                    <label
                      htmlFor={`place-hours-${index}`}
                      className="block text-sm font-medium mb-1"
                    >
                      오픈시간
                    </label>
                    <input
                      id={`place-hours-${index}`}
                      value={place.openTime}
                      onChange={(e) =>
                        handlePlaceChange(index, "openTime", e.target.value)
                      }
                      placeholder="영업시간을 입력하세요 (예: 09:00 ~ 18:00)"
                      className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-500"
                    />
                  </div>
                  <div className="TravelRegister-Course-selectHourse">
                    <label
                      htmlFor={`place-hours-${index}`}
                      className="block text-sm font-medium mb-1"
                    >
                      마감시간
                    </label>
                    <input
                      id={`place-hours-${index}`}
                      value={place.closeTime}
                      onChange={(e) =>
                        handlePlaceChange(index, "closeTime", e.target.value)
                      }
                      placeholder="영업시간을 입력하세요 (예: 09:00 ~ 18:00)"
                      className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="TravelRegister-Course-selectAddress">
                  <label
                    htmlFor={`place-address-${index}`}
                    className="block text-sm font-medium mb-1"
                  >
                    주소
                  </label>
                  <input
                    id={`place-address-${index}`}
                    value={place.address}
                    onChange={(e) =>
                      handlePlaceChange(index, "address", e.target.value)
                    }
                    placeholder="주소를 입력하세요"
                    required
                    className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 버튼 */}
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
