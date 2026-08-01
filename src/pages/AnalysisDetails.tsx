import { useParams } from "react-router-dom";

function AnalysisDetails() {
  const { runId } = useParams();

  return (
    <div>
      <h1>Workflow Details</h1>
      <p>Run ID: {runId}</p>
    </div>
  );
}

export default AnalysisDetails;