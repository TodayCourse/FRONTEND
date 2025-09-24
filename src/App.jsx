import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from "react";

import Home from "./pages/Home";
import SiteInfo from "./pages/SiteInfo";
import Travel from "./pages/Travel";
import TravelList from "./components/TravelList";
import TravelRegister from "./pages/TravelRegister";
import TravelInfo from "./pages/TravelInfo";
import TravelUpdate from "./pages/TravelUpdate";
import RandomTravel from "./pages/RandomTravel";
import Info from "./pages/Info";
import Login from "./pages/Login";
import Terms from "./components/Terms";
import Join from "./pages/Join";

const CourseStateContext = createContext();
const CourseDispatchContext = createContext();

function App() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  // courses 상태를 App.js에서 관리
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/travel`);
        if (!response.ok) throw new Error("데이터 로딩 실패");
        const data = await response.json(); // 👈 이거 꼭 필요!
        setCourses(data); // 서버에서 배열을 주는 게 맞다면 여기서 배열 들어옴
      } catch (error) {
        console.error("데이터 로딩 오류:", error);
        setCourses([]); // 실패 시 최소한 배열로 초기화
      }
    };
    fetchCourses();
  }, []);

  const addPost = async (newPost) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/travel/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) throw new Error("게시글 저장 실패!");
      const savedPost = await response.json();
      setCourses((prev) => [...prev, savedPost]);
    } catch (error) {
      console.error("게시글 저장 오류:", error);
    }
  };

  const updatePost = async (travelId, updatedPost) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/travel/${travelId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });
      const result = await response.json();

      if (response.ok) {
        alert("수정이 완료되었습니다!");

        setCourses((prev) =>
          prev.map((course) =>
            course.travelId === travelId
              ? { ...course, ...updatedPost }
              : course
          )
        );
      } else {
        alert(`수정에 실패했습니다: ${result.message}`);
      }
    } catch (error) {
      alert("오류 발생: " + error.message);
    }
  };

  const deletePost = (travelId) => {
    setCourses((prev) => prev.filter((course) => course.travelId !== travelId));
  };

  return (
    <>
      <CourseStateContext.Provider value={courses}>
        <CourseDispatchContext.Provider
          value={{ addPost, updatePost, deletePost }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/siteinfo" element={<SiteInfo />} />
            <Route
              path="/travel"
              element={<Travel courses={courses} addPost={addPost} />}
            />
            <Route
              path="/travellist"
              element={<TravelList courses={courses} />}
            />
            <Route
              path="/travelregister"
              element={<TravelRegister addPost={addPost} />}
            />

            <Route
              path="/travelinfo/:travelId"
              element={
                <TravelInfo
                  courses={courses}
                  deletePost={deletePost}
                  updatePost={updatePost}
                />
              }
            />
            <Route
              path="/travelupdate/:travelId"
              element={<TravelUpdate updatePost={updatePost} />}
            />
            <Route path="/randomtravel" element={<RandomTravel />} />
            <Route path="/info" element={<Info />} />
            <Route path="/login" element={<Login />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/join" element={<Join />} />
          </Routes>
        </CourseDispatchContext.Provider>
      </CourseStateContext.Provider>
    </>
  );
}

export default App;
