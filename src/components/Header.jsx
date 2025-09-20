import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./Header.css";

import logo from "../assets/images/logo.png";
import { FiMenu } from "react-icons/fi";

function Header({ variant = "default" }) {
  const nav = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null); // 메뉴 참조

  const onClickButton = () => {
    nav("/Login");
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <>
      <div
        className={`menu ${variant === "dark" ? "menu-dark" : "menu-default"}`}
      >
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="로고" />
          </Link>
        </div>
        <div className="nav">
          <Link to={"/siteinfo"}>오늘의코스</Link>
          <Link to={"/travel"}>여행코스</Link>
          <Link to={"/randomtravel"}>랜덤여행</Link>
          <Link to={"/info"}>여행정보</Link>
        </div>
        <div className="right-btn">
          <div className="login-btn">
            <button onClick={onClickButton}>로그인/회원가입</button>
          </div>
          <div className="menu-btn" onClick={toggleMenu}>
            <FiMenu size="23" className="header-menu-btn" />
          </div>
        </div>
      </div>
      <div className="HeaderHr"></div>

      {showMenu && (
        <div
          className={`dropdown-menu ${
            variant === "dark" ? "dropdown-dark" : ""
          }`}
          ref={menuRef}
        >
          <ul>
            <div className="header-dropdown-login">
              <button onClick={onClickButton}>로그인/회원가입</button>
            </div>
            <hr />
            <div className="dropdown-title">
              <li>오늘의 코스</li>
            </div>
            <li>
              <Link to="/siteinfo">오늘의 코스</Link>
            </li>
            <li>
              <Link to="/travel">여행코스</Link>
            </li>
            <li>
              <Link to="/randomtravel">랜덤여행</Link>
            </li>
            <li>
              <Link to="/info">여행정보</Link>
            </li>
            {/* <div className="header-hr">
              <hr />
            </div>
            <li>
              <Link to="#">이벤트</Link>
            </li>
            <li>
              <Link to="#">고객센터</Link>
            </li> */}
          </ul>
        </div>
      )}
    </>
  );
}

export default Header;
