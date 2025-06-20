import "./Terms.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";

const Terms = () => {
  const navigate = useNavigate();

  // 약관 체크 상태 관리
  const [checked, setChecked] = useState({
    all: false,
    terms1: false, // 필수
    terms2: false, // 필수
    terms3: false, // 선택
    terms4: false, // 선택
  });

  // 약관 상세 내용 상태 관리
  const [openDetails, setOpenDetails] = useState({
    terms1: false,
    terms2: false,
    terms3: false,
    terms4: false,
  });

  // 전체 동의 체크 핸들러
  const handleAllChange = () => {
    const newChecked = !checked.all;
    setChecked({
      all: newChecked,
      terms1: newChecked,
      terms2: newChecked,
      terms3: newChecked,
      terms4: newChecked,
    });
  };

  // 개별 체크 핸들러
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setChecked((prev) => ({
      ...prev,
      [name]: checked,
      all: prev.terms1 && prev.terms2 && prev.terms3 && prev.terms4 && checked,
    }));
  };

  // 약관 내용 토글 핸들러
  const toggleDetails = (name) => {
    setOpenDetails((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // 필수 약관 체크 여부 확인
  const isNextEnabled = checked.terms1 && checked.terms2;

  return (
    <>
      <Header />
      <div className="terms-container">
        <div className="terms">
          <div className="title">
            <h1>약관동의</h1>
          </div>

          <div className="terms-form">
            <label className="allcheck">
              <input
                type="checkbox"
                name="all"
                checked={checked.all}
                onChange={handleAllChange}
              />
              약관 전체 동의
            </label>

            {/* 개별 약관 */}
            {[
              {
                name: "terms1",
                label: "[필수] 이용약관 동의",
                content: "이용약관의 자세한 내용입니다...",
              },
              {
                name: "terms2",
                label: "[필수] 만 14세 이상 확인",
                content: "개인정보 수집 및 이용에 대한 설명입니다...",
              },
              {
                name: "terms3",
                label: "[선택] 개인정보 수집 및 이용 동의",
                content: "마케팅 수신 동의 내용입니다...",
              },
              {
                name: "terms4",
                label: "[선택] 마케팅 알림 수신 동의",
                content: "광고 정보 수신 동의 내용입니다...",
              },
            ].map(({ name, label, content }) => (
              <div key={name} className="terms-item">
                <div className="terms-header">
                  <label className="terms-check">
                    <input
                      type="checkbox"
                      name={name}
                      checked={checked[name]}
                      onChange={handleChange}
                    />
                    {label}
                  </label>
                  <button
                    className="terms-detail-btn"
                    onClick={() => toggleDetails(name)}
                  >
                    {openDetails[name] ? "닫기" : "내용보기"}
                  </button>
                </div>
                {openDetails[name] && (
                  <p className="terms-content">{content}</p>
                )}
              </div>
            ))}
          </div>

          <button
            className="terms-btn"
            onClick={() => navigate("/join")}
            disabled={!isNextEnabled}
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
};

export default Terms;
