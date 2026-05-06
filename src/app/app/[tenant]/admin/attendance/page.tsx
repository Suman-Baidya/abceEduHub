import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AttendanceClient from "./AttendanceClient";
import { getBatches } from "@/app/actions/attendance";

export default async function AttendancePage({
  params
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  const normalizedTenant = tenant?.toLowerCase();

  const workspace = await db.workspace.findUnique({
    where: { subdomain: normalizedTenant },
    select: { id: true }
  });

  if (!workspace) notFound();

  const batchesResult = await getBatches(workspace.id);

  return (
    <AttendanceClient 
      workspaceId={workspace.id}
      batches={batchesResult.success ? (batchesResult.data ?? []) : []} 
    />
  );
}
