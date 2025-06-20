import "./Info.css";

import Header from "../components/Header";
import MobileHeader from "../components/MobileHeader";

const Info = () => {
  return (
    <>
      <Header />
      <div className="info-MobileHeader">
        <MobileHeader />
      </div>
      <div className="Info">Info</div>
    </>
  );
};

export default Info;
