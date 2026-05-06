"use client";

import { useState, useEffect } from "react";
import { AdminPageHeader } from "@/components/layout/AdminPageHeader";
import { Users, LayoutGrid, Receipt, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import StudentList from "./StudentList";
import BatchManagement from "./BatchManagement";

export default function StudentsManagementClient({ 
  workspaceId, 
  initialStudents, 
  batches,
  courses
}: { 
  workspaceId: string;
  initialStudents: any[];
  batches: any[];
  courses: any[];
}) {
  const [activeTab, setActiveTab] = useState("students");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tabs = [
    { id: "students", label: "Active Students", icon: Users },
    { id: "batches", label: "Batches & Schedules", icon: LayoutGrid },
    { id: "invoices", label: "Fee Management", icon: Receipt },
  ];

  if (!mounted) return null;

  return (
    <div className="p-4 lg:p-10 max-w-7xl mx-auto space-y-10 w-full">
      <AdminPageHeader 
        title="Student Management" 
        description="Manage your enrolled students, organize them into batches, and track fee payments."
      >
        <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300",
                activeTab === tab.id
                  ? "bg-white dark:bg-slate-700 text-primary shadow-sm border border-slate-200/50 dark:border-slate-600/50"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </AdminPageHeader>
      
      <div className="transition-all duration-300">
        {activeTab === "students" && (
          <StudentList 
            workspaceId={workspaceId} 
            initialStudents={initialStudents} 
            batches={batches}
          />
        )}
        
        {activeTab === "batches" && (
          <BatchManagement 
            workspaceId={workspaceId} 
            batches={batches} 
            courses={courses} 
          />
        )}
        
        {activeTab === "invoices" && (
          <div className="p-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
              <Receipt className="w-8 h-8 text-slate-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold">Invoices & Fee Tracking</h3>
              <p className="text-slate-500 max-w-sm">Generate monthly invoices, track payment status, and manage student accounts.</p>
            </div>
            <Button className="rounded-xl font-bold h-11 px-8">
              <Plus className="w-4 h-4 mr-2" /> Generate Invoices
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
