import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  FileText,
  Bot,
  Compass,
  FileSpreadsheet,
  Users,
  Settings as SettingsIcon,
  ShieldAlert,
  Upload,
  ArrowRight,
  Sparkles,
  CheckCircle,
  FileJson,
  Plus,
  RefreshCw,
  Search,
  Zap,
  Info,
  Smartphone,
  ExternalLink
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { DocumentProfile, Opportunity, VaultedDocument } from "../types";

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<string>("Dashboard");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isAutofilling, setIsAutofilling] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  
  // Simulated Profile state, initially configured with clean default data
  const [userProfile, setUserProfile] = useState<DocumentProfile>({
    fullName: "John Doe",
    email: "john.doe@gmail.com",
    phone: "+1 (555) 321-7890",
    dateOfBirth: "1994-05-18",
    country: "United States",
    documentType: "Passport",
    documentNumber: "US-PASS-10293X",
    expiryDate: "2029-10-12",
    extractedSkillsOrDetails: ["Software Engineer with React experience", "Authorized to work in United States"],
    confidence: 0.98,
    documentTypesVaulted: ["Passport", "Resume", "Driver License"]
  });

  // Vaulted documents list
  const [documents, setDocuments] = useState<VaultedDocument[]>([
    { id: "doc-1", name: "International Passport.pdf", type: "Passport", uploadedAt: "2026-04-10", size: "1.4 MB", expiryDate: "2029-10-12", status: "Verified" },
    { id: "doc-2", name: "Software Engineer Resume.pdf", type: "Resume", uploadedAt: "2026-05-15", size: "840 KB", status: "Verified" },
    { id: "doc-3", name: "Driver License.pdf", type: "National ID", uploadedAt: "2026-05-20", size: "520 KB", expiryDate: "2027-02-14", status: "Expiring Soon" },
  ]);

  // List of matching opportunities (stateful so users can trigger dynamic matching)
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: "job-1",
      title: "Senior Full Stack Engineer (AI Solutions)",
      provider: "Aetheria Labs Inc",
      type: "Job",
      matchPercentage: 96,
      reward: "$140,000/yr + Equity",
      deadline: "2026-08-10",
      description: "Perfect match for your expertise in TypeScript, React, and AI-driven workflow design."
    },
    {
      id: "sch-1",
      title: "Next-Gen Founders Tech Grant",
      provider: "Vercel & Stripe Alliance",
      type: "Scholarship",
      matchPercentage: 88,
      reward: "$15,000 Equity-Free Fund",
      deadline: "2026-09-30",
      description: "Matches your developer background and interest in pioneering secure, user-centric document vaults."
    },
    {
      id: "gov-1",
      title: "National Small Business Tech Subsidy",
      provider: "Department of Commerce",
      type: "Government Scheme",
      matchPercentage: 82,
      reward: "Up to $10k Cloud Credits & Grants",
      deadline: "2026-11-15",
      description: "Qualifies under the Digital Infrastructure Expansion Act based on registered software developer credentials."
    }
  ]);

  // Input state for Custom Document Parser Playground
  const [customText, setCustomText] = useState<string>(
    `FULL NAME: Alex Mercer\nEMAIL: alex.mercer@innovate.dev\nPHONE: +1 (415) 888-0192\nDATE OF BIRTH: December 14, 1995\nDOCUMENT: UK National ID\nID NUMBER: UK-ID-882149\nEXPIRY: November 30, 2028\nCORE SKILLS:\n- Core Backend Architecture (Node.js & Go)\n- Postgres Database Performance Optimization\n- AWS Cloud Security Infrastructure Specialist`
  );

  // Dynamic status feedback (e.g. is fallback being used)
  const [statusMessage, setStatusMessage] = useState<string>("");

  // Recharts standard analytics data
  const formFillsChartData = [
    { month: "Jan", fills: 12 },
    { month: "Feb", fills: 19 },
    { month: "Mar", fills: 26 },
    { month: "Apr", fills: 45 },
    { month: "May", fills: 68 },
    { month: "Jun", fills: 94 }
  ];

  const storageChartData = [
    { name: "Passports", value: 350 },
    { name: "Resumes", value: 240 },
    { name: "Tax Files", value: 410 },
    { name: "Misc", value: 120 }
  ];

  // Chatbot State
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "bot", text: "Hello! I am Xinnava's intelligent vault assistant. I can fetch your passport details, tax IDs, or suggest government schemes you qualify for. Ask me anything!" }
  ]);
  const [chatInput, setChatInput] = useState<string>("");

  // Handler for custom document scanning using real server API
  const handleOCRScan = async () => {
    setIsScanning(true);
    setScanProgress(10);
    setStatusMessage("");

    // Simulate scan ticks for visual polish
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 300);

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: customText,
          documentName: "custom-pasted-id.txt",
          documentType: "National ID"
        })
      });

      const parsedData = await response.json();
      clearInterval(interval);
      setScanProgress(100);

      setTimeout(() => {
        setUserProfile({
          fullName: parsedData.fullName || "Alex Mercer",
          email: parsedData.email || "alex.mercer@innovate.dev",
          phone: parsedData.phone || "+1 (415) 888-0192",
          dateOfBirth: parsedData.dateOfBirth || "1995-12-14",
          country: parsedData.country || "United Kingdom",
          documentType: parsedData.documentType || "National ID",
          documentNumber: parsedData.documentNumber || "UK-ID-882149",
          expiryDate: parsedData.expiryDate || "2028-11-30",
          extractedSkillsOrDetails: parsedData.extractedSkillsOrDetails || ["Core Backend Developer", "AWS Certified Security Specialist"],
          confidence: parsedData.confidence || 0.95,
          documentTypesVaulted: ["Passport", "Resume", "Driver License", parsedData.documentType || "National ID"]
        });

        // Add document to the list
        const newDoc: VaultedDocument = {
          id: `doc-${Date.now()}`,
          name: `${parsedData.documentType || "National ID"} - ${parsedData.fullName || "Alex"}.pdf`,
          type: parsedData.documentType || "National ID",
          uploadedAt: new Date().toISOString().split("T")[0],
          size: "420 KB",
          expiryDate: parsedData.expiryDate || "2028-11-30",
          status: "Verified"
        };
        setDocuments(prev => [newDoc, ...prev]);

        // Trigger opportunity matching based on newly uploaded profile
        triggerOpportunityMatch(parsedData);

        if (parsedData.isFallback) {
          setStatusMessage("Information extracted cleanly via local parser.");
        } else {
          setStatusMessage("Document parsed in real-time with server-side Gemini AI!");
        }
        setIsScanning(false);
      }, 500);

    } catch (error) {
      clearInterval(interval);
      setIsScanning(false);
      setStatusMessage("Scan failed. Defaulting to loaded sample.");
    }
  };

  // Triggers real server matching for opportunities
  const triggerOpportunityMatch = async (profile: any) => {
    try {
      const response = await fetch("/api/match-opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile })
      });
      const data = await response.json();
      if (data.matches) {
        setOpportunities(data.matches);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Chat message submit handler
  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");

    // Simulate AI Vault assistant response based on profile
    setTimeout(() => {
      let botResponse = `I found matching records for that! According to your secure vault, your ${userProfile.documentType} ID is ${userProfile.documentNumber}, registered to ${userProfile.fullName}. Let me know if you would like me to auto-fill this into any form.`;
      
      const lower = userMsg.toLowerCase();
      if (lower.includes("expiry") || lower.includes("expire")) {
        botResponse = `Your ${userProfile.documentType} is valid until ${userProfile.expiryDate}. You have an active reminder set for this document.`;
      } else if (lower.includes("skill") || lower.includes("resume") || lower.includes("job")) {
        botResponse = `Your parsed CV details show the following skills: "${userProfile.extractedSkillsOrDetails.join(", ")}". Based on these, you have a 96% match for the Senior Full Stack Engineer role at Aetheria Labs.`;
      } else if (lower.includes("scheme") || lower.includes("scholarship")) {
        botResponse = `You qualify for ${opportunities.length} active opportunities. The best match is "${opportunities[0].title}" (${opportunities[0].matchPercentage}% match score).`;
      }

      setMessages(prev => [...prev, { sender: "bot", text: botResponse }]);
    }, 600);
  };

  // Autofilling simulator animation
  const [fillState, setFillState] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    docNum: "",
    submitted: false
  });

  const handleStartAutofill = () => {
    setIsAutofilling(true);
    setFillState({
      name: "",
      email: "",
      phone: "",
      country: "",
      docNum: "",
      submitted: false
    });

    const sequence = [
      { field: "name", value: userProfile.fullName },
      { field: "email", value: userProfile.email },
      { field: "phone", value: userProfile.phone },
      { field: "country", value: userProfile.country },
      { field: "docNum", value: userProfile.documentNumber }
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < sequence.length) {
        setFillState(prev => ({
          ...prev,
          [sequence[current].field]: sequence[current].value
        }));
        current++;
      } else {
        clearInterval(interval);
        setIsAutofilling(false);
      }
    }, 400);
  };

  return (
    <section id="preview" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20 px-3.5 py-1.5 rounded-full">
            Interactive Showcase
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Experience Xinnava Live
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg">
            Interact with the real user interface. Switch views, test our real-time AI parser, or run a simulated form autofill below.
          </p>
        </div>

        {/* Dashboard Outer Container */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0b1120] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
          
          {/* 1. Left Sidebar */}
          <div className="lg:col-span-3 border-r border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Logo / User Info */}
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow">
                  X
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Xinnava Vault</h4>
                  <span className="text-[10px] uppercase font-bold text-emerald-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Secure Sandbox
                  </span>
                </div>
              </div>

              {/* Sidebar Links */}
              <nav className="space-y-1 text-left">
                {[
                  { name: "Dashboard", icon: LayoutDashboard },
                  { name: "Documents", icon: FileText },
                  { name: "AI Assistant", icon: Bot },
                  { name: "Opportunities", icon: Compass },
                  { name: "Forms", icon: FileSpreadsheet },
                  { name: "Family", icon: Users },
                  { name: "Settings", icon: SettingsIcon },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.name;
                  return (
                    <button
                      key={tab.name}
                      onClick={() => setActiveTab(tab.name)}
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                        isActive
                          ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
                          : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/40 dark:text-slate-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="active-dot"
                          className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 ml-auto"
                        />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Profile Summary Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-xs uppercase">
                {userProfile.fullName.substring(0, 2)}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[130px]">
                  {userProfile.fullName}
                </p>
                <span className="text-[9px] text-slate-400 font-mono truncate block max-w-[130px]">
                  {userProfile.email}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Main Content Area */}
          <div className="lg:col-span-9 p-6 md:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar max-h-[700px] bg-slate-50/50 dark:bg-[#090e1a]/20">
            
            <AnimatePresence mode="wait">
              {/* Tab Content: Dashboard */}
              {activeTab === "Dashboard" && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/50 dark:border-slate-800/50">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Workspace Overview</h3>
                      <p className="text-xs text-slate-500">Live analytics for your credentials and opportunities.</p>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-500 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800/60">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Smart Engine Active</span>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/50 shadow-xs">
                      <span className="text-[10px] font-bold text-slate-400 block mb-1">TOTAL DOCUMENTS</span>
                      <div className="text-2xl font-black text-indigo-600 dark:text-blue-400">{documents.length}</div>
                      <p className="text-[9px] text-slate-400 mt-1">Verified secure</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/50 shadow-xs">
                      <span className="text-[10px] font-bold text-slate-400 block mb-1">AUTOFILL SUCCESS</span>
                      <div className="text-2xl font-black text-indigo-600 dark:text-blue-400">99.8%</div>
                      <p className="text-[9px] text-emerald-500 mt-1">Lighthouse verified</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/50 shadow-xs">
                      <span className="text-[10px] font-bold text-slate-400 block mb-1">MATCHED OFFERS</span>
                      <div className="text-2xl font-black text-indigo-600 dark:text-blue-400">{opportunities.length}</div>
                      <p className="text-[9px] text-slate-400 mt-1">AI match engine</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/50 shadow-xs">
                      <span className="text-[10px] font-bold text-slate-400 block mb-1">STORAGE USED</span>
                      <div className="text-2xl font-black text-rose-500">2.7 MB</div>
                      <p className="text-[9px] text-slate-400 mt-1">of 10 GB (Decentralized)</p>
                    </div>
                  </div>

                  {/* Recharts Form Autofills chart */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-8 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/50 shadow-xs">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Forms Automatically Filled (2026)</h4>
                        <span className="text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 px-2 py-0.5 rounded-full">Cumulative</span>
                      </div>
                      <div className="h-44 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={formFillsChartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorFills" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="month" stroke="#94a3b8" fontSize={9} />
                            <YAxis stroke="#94a3b8" fontSize={9} />
                            <Tooltip contentStyle={{ background: "#0f172a", border: "none", borderRadius: "10px", fontSize: "11px", color: "#fff" }} />
                            <Area type="monotone" dataKey="fills" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorFills)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Expiry alerts card */}
                    <div className="md:col-span-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/50 shadow-xs flex flex-col justify-between">
                      <div className="space-y-4">
                        <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Expiry Alerts</h4>
                        <div className="p-3.5 rounded-xl border border-rose-100 dark:border-rose-950/40 bg-rose-50/50 dark:bg-rose-950/10 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Driver License</span>
                            <span className="text-[9px] uppercase font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-full">7 Months Left</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">Expires on 2027-02-14. Xinnava will alert you 3 months prior.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab("Documents")}
                        className="w-full mt-4 text-center py-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        Manage credentials
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom section: Recent Documents & Suggestions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Recent Documents list */}
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Recent Documents</h4>
                      <div className="space-y-2.5">
                        {documents.slice(0, 3).map((doc) => (
                          <div key={doc.id} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
                            <div className="flex items-center space-x-2.5">
                              <FileText className="w-4 h-4 text-indigo-500" />
                              <div className="text-left">
                                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{doc.name}</p>
                                <span className="text-[10px] text-slate-400">{doc.size} • {doc.uploadedAt}</span>
                              </div>
                            </div>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              doc.status === "Verified" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                            }`}>
                              {doc.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Suggestions */}
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">AI Suggestions</h4>
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/50 to-blue-50/50 dark:from-indigo-950/20 dark:to-indigo-900/10 border border-indigo-100/60 dark:border-indigo-900/40 space-y-3 text-left">
                        <div className="flex items-center space-x-2">
                          <Bot className="w-4 h-4 text-indigo-500" />
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Matching Schemes Found</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                          Based on your uploaded skills ("React, TypeScript") and location, we matched 3 potential grants/programs.
                        </p>
                        <button
                          onClick={() => setActiveTab("Opportunities")}
                          className="px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white text-[11px] font-semibold hover:bg-indigo-500 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          Review matched details
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab Content: Documents (OCR scan playground) */}
              {activeTab === "Documents" && (
                <motion.div
                  key="documents"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 text-left"
                >
                  <div className="pb-3 border-b border-slate-200/50 dark:border-slate-800/50">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Secure Document Vault</h3>
                    <p className="text-xs text-slate-500">Test Xinnava's real-time AI OCR extraction engine below.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* OCR Input Panel */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400">SELECT SAMPLE ID / CV TEXT TO SCAN</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          <button
                            onClick={() => setCustomText(`FULL NAME: Alex Mercer\nEMAIL: alex.mercer@innovate.dev\nPHONE: +1 (415) 888-0192\nDATE OF BIRTH: December 14, 1995\nDOCUMENT: UK National ID\nID NUMBER: UK-ID-882149\nEXPIRY: November 30, 2028\nCORE SKILLS:\n- Core Backend Architecture (Node.js & Go)\n- Postgres Database Performance Optimization\n- AWS Cloud Security Infrastructure Specialist`)}
                            className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-[10px] font-bold rounded-lg text-slate-600 dark:text-slate-300 hover:border-indigo-500 hover:bg-slate-50 text-center cursor-pointer"
                          >
                            Alex National ID (UK)
                          </button>
                          <button
                            onClick={() => setCustomText(`PASSPORT SPECIMEN\nFULL NAME: Sarah Jenkins\nEMAIL: sarah.jenkins@outlook.com\nPHONE: +44 7911 123456\nDATE OF BIRTH: 1992-04-25\nCOUNTRY: United Kingdom\nDOCUMENT ID: UK-PASS-98725P\nEXPIRY DATE: December 15, 2026\nNOTES:\n- Verified biometric passport authority\n- British citizenship holder\n- Highly confidential information`)}
                            className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-[10px] font-bold rounded-lg text-slate-600 dark:text-slate-300 hover:border-indigo-500 hover:bg-slate-50 text-center cursor-pointer"
                          >
                            Sarah Passport (UK)
                          </button>
                          <button
                            onClick={() => setCustomText(`RESUME SHEET\nFULL NAME: John Doe\nEMAIL: john.doe@gmail.com\nPHONE: +1 (555) 321-7890\nDATE OF BIRTH: 1994-05-18\nDOCUMENT TYPE: Resume\nskills:\n- Frontend Engineer expertise (React & Tailwind)\n- Intelligent automated systems integration\n- Secure architecture validation\n- Redux and TypeScript certified expert`)}
                            className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-[10px] font-bold rounded-lg text-slate-600 dark:text-slate-300 hover:border-indigo-500 hover:bg-slate-50 text-center cursor-pointer"
                          >
                            John CV (US)
                          </button>
                        </div>
                      </div>

                      <div className="relative">
                        <textarea
                          value={customText}
                          onChange={(e) => setCustomText(e.target.value)}
                          className="w-full h-44 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-mono text-slate-700 dark:text-slate-300 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                          placeholder="Or paste your own document text here..."
                        />
                        <div className="absolute bottom-3 right-3 text-[9px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                          EDITABLE PLAIN TEXT
                        </div>
                      </div>

                      <button
                        onClick={handleOCRScan}
                        disabled={isScanning}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-70"
                      >
                        {isScanning ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Scanning via Xinnava AI ({scanProgress}%)</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            <span>Scan Document with Gemini AI</span>
                          </>
                        )}
                      </button>

                      {statusMessage && (
                        <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs flex items-center gap-2">
                          <Info className="w-4 h-4" />
                          <span>{statusMessage}</span>
                        </div>
                      )}
                    </div>

                    {/* Live Vault Status Panel */}
                    <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/50 space-y-4">
                      <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Active Vault Profile</h4>
                      
                      <div className="space-y-3 text-xs">
                        <div className="border-b border-slate-50 dark:border-slate-800 pb-2">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Parsed Name</span>
                          <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">{userProfile.fullName}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 border-b border-slate-50 dark:border-slate-800 pb-2">
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Country</span>
                            <span className="font-bold text-slate-700 dark:text-slate-300">{userProfile.country}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Date of Birth</span>
                            <span className="font-bold text-slate-700 dark:text-slate-300">{userProfile.dateOfBirth}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 border-b border-slate-50 dark:border-slate-800 pb-2">
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wide block">ID Type</span>
                            <span className="font-bold text-slate-700 dark:text-slate-300">{userProfile.documentType}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wide block">ID Number</span>
                            <span className="font-bold text-slate-700 dark:text-slate-300">{userProfile.documentNumber}</span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 uppercase tracking-wide block mb-1">Parsed Skills / Key details</span>
                          <div className="flex flex-wrap gap-1.5">
                            {userProfile.extractedSkillsOrDetails.map((skill, idx) => (
                              <span key={idx} className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-600 dark:text-slate-400 font-medium">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                          <span>OCR Extraction Confidence:</span>
                          <span className="text-emerald-500 font-mono font-bold">{(userProfile.confidence * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab Content: AI Assistant */}
              {activeTab === "AI Assistant" && (
                <motion.div
                  key="ai-assistant"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4 text-left flex flex-col h-[520px]"
                >
                  <div className="pb-3 border-b border-slate-200/50 dark:border-slate-800/50">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Assistant Chat</h3>
                    <p className="text-xs text-slate-500">Ask semantic questions about your vaulted documents.</p>
                  </div>

                  {/* Chat Message Panel */}
                  <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 rounded-2xl p-4 overflow-y-auto space-y-3.5 no-scrollbar">
                    {messages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`p-3 rounded-2xl text-xs max-w-[80%] text-left leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-indigo-600 text-white rounded-tr-none"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-none border border-slate-200/40 dark:border-slate-700/40"
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick helper queries */}
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setChatInput("What is my passport expiration date?")}
                      className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 hover:bg-slate-200 cursor-pointer"
                    >
                      "Check Expiry"
                    </button>
                    <button
                      onClick={() => setChatInput("What is my current ID number?")}
                      className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 hover:bg-slate-200 cursor-pointer"
                    >
                      "Fetch ID #"
                    </button>
                    <button
                      onClick={() => setChatInput("Do I qualify for any scholarships?")}
                      className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 hover:bg-slate-200 cursor-pointer"
                    >
                      "Welfare/Scholarships Matching"
                    </button>
                  </div>

                  {/* Chat Input */}
                  <div className="flex gap-2">
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleChatSubmit()}
                      placeholder="Ask something about your vaulted papers..."
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                    />
                    <button
                      onClick={handleChatSubmit}
                      className="px-4 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 cursor-pointer"
                    >
                      Send
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Tab Content: Opportunities */}
              {activeTab === "Opportunities" && (
                <motion.div
                  key="opportunities"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 text-left"
                >
                  <div className="pb-3 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Matched Opportunities</h3>
                      <p className="text-xs text-slate-500">Intelligent matches based on your verified credentials.</p>
                    </div>
                    <button
                      onClick={() => triggerOpportunityMatch(userProfile)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-600 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Re-match
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {opportunities.map((opp) => (
                      <div key={opp.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 shadow-xs flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] uppercase font-bold text-slate-400">{opp.type}</span>
                            <span className="text-[10px] font-bold text-emerald-500 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full">
                              {opp.matchPercentage}% MATCH
                            </span>
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{opp.title}</h4>
                            <p className="text-xs text-slate-500">{opp.provider}</p>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 font-normal leading-relaxed line-clamp-2">
                            {opp.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-50 dark:border-slate-800/50 space-y-3">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">Award/Salary:</span>
                            <span className="font-bold text-indigo-600 dark:text-blue-400">{opp.reward}</span>
                          </div>
                          
                          <button
                            onClick={() => {
                              setActiveTab("Forms");
                              handleStartAutofill();
                            }}
                            className="w-full py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-indigo-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                            Auto-Fill Form
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tab Content: Forms (One-click autofill simulator) */}
              {activeTab === "Forms" && (
                <motion.div
                  key="forms"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 text-left"
                >
                  <div className="pb-3 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Intelligent Form Autofill</h3>
                      <p className="text-xs text-slate-500">See how Xinnava handles form mappings in the wild.</p>
                    </div>
                    <button
                      onClick={handleStartAutofill}
                      className="px-3.5 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current text-amber-300 animate-bounce" />
                      Trigger Auto-Fill
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Simulated Form UI */}
                    <div className="lg:col-span-8 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-xs space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">UNIFIED SCHEME REGISTRATION FORM</span>
                        <div className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[9px] font-bold rounded flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-indigo-500" />
                          Xinnava Connected
                        </div>
                      </div>

                      <div className="space-y-3.5 text-xs">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-slate-500 font-medium">Full Name (Legal)</label>
                            <input
                              type="text"
                              value={fillState.name}
                              readOnly
                              placeholder="Waiting for Autofill..."
                              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-semibold"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-slate-500 font-medium">Email Address</label>
                            <input
                              type="text"
                              value={fillState.email}
                              readOnly
                              placeholder="Waiting for Autofill..."
                              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-semibold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-slate-500 font-medium">Phone Contact</label>
                            <input
                              type="text"
                              value={fillState.phone}
                              readOnly
                              placeholder="Waiting for Autofill..."
                              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-semibold"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-slate-500 font-medium">Issuing Country</label>
                            <input
                              type="text"
                              value={fillState.country}
                              readOnly
                              placeholder="Waiting for Autofill..."
                              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-semibold"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-slate-500 font-medium">Primary Verification Document ID</label>
                          <input
                            type="text"
                            value={fillState.docNum}
                            readOnly
                            placeholder="Waiting for Autofill..."
                            className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono font-semibold"
                          />
                        </div>

                        <div className="pt-4 flex justify-end">
                          <button
                            onClick={() => setFillState(prev => ({ ...prev, submitted: true }))}
                            disabled={!fillState.name}
                            className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold hover:bg-emerald-600 disabled:opacity-50 transition-colors cursor-pointer"
                          >
                            {fillState.submitted ? "Application Submitted Successfully!" : "Submit Verified Application"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* How Xinnava Auto-Filled Detail Panel */}
                    <div className="lg:col-span-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-xs flex flex-col justify-between">
                      <div className="space-y-4">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wide">AUTOFITTING LOGS</span>
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 font-mono text-[10px] text-slate-500 dark:text-slate-400 space-y-2">
                          <p className="text-emerald-500 font-bold">&gt; Chrome extension linked</p>
                          <p>&gt; Scanning input tag layout...</p>
                          <p>&gt; Found match: [Full Name]</p>
                          <p className={`transition-all duration-300 ${fillState.name ? "text-indigo-500 font-semibold" : "opacity-40"}`}>
                            &gt; Injected: "{userProfile.fullName}"
                          </p>
                          <p className={`transition-all duration-300 ${fillState.docNum ? "text-indigo-500 font-semibold" : "opacity-40"}`}>
                            &gt; Injected ID: "{userProfile.documentNumber}"
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-50 dark:border-slate-800/50 text-[11px] text-slate-400 flex items-center gap-1.5 leading-relaxed font-normal">
                        <Info className="w-4 h-4 text-indigo-500 shrink-0" />
                        <span>Xinnava maps database entities to forms, ignoring styling wrappers.</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab Content: Family */}
              {activeTab === "Family" && (
                <motion.div
                  key="family"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 text-left"
                >
                  <div className="pb-3 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Family Records Vault</h3>
                      <p className="text-xs text-slate-500">Manage multiple profiles securely under a single household trust.</p>
                    </div>
                    <button className="px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-700 flex items-center gap-1 cursor-pointer">
                      <Plus className="w-3.5 h-3.5" />
                      Add Profile
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Primary User Card */}
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 shadow-xs flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-black">
                        {userProfile.fullName.substring(0, 1)}
                      </div>
                      <div className="space-y-2 text-xs flex-1">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Owner</span>
                          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{userProfile.fullName}</h4>
                        </div>
                        <div className="flex items-center space-x-4 text-slate-500">
                          <span>3 vaulted papers</span>
                          <span>•</span>
                          <span className="text-emerald-500 font-bold">Primary</span>
                        </div>
                      </div>
                    </div>

                    {/* Spouse Profile Card */}
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 shadow-xs flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-black">
                        E
                      </div>
                      <div className="space-y-2 text-xs flex-1">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Spouse</span>
                          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Emily Doe</h4>
                        </div>
                        <div className="flex items-center space-x-4 text-slate-500">
                          <span>2 vaulted papers</span>
                          <span>•</span>
                          <span className="text-indigo-500 font-bold">Authorized</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab Content: Settings */}
              {activeTab === "Settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 text-left"
                >
                  <div className="pb-3 border-b border-slate-200/50 dark:border-slate-800/50">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Vault Configurations</h3>
                    <p className="text-xs text-slate-500">Manage encryption keys, extension sync, and offline backup.</p>
                  </div>

                  <div className="space-y-4">
                    {/* Security Setting */}
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between text-xs">
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">Decentralized Storage Protocol</h4>
                        <p className="text-[11px] text-slate-400">Stores credentials shards across decentralized IPFS servers.</p>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 font-bold rounded-lg uppercase text-[10px]">Active</span>
                    </div>

                    {/* Extension Sync */}
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between text-xs">
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">Browser autofill integrations</h4>
                        <p className="text-[11px] text-slate-400">Syncs credentials securely to Chrome & Safari browser helper.</p>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 font-bold rounded-lg uppercase text-[10px]">Synced</span>
                    </div>

                    {/* Developer settings */}
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between text-xs">
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">Custom web hook triggers</h4>
                        <p className="text-[11px] text-slate-400">Export structured profile JSON data automatically on verified submission.</p>
                      </div>
                      <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold rounded-lg uppercase text-[10px]">Disabled</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Simulated Desktop Status line */}
            <div className="mt-8 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-indigo-500" />
                Adaptive interface optimized for small screens
              </span>
              <a href="#waitlist" className="hover:underline flex items-center gap-1">
                Explore developer API
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
