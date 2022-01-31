// import { useQuery } from "@apollo/client";
// import { GET_TRACKS } from "./graphql/queries/example";
import LandingPage from "./pages/LandingPage";

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

  return <LandingPage />;
}

export default App;
