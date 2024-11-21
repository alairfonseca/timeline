import { Timeline } from "./components";
import { timelineItems } from "./adapters";

function App() {
  console.log({timelineItems});

  return (
    <>
      <div>
        <Timeline timelineItems={timelineItems} />
      </div>
    </>
  );
}

export default App;
