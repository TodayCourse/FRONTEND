import "./Slide.css";
import React, { useState, useEffect, useRef } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { FaPause, FaPlay } from "react-icons/fa";

import play from "../assets/images/play.png";
import stop from "../assets/images/stop.png";
import prev from "../assets/images/prev.png";
import next from "../assets/images/next.png";

const Slide = ({ slides = [], interval = 10000 }) => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // 자동재생 제어
  const length = slides.length;
  const progressRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
    setProgress(0);
  };

  useEffect(() => {
    if (length === 0 || isPaused) return;

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100; // 여기서 current는 건들지 않음
        }
        return prev + 100 / (interval / 100);
      });
    }, 100);

    return () => clearInterval(progressRef.current);
  }, [length, interval, isPaused]);

  useEffect(() => {
    if (progress >= 100) {
      setProgress(0);
      setCurrent((prevIndex) => (prevIndex === length - 1 ? 0 : prevIndex + 1));
    }
  }, [progress, length]);

  if (!Array.isArray(slides) || slides.length === 0) return null;

  return (
    <div className="slider">
      {slides.map((slide, index) => (
        <div
          className={index === current ? "slide active" : "slide"}
          key={index}
        >
          {index === current && (
            <div className="slide-content">
              <img src={slide.image} alt="slide" className="image" />
              <div className="overlay">
                <p className="tag">{slide.tag}</p>
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                <p className="moreContent">{slide.description2}</p>

                <div className="slide-footer">
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="number-counter">
                    {String(current + 1).padStart(2, "0")} /{" "}
                    {String(length).padStart(2, "0")}
                  </div>
                  <div className="controls">
                    <button className="nav-btn small" onClick={prevSlide}>
                      <img src={prev} />
                    </button>
                    <button
                      className="play-pause-btn small"
                      onClick={() => setIsPaused((prev) => !prev)}
                    >
                      {isPaused ? (
                        <img src={play} alt="시작" className="icon-img" />
                      ) : (
                        <img src={stop} alt="멈춤" className="icon-img" />
                      )}
                    </button>
                    <button className="nav-btn small" onClick={nextSlide}>
                      <img src={next} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Slide;
