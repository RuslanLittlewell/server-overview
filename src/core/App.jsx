import Main from "@pages/Main";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertHint from "@shared/AlertHint";
const App = () => {

  const options = {
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
  }

  return (
    <AlertProvider template={AlertHint} {...options}>
      <Main />
    </AlertProvider>
  );
};

export default App;
