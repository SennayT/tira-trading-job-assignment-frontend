'use client';

import Link from 'next/link';
import { Title, Table, LoadingOverlay, Box, Container } from '@mantine/core';
import { useGetAllDepartmentsQuery } from '@/lib/features/departments/departmentApiSlice';

export function DepartmentList() {
  const { data = [], error, isLoading } = useGetAllDepartmentsQuery();

  if (error) return <p>error</p>;

  const rows = data.map((department) => (
    <Table.Tr key={department.id}>
      <Table.Td>
        <Link href={`/department/${department.id}`}>{department.name}</Link>
      </Table.Td>
      <Table.Td>{department.description === '' ? '-' : department.description}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Container>
      <Title>Organization Departments </Title>
      <Box>
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'pink', type: 'bars' }}
        />
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Description</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    </Container>
  );
}
