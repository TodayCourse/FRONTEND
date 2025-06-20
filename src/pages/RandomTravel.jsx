import "./RandomTravel.css";
import React, { useState } from "react";

import map from "../assets/images/map.png";
import Header from "../components/Header";
import MobileHeader from "../components/MobileHeader";
import regions from "../components/korea_regions.json";

import seoul from "../assets/images/서울특별시.png";
import gangwon from "../assets/images/강원특별자치도.png";
import gyeonggi from "../assets/images/경기도.png";
import gyeongsangbukdo from "../assets/images/경상북도.png";

const regionImages = {
  서울특별시: seoul,
  강원특별자치도: gangwon,
  경기도: gyeonggi,
  경상북도: gyeongsangbukdo,
};

const RandomTravel = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSido, setSelectedSido] = useState("");

  const handleRandomSelect = () => {
    const sidoList = Object.keys(regions);
    const randomSido = sidoList[Math.floor(Math.random() * sidoList.length)];
    const cities = regions[randomSido];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];

    setSelectedRegion(`${randomSido} ${randomCity}`);
    setSelectedSido(randomSido); // 시도만 저장
  };

  return (
    <div>
      <Header />
      <div className="RandomTravel-MobileHeader">
        <MobileHeader />
      </div>
      <div className="RandomTravel">
        <div className="RandomTravel-map">
          <img
            src={selectedSido ? regionImages[selectedSido] : map}
            alt="Selected Region"
            className="MapImage"
          />
        </div>

        <div className="RandomTravel-controls">
          <button onClick={handleRandomSelect}>선택하기</button>
          {selectedRegion && (
            <div className="RandomTravel-text">
              오늘의 랜덤 여행지
              <div>{selectedRegion}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RandomTravel;
