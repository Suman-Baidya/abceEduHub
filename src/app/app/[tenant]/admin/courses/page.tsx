import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getCourses } from "@/app/actions/courses";
import CourseList from "./CourseList";

import { AdminPageHeader } from "@/components/layout/AdminPageHeader";

// Trigger refresh to resolve HMR stale cache issue
export default async function CoursesPage({
  params
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;

  const workspace = await db.workspace.findUnique({
    where: { subdomain: tenant }
  });

  if (!workspace) notFound();

  const coursesResult = await getCourses(workspace.id);

  return (
    <div className="p-4 lg:px-10 lg:py-10 max-w-7xl mx-auto space-y-10">
      <AdminPageHeader 
        title="Courses & Curricula" 
        description="Design your curriculum, manage batches, and set pricing for your institute."
      />
      
      <CourseList 
        workspaceId={workspace.id} 
        initialCourses={coursesResult.data ?? []} 
        tenant={tenant}
      />
    </div>
  );
}
