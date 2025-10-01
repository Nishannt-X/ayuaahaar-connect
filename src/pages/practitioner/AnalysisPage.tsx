import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AnalysisPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to patients page since assessment is now part of add patient flow
    navigate('/practitioner-dashboard/patients');
  }, [navigate]);

  return null;
}
