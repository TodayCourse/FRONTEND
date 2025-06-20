import "./SiteInfo.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileHeader from "../components/MobileHeader";

const SiteInfo = () => {
  return (
    <div>
      <Header />
      <div className="siteinfo-MobileHeader">
        <MobileHeader />
      </div>
      <div className="siteinfo">
        <div className="siteinfo-text">
          <p>어떤 길이든, 어떤 곳이든,</p>
          <p className="text2">발길이 닿는 곳까지의 함께하는 여정</p>
        </div>
      </div>
      <div className="section">
        <div className="section-title">
          <p className="title">Who</p>
          <h2>
            오늘의 코스,
            <br />
            어떤 곳인가요?
          </h2>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SiteInfo;
