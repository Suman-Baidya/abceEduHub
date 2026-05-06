"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  LogOut,
  Building2,
  Calendar,
  UserPlus,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { detectTenant, getTenantLink, isActivePath, WORKSPACE_ROUTES } from "@/lib/routing";
import { signOut } from "next-auth/react";

export function WorkspaceSidebar({ 
  tenant: propTenant,
  admissionsCount = 0 
}: { 
  tenant?: string;
  admissionsCount?: number;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  
  // Robust tenant detection using unified utility
  const tenant = propTenant || detectTenant(pathname, typeof window !== 'undefined' ? window.location.host : undefined);
  const displayTenant = tenant || "Workspace";

  const navItems = [
    { name: "Overview", href: getTenantLink(WORKSPACE_ROUTES.ADMIN, tenant, pathname), icon: LayoutDashboard },
    { name: "Staff & Roles", href: getTenantLink(WORKSPACE_ROUTES.ADMIN_STAFF, tenant, pathname), icon: UserCheck },
    { name: "Students", href: getTenantLink(WORKSPACE_ROUTES.ADMIN_STUDENTS, tenant, pathname), icon: Users },
    { name: "Admissions", href: getTenantLink(WORKSPACE_ROUTES.ADMIN_ADMISSIONS, tenant, pathname), icon: UserPlus },
    { name: "Attendance", href: getTenantLink(WORKSPACE_ROUTES.ADMIN_ATTENDANCE, tenant, pathname), icon: Calendar },
    { name: "Courses", href: getTenantLink(WORKSPACE_ROUTES.ADMIN_COURSES, tenant, pathname), icon: BookOpen },
    { name: "Exam Gen", href: getTenantLink(WORKSPACE_ROUTES.ADMIN_EXAM_GENERATOR, tenant, pathname), icon: Sparkles },
    { name: "Landing Page", href: getTenantLink(WORKSPACE_ROUTES.ADMIN_SETTINGS, tenant, pathname), icon: Building2 },
  ];

  // Close mobile sidebar on navigation
  useEffect(() => {
    setIsMounted(true);
    setIsMobileOpen(false);
  }, [pathname]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile Trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-[60]">
        <Button variant="outline" size="icon" onClick={toggleMobile} className="bg-background/80 backdrop-blur-md border-primary/20 shadow-lg">
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobile}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Content */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 280,
          x: isMobileOpen ? 0 : (isMounted && window.innerWidth < 1024 ? -300 : 0)
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed lg:sticky top-0 inset-y-0 left-0 z-[60] bg-zinc-950 text-zinc-400 border-r border-white/5 flex flex-col transition-all duration-300 ease-in-out h-screen overflow-x-hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className={cn(
          "h-20 flex items-center border-b border-white/5 transition-all duration-300",
          isCollapsed ? "justify-center" : "px-8 justify-between"
        )}>
          {!isCollapsed && (
            <AnimatePresence mode="wait">
              <motion.div
                key="full"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-3 overflow-hidden"
              >
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.5)] shrink-0">
                  <Building2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-white tracking-tight text-lg whitespace-nowrap capitalize max-w-[160px] truncate">
                  {displayTenant} Admin
                </span>
              </motion.div>
            </AnimatePresence>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn(
              "hover:bg-white/5 text-zinc-500 hover:text-white shrink-0 transition-all",
              isCollapsed ? "h-12 w-12" : "h-10 w-10"
            )}
          >
            {isCollapsed ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobile}
            className="lg:hidden hover:bg-white/5 text-zinc-500 absolute right-4"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {navItems.map((item) => {
            const isActive = isActivePath(pathname, item.href);
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 transition-all duration-300 group relative overflow-hidden",
                    isActive 
                      ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-[0_8px_20px_-6px_rgba(var(--primary),0.4)]" 
                      : "hover:bg-white/5 hover:text-white text-zinc-400",
                    isCollapsed ? "justify-center h-12 w-12 mx-auto rounded-xl" : "px-3 py-3 rounded-xl"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 flex-shrink-0 transition-colors", isActive ? "text-primary-foreground" : "group-hover:text-white")} />
                  
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="font-medium whitespace-nowrap flex-1"
                    >
                      {item.name}
                    </motion.span>
                  )}

                  {!isCollapsed && item.name === "Admissions" && admissionsCount > 0 && (
                    <span className={cn(
                      "ml-auto flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-lg text-[10px] font-bold transition-colors shadow-sm",
                      isActive 
                        ? "bg-white text-zinc-950" 
                        : "bg-red-500 text-white"
                    )}>
                      {admissionsCount}
                    </span>
                  )}

                  {isCollapsed && item.name === "Admissions" && admissionsCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center shadow-lg ring-2 ring-zinc-950 animate-pulse">
                      {admissionsCount}
                    </div>
                  )}

                  {isActive && (
                    <motion.div
                      layoutId="active-nav-workspace"
                      className="absolute -left-1 w-1.5 h-6 bg-white rounded-r-full"
                    />
                  )}

                  {isCollapsed && (
                    <div className="absolute left-full ml-4 px-2 py-1 bg-zinc-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap border border-white/10 shadow-xl">
                      {item.name}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={cn("border-t border-white/5 transition-all duration-300", isCollapsed ? "p-2" : "p-4")}>
          <div 
            onClick={async () => {
              const origin = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';
              const workspaceBase = getTenantLink("/", tenant, pathname);
              const target = `${origin}${workspaceBase}`;
              await signOut({ redirect: false });
              window.location.href = target;
            }}
            className={cn(
              "flex items-center gap-3 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all cursor-pointer group relative overflow-hidden",
              isCollapsed ? "justify-center h-12 w-12 mx-auto" : "px-3 py-3"
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-medium"
              >
                Logout
              </motion.span>
            )}
            {isCollapsed && (
              <div className="absolute left-full ml-4 px-2 py-1 bg-zinc-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap border border-white/10 shadow-xl">
                Logout
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
