'use client';

import { useState } from 'react';
import { Box, Text } from '@mantine/core';
import { useGetDepartmentQuery } from '@/lib/features/departments/departmentApiSlice';

function DisplayDepartment({ id }: { id: string }) {
  const { data, error, isLoading } = useGetDepartmentQuery(id);
  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;

  return <Text>Managing Department: {data?.name}</Text>;
}

function ManagingDepartment({ id }: { id: string | null }) {
  const [showManaged, setShowManaged] = useState(false);
  return (
    <Box>
      {!showManaged && (
        <Text onClick={() => setShowManaged(true)}>Click here to display managing department</Text>
      )}
      {showManaged &&
        (id === null ? <Text>Managing Department: None</Text> : <DisplayDepartment id={id} />)}
    </Box>
  );
}

export default function Page({ params }: { params: { id: string } }) {
  const { data, error, isLoading } = useGetDepartmentQuery(params.id);
  if (error) return <p>error</p>;
  if (isLoading) return <p>Loading</p>;

  return (
    <Box>
      <Text>Department Name: {data?.name}</Text>
      <Text>Department Description: {data?.description}</Text>
      <ManagingDepartment id={data?.managingDepartmentId || null} />
    </Box>
  );
}
