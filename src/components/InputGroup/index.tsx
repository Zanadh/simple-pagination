import { ChangeEventHandler } from 'react';
import { Search } from 'react-feather';

export const InputGroup = ({
  label,
  onChange,
  value,
}: {
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}) => (
  <div className="d-flex flex-column">
    <label>{label}</label>
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
      <span className="input-group-text bg-primary" id="basic-addon2">
        <Search color="white" />
      </span>
    </div>
  </div>
);

export const InputSelectGroup = ({
  label,
  onChange,
  options = [],
  value,
}: {
  label?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  options?: Array<{ value: string; label: string }>;
  value?: string;
}) => (
  <div className="d-flex flex-column">
    <label>{label}</label>
    <div className="input-group">
      <select
        value={value}
        className="form-select"
        aria-label="size 3 select example"
        onChange={onChange}>
        {options.map((v, i) => (
          <option value={v.value} key={i}>
            {v.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);
