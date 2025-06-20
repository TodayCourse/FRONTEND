import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import axios from "axios";

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
  // courses 상태를 App.js에서 관리
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/travel");
        setCourses(response.data);
      } catch (error) {
        console.error("데이터 로딩 오류:", error);
      }
    };
    fetchCourses();
  }, []);

  const addPost = async (newPost) => {
    try {
      const response = await fetch("http://localhost:8080/api/travel/create", {
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
      const response = await fetch(
        `http://localhost:8080/api/travel/${travelId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPost),
        }
      );
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

  const CourseaddPost = async (travelId, courseNewPost) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/travel/${travelId}/courses`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseNewPost),
        }
      );
      if (!response.ok) throw new Error("코스 저장 실패!");
      const coursesavedPost = await response.json();
      setCourses((prev) => [...prev, coursesavedPost]);
    } catch (error) {
      console.error("게시글 저장 오류:", error);
    }
  };

  const CourseUpdatePost = async (travelId, CourseUpdatedPost) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/travel/${travelId}/courses`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(CourseUpdatedPost),
        }
      );
      const result = await response.json();

      if (response.ok) {
        alert("수정이 완료되었습니다!");

        setCourses((prev) =>
          prev.map((course) =>
            course.travelId === travelId
              ? { ...course, ...CourseUpdatedPost }
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
              element={
                <TravelRegister addPost={addPost} onSave={CourseaddPost} />
              }
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
