import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import useJobStore from "@/store/useJobStore";
import { useNavigate } from "react-router";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const { setSearchQuery } = useJobStore();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    setSearchQuery(query);
    navigate("/browse");
  };
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 font-semibold text-red-700">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br />
          Get Your <span className="text-purple-600">Dream Job</span>
        </h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est a
          laborum omnis assumenda optio quaerat?
        </p>
        <div className="flex w-[40%] mx-auto shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find your dream job"
            className="outline-none border-none w-full"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-purple-600 hover:bg-purple-700"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
