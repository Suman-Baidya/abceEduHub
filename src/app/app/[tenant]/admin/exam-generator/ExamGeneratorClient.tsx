"use client";

import { useState, useEffect } from "react";
import { AdminPageHeader } from "@/components/layout/AdminPageHeader";
import {
   Sparkles,
   BrainCircuit,
   Settings2,
   FileText,
   Clock,
   Coins,
   ArrowRight,
   Loader2,
   CheckCircle2,
   AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ExamGeneratorClient({
   workspaceTokens
}: {
   workspaceTokens: number
}) {
   const [mounted, setMounted] = useState(false);
   const [isGenerating, setIsGenerating] = useState(false);
   const [examResult, setExamResult] = useState<string | null>(null);

   useEffect(() => {
      setMounted(true);
   }, []);

   const handleGenerate = () => {
      setIsGenerating(true);
      // Simulate generation
      setTimeout(() => {
         setExamResult("Mock generated exam content...");
         setIsGenerating(false);
      }, 2000);
   };

   if (!mounted) return null;

   return (
      <div className="p-4 lg:p-10 max-w-7xl mx-auto space-y-10">
         <AdminPageHeader
            title="AI Exam Generator"
            description="Leverage advanced AI to create customized, curriculum-aligned examination papers in seconds."
         >
            <div className="flex items-center gap-4 bg-primary/5 dark:bg-primary/10 px-6 py-3 rounded-2xl border border-primary/10 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">Available Balance</span>
                  <div className="flex items-center gap-2">
                     <Coins className="w-5 h-5 text-amber-500" />
                     <span className="text-xl font-black text-primary">{workspaceTokens} Tokens</span>
                  </div>
               </div>
            </div>
         </AdminPageHeader>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Configuration Side */}
            <div className="lg:col-span-5 space-y-8">
               <Card className="border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-xl shadow-slate-200/20 dark:shadow-none overflow-hidden bg-white dark:bg-slate-900">
                  <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b p-8">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center shadow-lg shadow-primary/30">
                           <Settings2 className="w-5 h-5" />
                        </div>
                        <CardTitle className="text-xl font-bold">Exam Blueprint</CardTitle>
                     </div>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                     <div className="space-y-3">
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Topic or Subject</Label>
                        <Input
                           placeholder="e.g. Molecular Biology or Calculus III"
                           className="h-14 rounded-2xl border-2 border-slate-50 dark:border-slate-800 focus:border-primary/50 bg-slate-50/50 dark:bg-slate-800/50 transition-all font-bold text-lg"
                        />
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                           <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Difficulty</Label>
                           <Select defaultValue="medium">
                              <SelectTrigger className="h-12 rounded-2xl border-2 border-slate-50 dark:border-slate-800 font-bold">
                                 <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className="rounded-2xl border-none shadow-2xl">
                                 <SelectItem value="easy" className="rounded-xl font-bold py-3">Beginner</SelectItem>
                                 <SelectItem value="medium" className="rounded-xl font-bold py-3">Intermediate</SelectItem>
                                 <SelectItem value="hard" className="rounded-xl font-bold py-3">Expert</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                        <div className="space-y-3">
                           <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Question Count</Label>
                           <Select defaultValue="10">
                              <SelectTrigger className="h-12 rounded-2xl border-2 border-slate-50 dark:border-slate-800 font-bold">
                                 <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className="rounded-2xl border-none shadow-2xl">
                                 <SelectItem value="10" className="rounded-xl font-bold py-3">10 Items</SelectItem>
                                 <SelectItem value="20" className="rounded-xl font-bold py-3">20 Items</SelectItem>
                                 <SelectItem value="50" className="rounded-xl font-bold py-3">50 Items</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                     </div>

                     <div className="space-y-3">
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Additional Constraints</Label>
                        <Textarea
                           placeholder="Focus on specific units, include case studies, or set a formal tone..."
                           className="min-h-[120px] rounded-2xl border-2 border-slate-50 dark:border-slate-800 focus:border-primary/50 bg-slate-50/50 dark:bg-slate-800/50 transition-all p-4 font-medium"
                        />
                     </div>

                     <div className="pt-6 border-t border-slate-50 dark:border-slate-800">
                        <Button
                           onClick={handleGenerate}
                           disabled={isGenerating}
                           className="w-full h-16 rounded-[1.5rem] bg-gradient-to-r from-primary to-blue-600 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-3 font-black text-lg tracking-tight"
                        >
                           {isGenerating ? (
                              <>
                                 <Loader2 className="w-6 h-6 animate-spin" />
                                 Generating Exam...
                              </>
                           ) : (
                              <>
                                 <Sparkles className="w-6 h-6" />
                                 Generate & Deduct 3 Tokens
                              </>
                           )}
                        </Button>
                        <p className="text-[10px] text-center mt-4 text-slate-400 font-bold uppercase tracking-widest">
                           Powered by GPT-4 Omni Engine
                        </p>
                     </div>
                  </CardContent>
               </Card>

               <div className="p-8 bg-blue-500/5 dark:bg-blue-500/10 rounded-[2.5rem] border-2 border-blue-500/10 space-y-4">
                  <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                     <AlertCircle className="w-5 h-5" />
                     <h4 className="font-bold">Generation Guide</h4>
                  </div>
                  <ul className="space-y-3">
                     {[
                        "Be specific about the topic for better accuracy.",
                        "Generated exams include Question Paper and Answer Key.",
                        "You can export the results to PDF or MS Word.",
                        "Each generation deducts 3 tokens from your balance."
                     ].map((tip, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                           {tip}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Results Side */}
            <div className="lg:col-span-7 h-full">
               <Card className="border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-xl shadow-slate-200/20 dark:shadow-none overflow-hidden bg-white dark:bg-slate-900 h-full flex flex-col">
                  <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b p-8 flex flex-row items-center justify-between shrink-0">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
                           <FileText className="w-5 h-5" />
                        </div>
                        <CardTitle className="text-xl font-bold">Exam Output</CardTitle>
                     </div>
                     {examResult && (
                        <div className="flex gap-2">
                           <Button variant="outline" size="sm" className="rounded-xl font-bold border-2 h-10">Export PDF</Button>
                           <Button size="sm" className="rounded-xl font-bold h-10">Print</Button>
                        </div>
                     )}
                  </CardHeader>
                  <CardContent className="p-0 flex-1 relative min-h-[600px] bg-slate-50/30 dark:bg-slate-900/30">
                     {!examResult && !isGenerating ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 space-y-6">
                           <div className="w-24 h-24 rounded-[2.5rem] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-700 animate-pulse">
                              <BrainCircuit className="w-12 h-12" />
                           </div>
                           <div className="space-y-2">
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ready for Generation</h3>
                              <p className="text-slate-500 max-w-xs mx-auto">Fill in the blueprint details and click generate to start the AI magic.</p>
                           </div>
                        </div>
                     ) : isGenerating ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 space-y-8">
                           <div className="relative">
                              <div className="w-32 h-32 rounded-full border-4 border-slate-100 dark:border-slate-800 border-t-primary animate-spin" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                 <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <h3 className="text-xl font-bold animate-pulse text-primary">AI is Thinking...</h3>
                              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Constructing curriculum-aligned questions</p>
                           </div>
                        </div>
                     ) : (
                        <div className="p-10 animate-in fade-in zoom-in-95 duration-700">
                           <div className="prose dark:prose-invert max-w-none">
                              <div className="flex items-center gap-2 text-green-600 font-black uppercase tracking-[0.2em] text-[10px] mb-6">
                                 <CheckCircle2 className="w-4 h-4" /> Exam Generated Successfully
                              </div>
                              {/* Mock Content */}
                              <div className="space-y-8 bg-white dark:bg-slate-950 p-10 rounded-3xl shadow-inner border border-slate-100 dark:border-slate-800">
                                 <div className="text-center space-y-2 border-b-2 border-slate-900 dark:border-white pb-6">
                                    <h2 className="text-2xl font-black uppercase tracking-tight m-0">Final Examination Paper</h2>
                                    <p className="text-sm font-bold opacity-60">Session: 2026-27 | Time: 3 Hours</p>
                                 </div>
                                 <div className="space-y-6">
                                    <div className="space-y-4">
                                       <h3 className="text-lg font-black flex justify-between items-center">
                                          <span>SECTION A: OBJECTIVE QUESTIONS</span>
                                          <span className="text-xs px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">10 Marks</span>
                                       </h3>
                                       <ol className="list-decimal pl-5 space-y-4 font-bold text-slate-700 dark:text-slate-300">
                                          <li>Which of the following is a fundamental concept of the topic discussed?</li>
                                          <li>Define the relationship between the primary variables in this context.</li>
                                          <li>Solve the following equation given the parameters provided.</li>
                                       </ol>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}
