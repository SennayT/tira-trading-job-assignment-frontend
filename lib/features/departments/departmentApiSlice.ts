import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Department {
  id: string;
  name: string;
  description: string;
  managingDepartmentId: string;
}

export interface IDepartmentAdd {
  name: string;
  description: string;
  manager: string | undefined;
}

export const departmentApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  reducerPath: 'departmentsApi',
  tagTypes: ['Departments'],
  endpoints: (builder) => ({
    getAllDepartments: builder.query<Department[], void>({
      query: () => 'department',
      providesTags: ['Departments'],
    }),
    getDepartment: builder.query<Department, string>({
      query: (id) => `department/${id}`,
    }),
    getManagedDepartments: builder.query<Pick<Department, 'id' | 'name' | 'description'>[], string>(
      {
        query: (id) => `department/${id}/managed`,
      }
    ),
    addDepartment: builder.mutation<Department, IDepartmentAdd>({
      query: (data) => ({
        url: 'department',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Departments'],
      transformResponse: (response: { data: Department }) => response.data,
      async onQueryStarted() {
        console.log('query started');
      },
    }),
  }),
});

export const {
  useGetAllDepartmentsQuery,
  useGetDepartmentQuery,
  useAddDepartmentMutation,
  useGetManagedDepartmentsQuery,
} = departmentApiSlice;
