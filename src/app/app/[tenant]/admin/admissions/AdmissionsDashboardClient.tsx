"use client";

import { useState } from "react";
import { AdminPageHeader } from "@/components/layout/AdminPageHeader";
import { UserPlus, FileText, Settings, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AdminApplicationsClient } from "../students/AdminApplicationsClient";
import AdmissionConfigClient from "../students/AdmissionConfigClient";

export default function AdmissionsDashboardClient({
  workspaceId,
  applications,
  config,
  pendingCount
}: {
  workspaceId: string;
  applications: any[];
  config: any;
  pendingCount: number;
}) {
  const [activeTab, setActiveTab] = useState("applications");

  const tabs = [
    { id: "new-admission", label: "Manual Entry", icon: UserPlus },
    { id: "applications", label: "Online Applications", icon: FileText, count: pendingCount },
    { id: "form-config", label: "Form Settings", icon: Settings },
  ];

  return (
    <div className="p-4 lg:p-10 max-w-7xl mx-auto space-y-10">
      <AdminPageHeader 
        title="Student Admissions" 
        description="Manage new enrollments, process applications, and configure admission form."
      >
        <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 max-w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap shrink-0",
                activeTab === tab.id
                  ? "bg-white dark:bg-slate-700 text-primary shadow-sm border border-slate-200/50 dark:border-slate-600/50"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className="flex items-center justify-center min-w-[1.4rem] h-5 px-1.5 bg-primary text-white rounded-lg text-[10px] font-bold shadow-lg shadow-primary/20 dark:ring-1 dark:ring-white/20">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </AdminPageHeader>

      <div className="transition-all duration-300">
        {activeTab === "new-admission" && (
          <div className="p-8 bg-white dark:bg-slate-900 border-2 border-slate-100/50 dark:border-slate-800/50 rounded-[2.5rem] shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Manual Enrollment</h2>
              <Button variant="outline" className="rounded-xl border-2 font-bold h-10">
                <Database className="w-4 h-4 mr-2" /> Import CSV
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {/* Simplified manual form preview */}
               <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs">01</span>
                    Student Information
                  </h3>
                  <div className="grid gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 dark:text-slate-500">Full Name</label>
                      <input className="flex h-12 w-full rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-background px-4 py-2 text-sm focus:border-primary transition-all dark:text-white" placeholder="Enter student name" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 dark:text-slate-500">Email Address</label>
                      <input className="flex h-12 w-full rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-background px-4 py-2 text-sm focus:border-primary transition-all dark:text-white" placeholder="student@example.com" />
                    </div>
                  </div>
               </div>
               
               <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs">02</span>
                    Enrollment Details
                  </h3>
                  <div className="grid gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 dark:text-slate-500">Course / Batch</label>
                      <select className="flex h-12 w-full rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-background px-4 py-2 text-sm focus:border-primary transition-all dark:text-white">
                        <option>Select a batch...</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 dark:text-slate-500">Fees (₹)</label>
                      <input type="number" className="flex h-12 w-full rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-background px-4 py-2 text-sm focus:border-primary transition-all dark:text-white" placeholder="5000" />
                    </div>
                  </div>
               </div>
            </div>
            
            <div className="mt-12 flex justify-end border-t pt-8">
              <Button size="lg" className="rounded-2xl font-bold h-14 px-10 shadow-lg shadow-primary/20">
                Confirm & Enroll Student
              </Button>
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <AdminApplicationsClient 
            workspaceId={workspaceId} 
            initialData={applications} 
          />
        )}

        {activeTab === "form-config" && (
          <AdmissionConfigClient 
            workspaceId={workspaceId} 
            config={config} 
          />
        )}
      </div>
    </div>
  );
}
