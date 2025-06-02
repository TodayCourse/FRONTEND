import "./Login.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import google from "../assets/images/google.png";
import naver from "../assets/images/naver.png";
import kakao from "../assets/images/kakao.png";

import Header from "../components/Header";
import Footer from "../components/Footer";

const User = {
  email: "123@naver.com",
  pw: "a1234567a",
};
const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const [emailValid, setemailValid] = useState("");
  const [pwValid, setPwValid] = useState("");
  const [notAllow, setNotAllow] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (regex.test(email)) {
      setemailValid(true);
    } else {
      setemailValid(false);
    }
  };

  const handlePw = (e) => {
    setPw(e.target.value);
    const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    if (regex.test(pw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const onClickConfirmButton = () => {
    if (email === User.email && pw === User.pw) {
      alert("로그인에 성공했습니다.");
    } else {
      alert("등록되지 않은 회원이거나 입력한 값이 일치하지 않습니다.");
    }
  };

  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid]);

  return (
    <>
      <Header />

      <div className="login">
        <div className="login-logo">
          <Link to={"/"}>
            <img src={logo} alt="로고" />
          </Link>
        </div>
        <div className="loginWrap">
          <div className="inputuser"></div>
          <div className="inputWrap">
            <input
              type="text"
              className="input"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="errorMessage">
            {!emailValid && email.length > 0 && (
              <div>올바른 이메일을 입력해주세요.</div>
            )}
          </div>

          <div className="inputuser"></div>
          <div className="inputWrap">
            <input
              type="password"
              className="input"
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              value={pw}
              onChange={handlePw}
            />
          </div>
          <div className="errorMessage">
            {!pwValid && pw.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
            )}
          </div>
        </div>

        <div className="loginCheck">
          <div>
            <input type="checkbox" className="checkbox" />
            &nbsp;아이디 저장
          </div>
          <div>아이디/비밀번호 찾기</div>
        </div>

        <div className="buttonWrap">
          <button
            onClick={onClickConfirmButton}
            disabled={notAllow}
            className="bottomButton"
          >
            로그인
          </button>
        </div>

        <div className="registerWrap">
          <div className="registerTitle">또는</div>
          <div className="registerImage">
            <Link to={"/"}>
              <img src={kakao} alt="카카오톡" />
            </Link>
            <Link to={"/"}>
              <img src={naver} alt="네이버" />
            </Link>
            <Link to={"/"}>
              <img src={google} alt="구글" />
            </Link>
          </div>
          <div className="registerTitle">
            아직 회원이 아니신가요?{" "}
            <Link to={"/terms"}>
              <u>회원가입</u>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
