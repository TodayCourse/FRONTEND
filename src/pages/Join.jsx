import "./Join.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { useNavigate } from "react-router-dom";

const Join = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="Join">
        <div className="Join-form">
          <div className="Join-title">
            <h1>정보입력</h1>
          </div>
          <div className="selectGroup">
            <div className="selectName">
              <label>이름</label>
              <input type="text" placeholder="이름"></input>
            </div>
            <div className="selectNickname">
              <label>닉네임</label>
              <div className="nickname-input">
                <input type="text" placeholder="닉네임"></input>
                <button className="join-check-btn">중복확인</button>
              </div>
            </div>
            <div className="selectTel">
              <label>휴대전화</label>
              <input
                type="number"
                placeholder="휴대폰 번호 입력('-'제외 11자 입력)"
              ></input>
            </div>
            <div className="selectEmail">
              <label>이메일</label>
              <div className="email-input">
                <input type="email" placeholder="이메일 주소"></input>
                <button className="join-check-btn">중복확인</button>
              </div>
            </div>
            <div className="selectCheckNumber">
              <label>인증번호 입력</label>
              <input
                type="number"
                placeholder="인증번호 6자리를 입력해주세요."
              ></input>
            </div>
            <div className="selectPassword">
              <label>비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)"
              ></input>
            </div>
            <div className="selectCheckNumber">
              <label>비밀번호 재확인</label>
              <input type="password" placeholder="비밀번호 재입력"></input>
            </div>
          </div>
        </div>

        <button className="join-btn" onClick={() => navigate("/")}>
          다음
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Join;
