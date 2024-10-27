// components/EmployeeForm.tsx
import React, { useState, useEffect } from 'react';
import { EmployeeFormProps} from '../types';

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, saveEmployee, editEmployee }) => {
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<number>(0)

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setId(employee.empid)
    }
  }, [employee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (employee) {
        editEmployee({ empid: employee.empid, name: name });
    } else {
        saveEmployee({ empid: id, name: name });
    }
    setName('')
    setId(0)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className='text-black'
      />
      <input
        type="number"
        value={id}
        onChange={(e) => setId(e.target.valueAsNumber)}
        placeholder="Id"
        required
        className='text-black ml-4'
      />
      <button type="submit" className='ml-4'>{employee ? "Save" : "Create"}</button>
    </form>
  );
};

export default EmployeeForm;
