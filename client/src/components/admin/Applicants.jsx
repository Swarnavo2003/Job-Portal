import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { useParams } from "react-router";
import useApplicationStore from "@/store/useApplicationStore";
import { Loader2 } from "lucide-react";

const Applicants = () => {
  const params = useParams();
  const { getApplicants, isFetchingApplicants, applicants } =
    useApplicationStore();

  useEffect(() => {
    getApplicants(params.id);
  }, [getApplicants, params.id]);

  if (isFetchingApplicants) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto border border-gray-200 rounded-2xl shadow-lg my-5 p-8">
        <h1 className="font-bold text-2xl">Applicants({applicants.length})</h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
