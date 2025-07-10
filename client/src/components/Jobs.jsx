import { useState, useEffect } from "react";
import useJobStore from "@/store/useJobStore";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Navbar from "./shared/Navbar";

const Jobs = () => {
  const { allJobs } = useJobStore();
  const [selectedFilter, setSelectedFilter] = useState(""); // Single filter value
  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  // Simple filter function
  const filterJobs = () => {
    if (!selectedFilter) {
      // No filter selected, show all jobs
      setFilteredJobs(allJobs);
      return;
    }

    // Filter jobs based on selected filter
    const filtered = allJobs.filter((job) => {
      // Check if job matches the selected filter
      // Convert everything to string first to avoid errors

      const jobLocation = String(job.location || "");
      const jobTitle = String(job.title || "");
      const jobSalary = String(job.salary || "");

      // Simple string matching (case insensitive)
      return (
        jobLocation.toLowerCase().includes(selectedFilter.toLowerCase()) ||
        jobTitle.toLowerCase().includes(selectedFilter.toLowerCase()) ||
        jobSalary.toLowerCase().includes(selectedFilter.toLowerCase())
      );
    });

    setFilteredJobs(filtered);
  };

  // Run filter whenever selectedFilter or allJobs changes
  useEffect(() => {
    filterJobs();
  }, [selectedFilter, allJobs]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          </div>

          <div className="flex-1">
            {/* Show how many jobs found */}
            <p className="mb-4 text-gray-600">
              Found {filteredJobs.length} jobs
            </p>

            {filteredJobs.length === 0 ? (
              <span>No Job Found</span>
            ) : (
              <div className="h-[88vh] overflow-y-auto pb-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {filteredJobs.map((job) => (
                    <div key={job._id}>
                      <Job job={job} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
