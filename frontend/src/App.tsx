import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import WorkflowDetails from "./pages/WorkflowDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/analysis/:runId" element={<WorkflowDetails />} />
    </Routes>
  );
}

export default App;
