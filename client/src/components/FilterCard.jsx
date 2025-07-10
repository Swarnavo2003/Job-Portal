import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", " Bangalore", "Hyderabad", "Pune", "Mumbai"],
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

const FilterCard = ({ currentFilters, onFilterChange }) => {
  return (
    <div className="w-full bg-white rounded-md p-5">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />

      {filterData.map(({ filterType, array }) => (
        <div key={filterType} className="mt-4">
          <h2 className="font-bold text-lg">{filterType}</h2>
          <RadioGroup
            value={currentFilters[filterType] || ""}
            onValueChange={(value) => onFilterChange(filterType, value)}
          >
            {array.map((item) => (
              <div key={item} className="flex items-center gap-2 mt-2">
                <RadioGroupItem value={item} />
                <Label>{item}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
