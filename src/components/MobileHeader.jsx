import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./MobileHeader.css";

import { FiMenu } from "react-icons/fi";

function MobileHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null); // 메뉴 참조

  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path ? "active" : "";
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
      <div className="MobileHeader-menu">
        <div className="MobileHeader-nav">
          <Link to={"/siteinfo"} className={getLinkClass("/siteinfo")}>
            오늘의코스
          </Link>
          <Link to={"/travel"} className={getLinkClass("/travel")}>
            여행코스
          </Link>
          <Link to={"/randomtravel"} className={getLinkClass("/randomtravel")}>
            랜덤여행
          </Link>
          <Link to={"/info"} className={getLinkClass("/info")}>
            여행정보
          </Link>
        </div>
      </div>
    </>
  );
}

export default MobileHeader;
