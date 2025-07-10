import { useState, useMemo } from "react";
import useJobStore from "@/store/useJobStore";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Navbar from "./shared/Navbar";

const Jobs = () => {
  const { allJobs } = useJobStore();

  const [filters, setFilters] = useState({});

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      const byLocation = !filters.Location || job.location === filters.Location;
      const byIndustry = !filters.Industry || job.industry === filters.Industry;
      const bySalary = !filters.Salary || job.salaryRange === filters.Salary;
      return byLocation && byIndustry && bySalary;
    });
  }, [allJobs, filters]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard
              currentFilters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            {filteredJobs.length === 0 ? (
              <span>No Job Found</span>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredJobs.map((job) => (
                  <Job key={job._id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
