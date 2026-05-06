export default async function DiagPage({ params }: { params: any }) {
  const p = await params;
  return (
    <div className="p-10 font-mono">
      <h1 className="text-2xl font-bold mb-4">Routing Diagnostic</h1>
      <pre className="bg-slate-100 p-4 rounded">
        {JSON.stringify(p, null, 2)}
      </pre>
    </div>
  );
}
