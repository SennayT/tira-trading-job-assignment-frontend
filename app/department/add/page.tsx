'use client';

import { TextInput, Container, Textarea, Button, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IDepartmentAdd,
  useAddDepartmentMutation,
  useGetAllDepartmentsQuery,
} from '@/lib/features/departments/departmentApiSlice';

export default function page() {
  const { data = [] } = useGetAllDepartmentsQuery();
  const [addDepartment, { isLoading }] = useAddDepartmentMutation();

  const form = useForm<IDepartmentAdd>({
    initialValues: {
      name: '',
      description: 'desc',
      manager: undefined,
    },
  });
  const onSubmit = async (values: typeof form.values) => {
    console.log(values);
    const res = await addDepartment(values);
    console.log('response is', res);
  };
  return (
    <Container size="xs">
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          label="Department Name"
          placeholder="Department Name"
          {...form.getInputProps('name')}
        />
        <Textarea
          label="Department Description"
          placeholder="Department Description"
          {...form.getInputProps('description')}
        />
        <Select
          label="Managing Department"
          placeholder="Department"
          data={data.map((d) => ({ value: d.id, label: d.name }))}
          {...form.getInputProps('manager')}
        />
        <Button disabled={isLoading} type="submit" variant="filled">
          Submit
        </Button>
      </form>
    </Container>
  );
}
