import useJobStore from "@/store/useJobStore";
import LatestJobCards from "./LatestJobCards";

const LatestJobs = () => {
  const { allJobs } = useJobStore();
  return (
    <div className="max-w-7xl mx-auto my-20 flex flex-col gap-10">
      <h1 className="text-4xl font-bold text-center">
        <span className="text-purple-600">Latest & Top</span> Job Opening
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-5">
        {allJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
