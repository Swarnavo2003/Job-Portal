import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Data Science",
      "Graphic Designer",
      "FullStack Developer",
      "Devops Engineer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-1 LPA", "1-2 LPA", "2-3 LPA", "3-4 LPA", "4-5 LPA", "5-6 LPA"],
  },
];

const FilterCard = ({ selectedFilter, setSelectedFilter }) => {
  return (
    <div className="w-full bg-white rounded-md p-5">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />

      <RadioGroup value={selectedFilter} onValueChange={setSelectedFilter}>
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center gap-2 mt-2">
                <RadioGroupItem value={item} />
                <Label>{item}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>

      {/* Clear filter button */}
      <button
        onClick={() => setSelectedFilter("")}
        className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Clear Filter
      </button>
    </div>
  );
};

export default FilterCard;
