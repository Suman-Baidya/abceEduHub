import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ExamGeneratorClient from "./ExamGeneratorClient";

export default async function AIExamGeneratorPage({
  params
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  const normalizedTenant = tenant?.toLowerCase();

  const workspace = await db.workspace.findUnique({
    where: { subdomain: normalizedTenant },
    select: { id: true, tokensBalance: true }
  });

  if (!workspace) notFound();

  return (
    <ExamGeneratorClient workspaceTokens={workspace.tokensBalance} />
  );
}
