'use client'
//import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useEffect, useState } from 'react'
import { Employee } from '../types'
import EmployeeForm from '../components/employeeForm'

async function getData() {
    const res = await fetch("http://127.0.0.1:8000/api/example")
    if (!res.ok) {
      throw new Error("Failed to fetch data")
    }
    return res.json()
}

const Page = () => {
  const [employees, setEmployees] = useState([])
  const [editingEmployees, setEditingEmployees] = useState<Employee | null>(null)

  const getEmployees = async () => {
    const data = await getData()
    setEmployees(data)
  }
  useEffect(() => {
    getEmployees()
  }, [])

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  

  const saveEmployee = async (employee: Employee) => {
    try {
       const response = await fetch('http://127.0.0.1:8000/api/example/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: employee.name,
            empid: employee.empid
        })
    })

    if (!response.ok) {
        const errorData = await response.json()
        console.error(errorData)
    } else {
        setEditingEmployees(null)
        getEmployees() 
    }
    
    } catch (error) {
        console.error("failed on save employee: ", error)
    }
    
  }

  const editEmployee = async (employee: Employee) => {
    
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/example/${employee.empid}/`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json'},
         body: JSON.stringify({
             name: employee.name,
             empid: employee.empid
         })
     })
 
     if (!response.ok) {
         const errorData = await response.json()
         console.error(errorData)
     } else {
         setEditingEmployees(null)
         
     }
     
     } catch (error) {
         console.error("failed on save employee: ", error)
     }
     await getEmployees() 
  }

    const deleteEmployee = async (id: number) => {
        await fetch(`http://127.0.0.1:8000/api/example/${id}/`, {
            method: 'DELETE'
        })
        getEmployees()
    }
  
  
  
  
    return (
        <div>
        <h1>Employee List</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee : Employee) => (
              <tr key={employee.empid}>
                <td>{employee.name}</td>
                <td>
                  <button onClick={() => setEditingEmployees(employee)}>Edit</button>
                  <button onClick={() => deleteEmployee(employee.empid)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EmployeeForm
          employee={editingEmployees}
          saveEmployee={saveEmployee}
          editEmployee={editEmployee}
        />
      </div>
  )
}

export default Page