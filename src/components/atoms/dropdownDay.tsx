import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DropdownDay = () => {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder='Select a Day' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Days</SelectLabel>
          {days.map((day) => (
            <SelectItem key={day} value={`${day}`}>
              {day}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DropdownDay;
