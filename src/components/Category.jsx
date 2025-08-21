import "./Category.css";

import family from "../assets/images/family.png";
import drive from "../assets/images/drive.png";
import camping from "../assets/images/camping.png";
import tracking from "../assets/images/tracking.png";
import restaurant from "../assets/images/restaurant.png";
import leisure from "../assets/images/leisure.png";
import date from "../assets/images/date.png";
import cycling from "../assets/images/cycling.png";

function Category() {
  return (
    <div>
      <div className="Category">
        <div className="Category-contents">
          <img src={family} />
          <p>가족여행</p>
        </div>
        <div className="Category-contents">
          <img src={drive} />
          <p>드라이브</p>
        </div>
        <div className="Category-contents">
          <img src={camping} />
          <p>캠핑</p>
        </div>
        <div className="Category-contents">
          <img src={tracking} />
          <p>트래킹</p>
        </div>
        <div className="Category-contents">
          <img src={restaurant} />
          <p>맛집투어</p>
        </div>
        <div className="Category-contents">
          <img src={leisure} />
          <p>레저여행</p>
        </div>
        <div className="Category-contents">
          <img src={date} />
          <p>데이트</p>
        </div>
        <div className="Category-contents">
          <img src={cycling} />
          <p>자전거여행</p>
        </div>
      </div>
    </div>
  );
}

export default Category;
