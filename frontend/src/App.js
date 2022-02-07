// import { useQuery } from "@apollo/client";
// import { GET_TRACKS } from "./graphql/queries/example";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage/index";
<<<<<<< HEAD
import ProfilePage from "./pages/ProfilePage";
=======
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Match from "./pages/Match/Match";
>>>>>>> main

function App() {
  // const { loading, error, data } = useQuery(GET_TRACKS);

  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //     <div>
  //       <ul>
  //         {data.tracksForHome.map((track) => (
  //           <li>{track.title}</li>
  //         ))}
  //       </ul>
  //     </div>
  //   </div>
  // );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/match" element={<Match />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
