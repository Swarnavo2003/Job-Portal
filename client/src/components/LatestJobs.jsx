import LatestJobCards from "./LatestJobCards";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  return (
    <div className="max-w-7xl mx-auto my-20 flex flex-col gap-10">
      <h1 className="text-4xl font-bold text-center">
        <span className="text-purple-600">Latest & Top</span> Job Opening
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-5">
        {randomJobs.slice(0, 6).map((item, index) => (
          <LatestJobCards key={index} />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
