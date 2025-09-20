import "./SiteInfo.css";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Button from "../components/Button";
import Footer from "../components/Footer";

import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import icon04 from "../assets/images/icon04.png";
import nextb from "../assets/images/nextb.png";
import image from "../assets/images/image.png";

const SiteInfo = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="Siteinfo-header">
        <div className="Siteinfo-header__bg">
          <p>어떤 길이든, 어떤 곳이든,</p>
          <p className="Siteinfo-header__title">
            발길이 닿는 곳까지의 함께하는 여정
          </p>
          <p className="Siteinfo-header__desc">
            여행의 시작을, 오늘의 코스와 함께하세요.
          </p>
        </div>
        <div className="Siteinfo-header__btn">
          <button
            className="Siteinfo-header__btn-course"
            onClick={() => navigate("/travel")}
          >
            여행코스 보러가기
          </button>
          <button
            className="Siteinfo-header__btn-info"
            onClick={() => navigate("/info")}
          >
            여행정보 보러가기
          </button>
        </div>
      </div>

      <div className="Service">
        <div className="Service-text">
          <div className="Service-text-left">
            <p className="Service-text-left__label">오늘의코스</p>
            <div className="Service-text-left__hr"></div>
          </div>
          <h2>
            오늘의 코스,
            <br />
            어떤 곳인가요?
          </h2>
          <p>
            오늘의 코스는 여행의 순간을 기록하고, 공유하고,
            <br />
            추천받을 수 있는 여행 코스 플랫폼입니다.
          </p>
        </div>
        <div className="Service-card">
          <div className="Service-list-card">
            <p className="Service-list-card__ma">
              <img src={icon01} alt="icon01" />
              코스 등록·수정·삭제
              <br />
              <br />
              <span>다녀온 여행 코스를 기록하고 관리할 수 있습니다.</span>
            </p>
            <p>
              <img src={icon02} alt="icon02" />
              코스 조회
              <br />
              <br />
              <span>
                다른 사람들이 만든 여행 코스를 검색하고 참고할 수 있습니다.
              </span>
            </p>
          </div>
          <div className="Service-list-card">
            <p>
              <img src={icon03} alt="icon03" />
              랜덤 여행 추천
              <br />
              <br />
              <span>
                어디 갈지 고민될 땐 버튼 하나로 여행지를 추천받을수 있습니다.
              </span>
            </p>
            <p className="Service-list-card__ma__bo">
              <img src={icon04} alt="icon04" />
              추억 저장
              <br />
              <br />
              <span>
                사진과 함께 코스를 남겨 특별한 여행 앨범을 만들 수 있습니다.
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="Suggest">
        <div className="Suggest_bg">
          <div>
            <div className="Suggest-title">
              <div className="Suggest-title-text">
                <div className="Suggest-title-left">
                  <p className="Suggest-title-left__label">오늘의코스</p>
                  <div className="Suggest-title-left__hr"></div>
                </div>
                <img src={nextb} />
              </div>
              <h2>
                오늘의 코스,
                <br />
                이런 분들에게 추천합니다
              </h2>
              <p>
                계획은 간단하게, 추억은 오래도록
                <br />
                남기고 싶은 분들에게 딱 맞는 플랫폼입니다.
              </p>
            </div>
            <div className="Suggest-contents">
              <div className="Suggest-contents-list">
                <p>여행은 가고 싶은데 어디 갈지 고민되시는 분</p>
                <p>친구·연인과 여행 코스를 공유하고 싶으신 분</p>
                <p>특별한 여행 코스가 필요하신 분</p>
              </div>
            </div>
          </div>
          <div className="Suggest-image">
            <img src={image} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SiteInfo;
