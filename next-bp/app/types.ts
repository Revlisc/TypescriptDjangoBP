export interface Employee {
    empid: number,
    name: string
}

// Props for EmployeeForm component
export interface EmployeeFormProps {
    employee?: Employee | null;
    saveEmployee: (employee: Employee) => void;
    editEmployee: (employee: Employee) => void;
  }
  
  // Props for EmployeeTable component
  export interface EmployeeTableProps {
    employees: Employee[];
    setEditingEmployee: (employee: Employee | null) => void;
    deleteEmployee: (id: number) => void;
  }
