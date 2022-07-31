import logo from './logo.svg';
import './App.css';
import NavBar from "./Components/NavBar";
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import Layout from "./Layout";
import Endpoints from "./Endpoints";
import IndexPage from "./Pages/IndexPage";
import BrowsePage from "./Pages/BrowsePage";
import AlternateCoursesPage from "./Pages/AlternateCoursesPage";
import CourseInfoPage from "./Pages/CourseInfoPage";
import SchedulePage from "./Pages/ProtectedPages/SchedulePage";
import NoMatch from "./Pages/NoMatch";
import CourseCodeSelectDialog from "./Components/CourseCodeSelectDialog";
import CourseSelectDialog from "./Components/CourseSelectDialog";
import {CourseContextProvider} from "./Services/CourseContext";
import {AuthProvider} from "./Services/AuthContext";
import {FavouritesContextProvider} from "./Services/FavouritesContext";
import {AlertsProvider} from "./Services/AlertsContext";

function App() {
  return (
      <AuthProvider>
          <CourseContextProvider> <FavouritesContextProvider> <AlertsProvider>
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<Layout/>}>
                          <Route index element={<IndexPage/>}/>
                          <Route path={Endpoints.Browse} element={<BrowsePage/>}/>
                          <Route path={`${Endpoints.AlternateCourses}/:crn`} element={<AlternateCoursesPage/>}/>
                          <Route path={`${Endpoints.Browse}/:facultyCode`} element={<BrowsePage/>}/>
                          <Route path={`${Endpoints.Browse}/:facultyCode/:courseCode`} element={<BrowsePage/>}/>
                          <Route exact path={`${Endpoints.Course}/:crn`} element={<CourseInfoPage/>}/>
                          <Route path={Endpoints.Schedule} element={<SchedulePage/>}>
                              <Route path={Endpoints.Modals.CourseCodePicker} element={<CourseCodeSelectDialog/>}/>
                              <Route path={Endpoints.Modals.CoursePicker} element={<CourseSelectDialog/>}/>
                          </Route>
                          <Route path="*" element={<NoMatch/>}/>
                      </Route>
                  </Routes>
              </BrowserRouter>
          </AlertsProvider> </FavouritesContextProvider> </CourseContextProvider>
      </AuthProvider>
  );
}

export default App;
