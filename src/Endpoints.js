const Endpoints = {
  Index: "/",
  Browse: "browse",
  Course: "course",
  AlternateCourses: "alternatives",
  Schedule: "schedule",
  AboutUs: "about-us",
  Auth: {
    ClientConfiguration: `_configuration/ITUScheduler`,
    Prefix: "auth/",
    Login: "login",
    LoginFailed: "login-failed",
    LoginCallback: "login-callback",
    Register: "register",
    Profile: "profile",
    Logout: "logout",
    LoggedOut: "logged-out",
    LogoutCallback: "logout-callback"
  },
  Modals: {
    CourseCodePicker: "pick-course-code",
    CoursePicker: "pick-course"
  }
};

export default Endpoints;