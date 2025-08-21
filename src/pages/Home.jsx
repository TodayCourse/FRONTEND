import "./Home.css";
import image from "../assets/images/image.png";

import Header from "../components/Header";
import Footer from "../components/Footer";
import RecommendList from "../components/RecommendList";
import Slide from "../components/Slide";
import Category from "../components/Category";

const Home = () => {
  const slides = [
    {
      image: image,
      tag: "오늘의 코스",
      title: "어디로 떠나볼까요?",
      description: "당신만의 여행 코스를 만들어보세요.",
      description2: "자세히보기",
    },
    {
      image: image,
      tag: "오늘의 코스",
      title: "어디로 떠나볼까요?",
      description: "당신만의 여행 코스를 만들어보세요.",
      description2: "자세히보기",
    },
    {
      image: image,
      tag: "오늘의 코스",
      title: "어디로 떠나볼까요?",
      description: "당신만의 여행 코스를 만들어보세요.",
      description2: "자세히보기",
    },
  ];

  return (
    <div>
      <Header />
      <Slide slides={slides} />
      <Category />
      <div className="Home">
        <div className="Home-Section">
          <h3>오늘의 추천 코스</h3>
          <p>매일 새롭게 추천되는 여행 코스를 확인해보세요</p>
        </div>
      </div>
      <RecommendList />
      <Footer />
    </div>
  );
};

export default Home;
