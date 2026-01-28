'use client';
import { useAuth, useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { EmployeeType } from '../../libs/type';

export function useEmployeeData() {
  const { user } = useUser();
  const [employeeData, setEmployeeData] = useState<EmployeeType>();
  const { getToken } = useAuth();
  useEffect(() => {
    if (!user) return;

    const getEmployeeData = async () => {
      try {
        const token = await getToken();
        console.log({ token });
        const res = await axios.get('http://localhost:4000/user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEmployeeData(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getEmployeeData();
  }, [user]);
  return { employeeData };
}
