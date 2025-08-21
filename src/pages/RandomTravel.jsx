import "./RandomTravel.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { GoArrowLeft } from "react-icons/go";

import map from "../assets/images/map.png";
import Header from "../components/Header";
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
  const navigate = useNavigate();

  const handleRandomSelect = () => {
    const sidoList = Object.keys(regions);
    const randomSido = sidoList[Math.floor(Math.random() * sidoList.length)];
    const cities = regions[randomSido];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];

    setSelectedRegion(`${randomSido} ${randomCity}`);
    setSelectedSido(randomSido); // 시도만 저장
  };

  const MobileGoArrowLeft = () => {
    navigate("/home");
  };

  return (
    <div>
      <div className="RandomTravel-Mobile-header-none">
        <Header />
      </div>
      <div className="RandomTravel-Mobile-header">
        <div
          className="RandomTravel-Mobile-header-GoArrowLeft"
          onClick={MobileGoArrowLeft}
        >
          <GoArrowLeft size="23" />
        </div>
        <div className="RandomTravel-Mobile-header-h2">
          <h2>코스여행</h2>
        </div>
      </div>

      <div className="RandomTravel-content">
        <div className="RandomTravel-controls">
          <div className="RandomTravel">
            <div className="RandomTravel-title">
              <p>
                ❝ 당신만 몰랐던, 오늘의 여행지
                <br />
                여행지는 우리가 정해드립니다 ❞
              </p>
            </div>

            <div className="RandomTravel-region">
              오늘의 여행지
              {selectedRegion && (
                <div className="RandomTravel-text">
                  <div>{selectedRegion}</div>
                </div>
              )}
            </div>
            <button onClick={handleRandomSelect}>선택하기</button>
          </div>

          <div className="RandomTravel-map">
            <img
              src={selectedSido ? regionImages[selectedSido] : map}
              alt="Selected Region"
              className="MapImage"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomTravel;
