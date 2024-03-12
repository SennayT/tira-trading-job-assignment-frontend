import Link from 'next/link';
import { DepartmentList } from '@/components/DepartmentList/DepartmentList';

export default function HomePage() {
  return (
    <>
      <DepartmentList />
      <Link href="/department/add">Add</Link>
    </>
  );
}
