import { Timeline } from "./components";
import { timelineItems } from "./adapters";
import Modal from "react-modal";

Modal.setAppElement('#root');

function App() {
  return (<Timeline timelineItems={timelineItems} />);
}

export default App;
