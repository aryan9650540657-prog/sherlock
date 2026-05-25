"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Settings, 
  UploadCloud, 
  ArrowRight, 
  X, 
  Printer, 
  Download, 
  Plus, 
  Eye, 
  EyeOff, 
  Lock, 
  Sparkle,
  User,
  Heart,
  Sliders,
  AlertTriangle,
  FileText,
  Clock,
  HelpCircle
} from "lucide-react";

// ==========================================================================
// PRESETS DATA
// ==========================================================================
const PRESETS = {
  vc: {
    name: "The Sovereign Investor (Preset Alpha)",
    meta: "VC Partner • Custom Presets Base • 3 Angles Profiled",
    authenticity: 62,
    confidence: 9,
    ego: "High" as const,
    decisionStyle: "analytical" as const,
    firstImpression: "A masterclass in deliberate corporate understatement. The subject projects absolute authority through calculated stillness, choosing to observe rather than participate, signaling that he holds the power in the room.",
    verdict: "This is a high-power, low-empathy target motivated primarily by control and capital leverage. He will not be swayed by emotional appeals, brand storytelling, or hyperbole; he respects asymmetric information and calculated risk calculations. Approach him as a peer with high technical depth, do not over-explain, and always maintain direct, calm eye contact. If you show eagerness, he will exploit it as weakness.",
    observations: {
      face: [
        "Unblinking, direct eye contact with micro-expressions of calculated assessment",
        "Controlled jaw tension; mouth held in a thin, neutral line suggesting a habitual suppression of emotional leaks",
        "Slight downward angle of the chin in resting state, forcing others to look up slightly"
      ],
      posture: [
        "Impeccably straight, aligned posture; shoulders rolled back and relaxed, indicating high comfort in power positions",
        "Closed body language when listening; arms loosely folded or fingers tented (steepled) near the chest",
        "Leans backward in the seat rather than forward, showing a lack of urgency to please"
      ],
      clothing: [
        "Premium Loro Piana unstructured cashmere blazer; high-end fabric signaling extreme wealth without loud logos",
        "Bespoke collared shirt, tailored specifically to the neck width, indicating precise personal care",
        "No visible lint, creases, or misalignment; grooming is meticulous and systematic"
      ],
      hands: [
        "Finger steepling (tented hands) when speaking, a classic display of intellectual confidence",
        "Hand movements are slow, deliberate, and sparse; no fidgeting, finger-tapping, or nervous adjustments",
        "Nails are clean, short, and professionally manicured"
      ],
      accessories: [
        "Vacheron Constantin Patrimony watch in white gold; a connoisseur watch that flies under the radar of the uninitiated",
        "No wedding ring or loud jewelry; minimalist accessories reinforce a clinical, self-contained persona",
        "Premium leather folio case placed squarely on the table, indicating structured preparation"
      ],
      environment: [
        "Minimalist penthouse boardroom with floor-to-ceiling glass; signals high-altitude control",
        "Background features structured, modern abstract art; denotes preference for clean, non-emotional design",
        "No personal items (family photos, mugs) in the workspace, indicating a strict boundary between professional and private life"
      ]
    },
    personalityType: "Intense, analytical pragmatist (INTJ profile). He views interactions as chess games, constantly evaluating leverage, credibility, and returns. He is highly disciplined and expects the same from others.",
    stressIndicators: "Minimal external indicators. When challenged, his jaw muscles clench briefly (masseter muscle flex), and his blinking rate decreases further, indicating heightened focus and cognitive shielding rather than panic.",
    commStyle: "Direct, concise, and heavily data-driven. He detests conversational filler and respects people who get to the point within the first 60 seconds.",
    commPositive: "Rigorous quantitative proof, structural efficiency, dry logic, and acknowledging his status through your preparation rather than flattery.",
    commNegative: "Sales pitch hype, emotional pleading, unmapped assertions, interruptions, or calling him by informal nicknames.",
    openingLine: "I’ve analyzed the structural bottleneck in your portfolio's logistics layer, and I have three specific metrics that show how our model resolves it.",
    motivatorsList: ["control", "status", "achievement"],
    motivatorsText: "Driven primarily by control (autonomy over his domain) and status (being recognized implicitly as the smartest, most influential figure in the room).",
    objectionStyle: "Cold, logical, and challenging. He will ask sharp, diagnostic questions designed to find the weakest point in your proposal and test your resolve.",
    powerDynamics: "He expects to feel superior and in control. Do not fight this directly; instead, position yourself as a highly competent subject-matter advisor who respect his sovereignty.",
    closingStrategy: "Present the deal as a logical inevitability. Use structured choices (e.g., 'Do you prefer to structure this as a standard convertible note or direct equity?') rather than asking 'Are we ready to sign?'. Let him feel the decision was his.",
    neverDo: "NEVER try to build rapport using personal small talk or ask him about his family/weekend unless he initiates. He will view it as an intrusive, low-status compliance tactic.",
    projection: "A calm, collaborative partner who is simply listening to your ideas and looking for mutual alignment.",
    reveal: "A highly defensive, dominant gatekeeper who has already decided his posture and is hunting for structural inconsistencies to disqualify your credibility."
  },
  negotiator: {
    name: "The Iron Tactician (Preset Beta)",
    meta: "Head of Acquisitions • Controlled Aggression • 2 Angles Profiled",
    authenticity: 54,
    confidence: 10,
    ego: "High" as const,
    decisionStyle: "cautious" as const,
    firstImpression: "An active predator state. The subject projects a dense, physical presence, leaning forward into the space to dominate conversations before they begin.",
    verdict: "This subject is an aggressive negotiator who uses pressure and artificial timelines to force concessions. He respects strength and pushes back hard against perceived weakness. To deal with him, you must draw firm boundaries early, refuse to yield to intimidation, and match his direct, unvarnished style. If you bend, he will push you until you break.",
    observations: {
      face: [
        "Unwavering, intense eye contact; pupils slightly dilated, suggesting high adrenaline and competitive focus",
        "Tight lip compression and forward-thrust jaw, signaling combative ready-state",
        "Furrowed brows focused directly on the speaker, indicating a critical filter"
      ],
      posture: [
        "Leans forward, forearms resting flat on the table, invading the central space",
        "Shoulders hunched slightly forward, framing himself as a physically dominant obstacle",
        "Feet planted wide on the ground, creating a solid, unmovable physical anchor"
      ],
      clothing: [
        "Dark navy pinstripe suit, broad padded shoulders; classic power-dressing designed to project size and authority",
        "Bright red silk tie, tied in a thick Windsor knot; a traditional dominance color display",
        "High-shine black leather Oxford shoes, immaculately polished"
      ],
      hands: [
        "Hands are active, pointing or chopping to emphasize points; gestures slice through the air",
        "Fists occasionally clench on the table when listening to points he disagrees with",
        "Index finger frequently extended, a subconscious warning gesture"
      ],
      accessories: [
        "Gold Rolex Submariner watch; a highly visible status symbol designed to project immediate financial power",
        "Thick gold signet ring on the pinky finger, highlighting a lineage/traditional status focus",
        "Heavy metallic pen, clicked deliberately to break the silence during pauses"
      ],
      environment: [
        "Heavy mahogany desk with high-backed leather chairs, placing him physically higher than guests",
        "Dimly lit background, making him the central lit figure; calculated to intimidate",
        "No visitor amenities present on the desk, emphasizing a transactional boundary"
      ]
    },
    personalityType: "Assertive Driver (ESTJ profile). Transactional, competitive, and impatient. He measures value entirely in immediate wins and concessions, viewing compromises as losses.",
    stressIndicators: "Heavy breathing, visible flushing of the neck skin, and increased frequency of pen clicking or table drumming. When cornered, his tone becomes sharper and more dismissive.",
    commStyle: "Aggressive, declarative, and direct. He speaks in short sentences and commands rather than questions.",
    commPositive: "Firmness, standing your ground, presenting clear trade-offs, and immediate delivery of bottom-line results.",
    commNegative: "Humbly asking for permission, hesitation, long stories, emotional appeals, or displays of submissiveness.",
    openingLine: "Here is the bottom-line pricing structure. I'm prepared to walk away if these numbers don't work for both sides.",
    motivatorsList: ["status", "control", "achievement"],
    motivatorsText: "Driven by status and achievement. He needs to win publicly and feel like he extracted a concession that others could not.",
    objectionStyle: "Aggressive and challenging. He will use silence, scoffing, or direct contradiction to make you doubt your value.",
    powerDynamics: "He wants to feel superior. Let him win on minor, pre-planned concessions so he satisfies his ego, while you hold firm on your core terms.",
    closingStrategy: "Create a 'hard close' based on scarcity. (e.g., 'This price is valid until 5 PM today as we have another buyer waiting'). He respects speed and fear of missing out.",
    neverDo: "NEVER apologize for your price or terms. If you say 'I'm sorry, but we have to charge X,' he will immediately demand a discount.",
    projection: "A fair but firm corporate executive looking for a structured, standard transaction.",
    reveal: "A highly competitive, zero-sum combatant who is looking to squeeze every drop of margin out of the negotiation."
  },
  founder: {
    name: "The Tech Disruptor (Preset Gamma)",
    meta: "Co-Founder & CTO • Casual Brilliance • 4 Angles Profiled",
    authenticity: 88,
    confidence: 7,
    ego: "Medium" as const,
    decisionStyle: "intuitive" as const,
    firstImpression: "Intellectually hyperactive and intentionally informal. Projecting a relaxed, modern tech-brilliance archetype that rejects traditional corporate structures.",
    verdict: "This is a creative, intuitive thinker who is motivated by building, novelty, and intellectual connection. He is highly authentic but can be scattered. He does not care about traditional status markers but is deeply impressed by elegant engineering, grand visions, and authentic passion. Pitch him on the future, not just the spreadsheet.",
    observations: {
      face: [
        "Frequent, rapid blinking and darting eye contact, suggesting high cognitive speed and active imagination",
        "Open, frequent smiles that reach the eyes (authentic Duchenne smiles)",
        "Restless head tilting when listening, processing ideas dynamically"
      ],
      posture: [
        "Asymmetrical, relaxed seating; slouching slightly or sitting with one leg crossed over the knee",
        "Open body posture; chest exposed, arms wide apart, signaling low defensiveness",
        "Frequently shifts weight or changes positions, indicating physical restlessness"
      ],
      clothing: [
        "Distressed grey cotton hoodie, dark t-shirt with a subtle coding reference; deliberate anti-suit signaling",
        "Ripped denim jeans and clean, limited-edition sneakers; shows subcultural status awareness",
        "Slightly messy hair and unstyled beard; projects a focus on ideas over physical vanity"
      ],
      hands: [
        "Highly expressive hand gestures; uses hands to describe abstract shapes or systems in the air",
        "Subtle fidgeting with a desktop object (like a mechanical keyboard switch or Rubik's cube)",
        "Touches his hair or chin when contemplating deep technical queries"
      ],
      accessories: [
        "Apple Watch Ultra with a rugged loop strap; signals utility, fitness, and tech-adoption",
        "Thin, matte-black laptop covered in developer conference stickers; projects hands-on builder identity",
        "Reusable titanium water bottle with custom branding"
      ],
      environment: [
        "Open-plan office with whiteboards filled with system architecture diagrams",
        "Multiple monitors showing lines of code and terminal outputs; highlights technical immersion",
        "Casual background noise (colleagues laughing, espresso machine); signals a collaborative, flat structure"
      ]
    },
    personalityType: "Innovative Visionary (ENFP/ENTP profile). Highly creative, intellectually curious, and easily bored. He values authenticity, cleverness, and disruptive potential over rules.",
    stressIndicators: "Nervous laughter, rapid talking, and touching his face or neck frequently. Under stress, he will try to intellectualize the problem or pivot the topic to a futuristic scenario.",
    commStyle: "Storyteller, conceptual, and enthusiastic. He speaks quickly, often jumping between parallel ideas.",
    commPositive: "Pioneering concepts, authentic excitement, technical elegance, and collaborative brainstorming.",
    commNegative: "Bureaucratic rules, 'that's how it's always been done' logic, rigid pricing tables, or formal corporate jargon.",
    openingLine: "What if we completely bypassed the traditional API layer and built this as a decentralized event stream? Here's the napkin sketch.",
    motivatorsList: ["connection", "achievement", "control"],
    motivatorsText: "Driven by connection (shared passion for building) and achievement (solving a hard technical problem that hasn't been solved before).",
    objectionStyle: "Curious but skeptical. He will ask technical 'what-if' questions or worry that your solution is too rigid for his stack.",
    powerDynamics: "He wants to feel equal. He hates hierarchy. Approach him as a co-creator, brainstorming the solution together rather than selling to him.",
    closingStrategy: "Align the close with his vision. (e.g., 'If we kick this off today, we can have the prototype running by the hackathon next month'). Appeal to his desire to see things built.",
    neverDo: "NEVER pull out a 50-page PDF contract or slide deck in your first meeting. You will instantly lose his interest and kill the creative momentum.",
    projection: "A casual, relaxed builder who is just chatting about tech and doesn't care about the business mechanics.",
    reveal: "A highly intelligent, protective architect who is deeply proud of his creation and will reject anything that threatens his technical control."
  },
  recruiter: {
    name: "The Social Arbitrageur (Preset Delta)",
    meta: "VP of People Operations • High Rapport Focus • 2 Angles Profiled",
    authenticity: 78,
    confidence: 8,
    ego: "Medium" as const,
    decisionStyle: "social" as const,
    firstImpression: "Warm, highly engaging, and socially calibrated. The subject broadcasts empathy and accessibility, designed to make you feel instantly comfortable.",
    verdict: "This target is a relationship-driven decision maker who prioritizes culture, alignment, and consensus. She is highly sensitive to social cues, tone, and body language. To succeed with her, focus on building genuine personal rapport, demonstrate how your solution supports the human element, and ensure she feels heard. She acts as a powerful gatekeeper who filters out toxic personalities.",
    observations: {
      face: [
        "Warm, sustained eye contact paired with active nodding to signal engagement and validation",
        "Expressive eyebrows that rise in empathy or interest; high micro-expression responsiveness",
        "Authentic, wide smile; laugh lines around the eyes (crow's feet) are highly active"
      ],
      posture: [
        "Open, forward-leaning posture; torso angled directly towards the speaker, indicating active listening",
        "Uncrossed legs and soft, open arm positions; avoids defensive blockages",
        "Slight head tilt when listening, a subconscious gesture showing empathy and receptivity"
      ],
      clothing: [
        "Stylish, high-quality knit sweater in warm earthy tones; projects warmth and comfort",
        "Clean, business-casual tailoring; professional yet highly approachable",
        "Hair is neatly styled but soft; makeup is natural and polished, indicating balanced care"
      ],
      hands: [
        "Gestures are circular and soft, often held palms-up (signals honesty and lack of threat)",
        "Gently touches her collarbone or chest when expressing empathy or deep agreement",
        "Hands are kept visible above the table at all times, building trust"
      ],
      accessories: [
        "Minimalist, elegant silver jewelry; simple necklace and stud earrings (non-distracting)",
        "Classic leather-strapped watch, medium face; functional and understated",
        "Warm cup of tea held in both hands, using warmth to self-soothe and project cozy accessibility"
      ],
      environment: [
        "Bright, sunlit office with indoor plants (Pothos, Monstera); signals life, growth, and care",
        "Soft furnishings (cushions, textured rug); reduces acoustic echoes and softens the space",
        "A bookshelf behind her featuring books on leadership, psychology, and organizational culture"
      ]
    },
    personalityType: "People-Centric Facilitator (ENFJ/ESFJ profile). Highly empathetic, organized, and socially expressive. She values harmony, team consensus, and cultural integrity.",
    stressIndicators: "Over-smiling, speaking in a slightly higher pitch, and fidgeting with her rings. Under stress, she becomes overly agreeable to avoid conflict, while withdrawing her actual commitment.",
    commStyle: "Emotional, storytelling, and highly collaborative. She frequently uses inclusive pronouns ('we', 'us', 'our team').",
    commPositive: "Empathy, understanding human impact, telling stories about team success, and active, respectful listening.",
    commNegative: "Cold transactional language, dismissiveness of 'soft skills', aggressive posturing, or ignoring team dynamics.",
    openingLine: "I love how your team focuses on psychological safety. We've designed this implementation to minimize friction for your department.",
    motivatorsList: ["connection", "security", "status"],
    motivatorsText: "Driven by connection (deep alignment with her network) and security (protecting her team and avoiding cultural disruption).",
    objectionStyle: "Polite but elusive. She will voice concerns disguised as 'team feedback' or try to delay to build internal consensus.",
    powerDynamics: "She prefers a guided, consensus-based relationship. She wants to feel like you are partnering with her to help her team, not selling to her.",
    closingStrategy: "Focus on social proof and risk reduction. (e.g., 'We've helped three other people-first organizations transition seamlessly, and their teams reported 90% satisfaction'). Provide testimonials.",
    neverDo: "NEVER treat her as just an administrative hurdle to get to the 'real' decision maker. If she senses you are looking past her, she will quietly block you.",
    projection: "An open, empathetic advocate who is fully on your side and agrees with everything you say.",
    reveal: "A highly protective, strategic organizational filter who is actively evaluating whether your personality and values fit her company's ecosystem."
  }
};

interface Star {
  id: number;
  left: string;
  top: string;
  size: string;
  color: string;
  opacity: number;
  delay: string;
}

interface FileQueueItem {
  id: string;
  name: string;
  type: string;
  size: number;
  src: string;
  base64: string;
}

interface LogLine {
  id: string;
  timestamp: string;
  text: string;
  type: "info" | "success" | "warning";
}

export default function SherlockApp() {
  // Config & State
  const [apiKey, setApiKey] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sherlock_gemini_key") || "";
    }
    return "";
  });
  const [model, setModel] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sherlock_gemini_model") || "gemini-3.5-flash";
    }
    return "gemini-3.5-flash";
  });
  const [activePresetKey, setActivePresetKey] = useState<keyof typeof PRESETS | null>(null);
  const [currentFiles, setCurrentFiles] = useState<FileQueueItem[]>([]);
  const [prepModeEnabled, setPrepModeEnabled] = useState(false);
  const [prepText, setPrepText] = useState("");
  const [currentView, setCurrentView] = useState<"home" | "loading" | "dossier">("home");
  
  // Terminal Logs for visual scanning state
  const [logs, setLogs] = useState<LogLine[]>([]);
  
  // Report Result
  const [reportData, setReportData] = useState<any>(null);
  
  // UI Panels Controls
  const [activeTab, setActiveTab] = useState("briefing");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "info" | "danger" } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Generate memoized environment star coordinates to prevent re-render flickering
  const stars: Star[] = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${(i * 17) % 100}%`,
      top: `${(i * 23) % 100}%`,
      size: `${((i * 7) % 3) + 1}px`,
      color: i % 2 === 0 ? "#00f2fe" : "#c5a880",
      opacity: (((i * 11) % 4) + 1) * 0.1,
      delay: `${(i * 0.15) % 3}s`
    }));
  }, []);

  // Keep terminal scrolled to the bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Toast auto-dismissal
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (text: string, type: "info" | "danger" = "info") => {
    setToastMessage({ text, type });
  };

  // --------------------------------------------------------------------------
  // INTERACTION FLOW FUNCTIONS
  // --------------------------------------------------------------------------

  // Preset Selection handling
  const handleSelectPreset = (key: keyof typeof PRESETS) => {
    // Clear custom files first to avoid overlap
    clearFileQueueByRef();
    setActivePresetKey(key);
    showToast(`Preset loaded: ${PRESETS[key].name}`);
  };

  // Drop File handler
  const processFiles = (files: FileList) => {
    // De-select active preset if any custom files are uploaded
    setActivePresetKey(null);

    const maxCount = 5;
    const currentCount = currentFiles.length;
    const spaceRemaining = maxCount - currentCount;

    if (spaceRemaining <= 0) {
      showToast("Maximum queue reached. Delete existing images first.", "danger");
      return;
    }

    const eligibleFiles = Array.from(files).slice(0, spaceRemaining);

    eligibleFiles.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        showToast("Invalid file type. Please upload images only.", "danger");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Result = (reader.result as string).split(",")[1];
        const newQueueItem: FileQueueItem = {
          id: `${Date.now()}-${file.name.length}-${currentFiles.length}`,
          name: file.name,
          type: file.type,
          size: file.size,
          src: URL.createObjectURL(file),
          base64: base64Result
        };
        setCurrentFiles((prev) => [...prev, newQueueItem]);
      };
      reader.readAsDataURL(file);
    });
  };

  const clearFileQueueByRef = () => {
    currentFiles.forEach((f) => URL.revokeObjectURL(f.src));
    setCurrentFiles([]);
  };

  const removeFileFromQueue = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const targeted = currentFiles.find((f) => f.id === id);
    if (targeted) {
      URL.revokeObjectURL(targeted.src);
    }
    setCurrentFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Connection mode mapping
  const isLiveMode = !!apiKey;

  // Save Config Settings
  const handleSaveSettings = () => {
    localStorage.setItem("sherlock_gemini_key", apiKey.trim());
    localStorage.setItem("sherlock_gemini_model", model);
    setSettingsOpen(false);
    showToast(`Configuration updated. Live: ${isLiveMode ? "ACTIVE" : "INACTIVE"}`);
  };

  const handleClearSettings = () => {
    setApiKey("");
    localStorage.removeItem("sherlock_gemini_key");
    setSettingsOpen(false);
    showToast("API keys cleared. Switched to Simulation Mode.", "info");
  };

  // Staggered log simulator engine
  const runVisualMeshSimulation = async () => {
    const pad = (n: number) => String(n).padStart(2, "0");
    const writeLog = (text: string, type: "info" | "success" | "warning" = "info") => {
      const now = new Date();
      const timeStr = `[${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}]`;
      setLogs((prev) => [
        ...prev, 
        { 
          id: `${Date.now()}-${text.length}-${prev.length}`, 
          timestamp: timeStr, 
          text, 
          type 
        }
      ]);
    };

    setLogs([]);
    writeLog("Initializing visual analysis matrix...", "info");
    await new Promise((r) => setTimeout(r, 450));

    if (activePresetKey) {
      writeLog(`Preset profile active: [${PRESETS[activePresetKey].name.toUpperCase()}]`, "info");
      await new Promise((r) => setTimeout(r, 550));
    } else {
      writeLog(`Raw media packets queued: ${currentFiles.length} file(s)`, "info");
      await new Promise((r) => setTimeout(r, 650));
    }

    writeLog("Executing structural alignment and facial mesh grid overlay...", "info");
    await new Promise((r) => setTimeout(r, 800));
    writeLog("Facial mesh locked. Isolating ocular coordinates...", "success");
    await new Promise((r) => setTimeout(r, 600));

    writeLog("Ocular assessment: scanning iris contact vectors & blink suppression values...", "info");
    await new Promise((r) => setTimeout(r, 700));

    writeLog("Postural assessment: calculating spinal load bearing, shoulder leveling asymmetry...", "info");
    await new Promise((r) => setTimeout(r, 850));

    writeLog("Textile scan: calibrating weave structural value, brand markers, crease indicators...", "info");
    await new Promise((r) => setTimeout(r, 650));

    writeLog("Environmental audit: isolating backdrop noise, layout constraints, lighting sources...", "info");
    await new Promise((r) => setTimeout(r, 700));

    if (prepModeEnabled && prepText.trim()) {
      writeLog("Dossier merger: loading auxiliary profile vectors and context text blocks...", "info");
      await new Promise((r) => setTimeout(r, 800));
      writeLog("Dossier merged. Correlating text sentiment against visual projections...", "success");
      await new Promise((r) => setTimeout(r, 600));
    }

    writeLog("Generating cognitive matrix synthesis...", "info");
    await new Promise((r) => setTimeout(r, 600));

    // Execution Core: Live vs Simulated
    if (isLiveMode && currentFiles.length > 0) {
      writeLog(`Contacting server interface via Gemini: ${model}...`, "info");
      try {
        const payload = {
          images: currentFiles.map((f) => ({ data: f.base64, mimeType: f.type })),
          prepText: prepModeEnabled ? prepText : "",
          model: model,
          customApiKey: apiKey
        };

        const res = await fetch("/api/gemini/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || `HTTP ${res.status}`);
        }

        const data = await res.json();
        
        // Add random scanning indicators ID
        const finalReport = {
          ...data,
          name: currentFiles[0].name.replace(/\.[^/.]+$/, ""),
          meta: `Custom Scan ID: SH-${89241 + (currentFiles.length * 37) % 100} • ${currentFiles.length} Target Angle(s)`
        };

        setReportData(finalReport);
        writeLog("Gemini AI analysis unified. Dossier compiled successfully.", "success");
        await new Promise((r) => setTimeout(r, 600));
        setCurrentView("dossier");
      } catch (err: any) {
        console.error(err);
        writeLog(`Gemini synthesis failed: ${err?.message || "Visual upload error"}. Fallback activated.`, "warning");
        await new Promise((r) => setTimeout(r, 1200));
        triggerHeuristicFallback(writeLog);
      }
    } else {
      // Simulation or Preset engine fallback
      triggerHeuristicFallback(writeLog);
    }
  };

  const triggerHeuristicFallback = async (writeLog: (t: string, type?: any) => void) => {
    writeLog("Running local heuristic engine (Simulation Mode)...", "info");
    await new Promise((r) => setTimeout(r, 1400));

    let finalReport: any = null;
    if (activePresetKey) {
      // Use active preset directly, merge bio optionally
      const base = PRESETS[activePresetKey];
      finalReport = { ...base };
      if (prepModeEnabled && prepText.trim()) {
        finalReport.firstImpression += ` Integrated context: "${prepText.substring(0, 80)}...". Auxiliary bio points validate our findings.`;
      }
    } else {
      // Custom files without real API key: dynamically map a mock preset
      const nameSeed = currentFiles[0]?.name.toLowerCase() || "target.jpg";
      let type: keyof typeof PRESETS = "vc";

      if (nameSeed.includes("woman") || nameSeed.includes("girl") || nameSeed.includes("recruiter") || nameSeed.includes("hr")) {
        type = "recruiter";
      } else if (nameSeed.includes("founder") || nameSeed.includes("dev") || nameSeed.includes("code") || nameSeed.includes("tech")) {
        type = "founder";
      } else if (nameSeed.includes("negotiator") || nameSeed.includes("suit") || nameSeed.includes("deal")) {
        type = "negotiator";
      } else {
        const arr: (keyof typeof PRESETS)[] = ["vc", "negotiator", "founder", "recruiter"];
        type = arr[nameSeed.length % 4];
      }

      const match = PRESETS[type];
      finalReport = {
        ...match,
        name: `Scanned Target: ${currentFiles[0] ? currentFiles[0].name : "Angle_Scan_01.jpg"}`,
        meta: `Custom Scan ID: SH-${89241 + (currentFiles.length * 37) % 100} • ${currentFiles.length} File(s) Analyzed`
      };

      if (prepModeEnabled && prepText.trim()) {
        finalReport.firstImpression += ` [Prep Matrix Analysis]: Textual cues match a highly ${match.decisionStyle} operations mapping segment.`;
      }
    }

    setReportData(finalReport);
    writeLog("Simulation compilation finished. Dossier layout build complete.", "success");
    await new Promise((r) => setTimeout(r, 600));
    setCurrentView("dossier");
  };

  const startAnalysisWorkflow = () => {
    setCurrentView("loading");
    runVisualMeshSimulation();
  };

  const resetToHome = () => {
    clearFileQueueByRef();
    setActivePresetKey(null);
    setPrepModeEnabled(false);
    setPrepText("");
    setReportData(null);
    setCurrentView("home");
    setActiveTab("briefing");
  };

  // Convert report data to elegant Markdown download blob
  const handleExportMarkdown = () => {
    if (!reportData) return;

    const data = reportData;
    const md = `# Restricted Briefing Dossier: ${data.name || "Target Profile"}
**Generated on:** ${new Date().toLocaleDateString()}
**Scan Source:** Sherlock Visual Intelligence Analyst

---

## I. Executive Briefing
### First Impression (3 Seconds)
> ${data.firstImpression}

### Sherlock's Verdict
${data.verdict}

---

## II. Visual Observations
### Face & Expressions
${(data.observations?.face || []).map((i: string) => `- ${i}`).join("\n")}

### Posture & Body Language
${(data.observations?.posture || []).map((i: string) => `- ${i}`).join("\n")}

### Clothing & Grooming
${(data.observations?.clothing || []).map((i: string) => `- ${i}`).join("\n")}

### Hands & Gestures
${(data.observations?.hands || []).map((i: string) => `- ${i}`).join("\n")}

### Accessories & Objects
${(data.observations?.accessories || []).map((i: string) => `- ${i}`).join("\n")}

### Environment & Context
${(data.observations?.environment || []).map((i: string) => `- ${i}`).join("\n")}

---

## III. Personality Profile
- **Dominant Personality Type:** ${data.personalityType}
- **Confidence Rating:** ${data.confidence} / 10
- **Authenticity Rating:** ${data.authenticity}%
- **Ego & Status Orientation:** ${data.ego}
- **Decision-Making Style:** ${data.decisionStyle}
- **Stress Indicators:** ${data.stressIndicators}

---

## IV. Communication Style
- **Conversational Architecture:** ${data.commStyle}
- **Positive Triggers:** ${data.commPositive}
- **Defensive Triggers:** ${data.commNegative}
- **Rapport Opening Script:** 
  > *" ${data.openingLine} "*

---

## V. Sales & Negotiation Intelligence
- **Motivations:** ${data.motivatorsText}
- **Objection Pattern:** ${data.objectionStyle}
- **Power Dynamics Preference:** ${data.powerDynamics}
- **Closing Strategy:** ${data.closingStrategy}
- **[CRITICAL WARNING] Never Say/Do:** **${data.neverDo}**

---

## VI. The Projection Gap
### The Mask (What They Project)
${data.projection}

### The Reveal (What Visuals Tell Us)
${data.reveal}

---
*CONFIDENTIAL - FOR INTERNAL PROFESSIONAL USE ONLY*
`;

    const blob = new Blob([md], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const formattedName = (data.name || "Target").replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "");
    link.download = `Sherlock_Dossier_${formattedName}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Markdown dossier exported.");
  };

  const handlePrintDossier = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // --------------------------------------------------------------------------
  // RENDER CORNER
  // --------------------------------------------------------------------------

  return (
    <div className="relative min-h-screen text-[#f1f5f9] select-none">
      {/* Stars Backdrop effect */}
      <div className="stars-container">
        {stars.map((star) => (
          <div
            key={star.id}
            style={{
              position: "absolute",
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              backgroundColor: star.color,
              opacity: star.opacity,
              borderRadius: "50%",
              animation: `pulse 3s infinite ease-in-out`,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Floating Alerts Container */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3 rounded-lg border backdrop-blur-xl shadow-2xl ${
              toastMessage.type === "danger"
                ? "bg-slate-950/95 border-red-500/30 text-red-200 border-l-[4px] border-l-red-500"
                : "bg-slate-950/95 border-amber-500/20 text-amber-100 border-l-[4px] border-l-[#c5a880]"
            } min-w-[280px] max-w-sm`}
          >
            {toastMessage.type === "danger" ? (
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
            ) : (
              <Sparkle className="w-5 h-5 text-[#c5a880] shrink-0" />
            )}
            <p className="text-xs font-semibold">{toastMessage.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------- TOP NAVBAR HEADER ----------------- */}
      <header className="no-print app-header flex justify-between items-center px-6 py-4 border-b border-white/5 bg-[#080c14]/80 backdrop-blur-md sticky top-0 z-[100]">
        <div className="header-logo flex items-center gap-3 select-none">
          <svg className="logo-icon text-[#c5a880]" viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <div className="logo-text flex flex-col">
            <span className="logo-title font-title font-black text-xl tracking-[0.12em] bg-gradient-to-r from-white to-[#c5a880] bg-clip-text text-transparent leading-none">SHERLOCK</span>
            <span className="logo-subtitle font-mono text-[0.62rem] tracking-[0.25em] text-slate-400">VISUAL INTELLIGENCE</span>
          </div>
        </div>
        
        <div className="header-controls flex items-center gap-4">
          <div 
            onClick={() => setSettingsOpen(true)}
            className={`connection-status badge flex items-center gap-2 px-3 py-1.5 rounded-md text-[0.72rem] font-mono border cursor-pointer select-none transition-all duration-300 ${
              isLiveMode 
                ? "bg-[#c5a880]/5 border-[#c5a880]/30 text-[#c5a880] hover:bg-[#c5a880]/10" 
                : "bg-cyan-500/5 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full bg-currentColor animate-pulse`} />
            <span className="font-semibold uppercase truncate max-w-[200px]">
              {isLiveMode ? `LIVE: ${model.toUpperCase()}` : "SIMULATION MODE"}
            </span>
          </div>
          
          <button 
            onClick={() => setSettingsOpen(true)}
            className="flex items-center justify-center border border-white/10 text-slate-400 hover:text-white w-9 h-9 rounded-md bg-white/2 hover:bg-white/5 hover:border-white/20 transition-all duration-200 shadow-lg"
            title="Configure System Profile"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ----------------- PRIMARY MAIN CONTAINER ----------------- */}
      <main className="main-content max-w-6xl mx-auto px-4 py-10 md:py-16">
        
        {/* ==========================================================================
            VIEW 1: LANDING & UPLOADS MESH
            ========================================================================== */}
        {currentView === "home" && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-16"
          >
            {/* Hero details */}
            <div className="hero-section text-center max-w-3xl mx-auto space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="hero-title font-title text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-[#c5a880] to-white bg-clip-text text-transparent leading-tight"
              >
                Observe First. Conclude Second.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="hero-desc text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
              >
                Extract cold, actionable psychological data from visual markers alone. Read posture, expressions, grooming, and clothing to gain an absolute edge in negotiations, sales, and hiring.
              </motion.p>
            </div>

            {/* Presets Grid Panel */}
            <div className="preset-container space-y-5">
              <h2 className="section-title font-title text-xs tracking-[0.14em] uppercase text-[#c5a880] border-b border-[#c5a880]/10 pb-2">
                Select an Intelligence Preset
              </h2>
              <div className="presets-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(Object.keys(PRESETS) as Array<keyof typeof PRESETS>).map((key) => {
                  const preset = PRESETS[key];
                  const isSelected = activePresetKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleSelectPreset(key)}
                      className={`preset-card glass-card flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 transform select-none relative overflow-hidden group ${
                        isSelected 
                          ? "border-[#c5a880] bg-[#c5a880]/10 shadow-[0_0_20px_rgba(197,168,128,0.15)] scale-[1.01]" 
                          : "border-white/5 hover:border-[#c5a880]/60 hover:bg-white/5 hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="preset-avatar-wrapper w-10 h-10 rounded-full border border-[#c5a880]/40 overflow-hidden flex-shrink-0 bg-slate-900/40 relative">
                        <div className="w-full h-full flex items-center justify-center text-lg filter grayscale opacity-85 group-hover:scale-105 transition-transform duration-300">
                          {key === "vc" ? "👔" : key === "negotiator" ? "💼" : key === "founder" ? "👓" : "🧠"}
                        </div>
                      </div>
                      <div className="preset-info min-w-0">
                        <h3 className="text-sm font-semibold text-white truncate">{preset.name.split(" (")[0]}</h3>
                        <p className="text-[0.68rem] text-slate-400 truncate">{preset.meta.split(" • ")[0] || preset.meta}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drag Drop & New Scan Portal */}
            <div className="upload-container glass-card p-6 md:p-8 rounded-2xl max-w-4xl mx-auto space-y-8 bg-slate-950/40 border border-white/5">
              <h2 className="section-title font-title text-[0.8rem] tracking-[0.14em] uppercase text-[#c5a880] text-center">
                Analyze a New Target
              </h2>

              <div 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files) processFiles(e.dataTransfer.files);
                }}
                className="drop-zone border-2 border-dashed border-white/10 hover:border-cyan-500/50 rounded-xl p-8 text-center bg-black/20 hover:bg-cyan-500/2 cursor-pointer transition-all duration-300 group"
              >
                <div className="drop-zone-content flex flex-col items-center space-y-3">
                  <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
                  <h3 className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">Drag & drop target photos here</h3>
                  <p className="upload-hint text-xs text-slate-500">Upload 1 to 5 high-resolution closeups (JPEG, PNG, WebP)</p>
                  <button className="btn mt-3 px-4 py-2 bg-white/5 border border-white/10 rounded-md text-xs font-semibold hover:bg-white/10 hover:border-white/20 text-[#f1f5f9]">
                    Browse Local Files
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={(e) => e.target.files && processFiles(e.target.files)}
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                  />
                </div>
              </div>

              {/* Upload Previews Gallery */}
              {currentFiles.length > 0 && (
                <div className="preview-gallery pt-6 border-t border-white/5 space-y-4">
                  <div className="gallery-header flex justify-between items-center text-xs">
                    <h4 className="font-mono text-slate-300 tracking-wider">TARGET MEDIA QUEUE ({currentFiles.length}/5)</h4>
                    <button onClick={clearFileQueueByRef} className="text-red-400 hover:text-red-300 hover:underline">
                      Clear All
                    </button>
                  </div>
                  <div className="preview-grid grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {currentFiles.map((file) => (
                      <div key={file.id} className="preview-item relative aspect-square rounded-lg overflow-hidden border border-white/5 bg-slate-900 group">
                        <img src={file.src} alt={file.name} className="preview-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <button 
                          onClick={(e) => removeFileFromQueue(file.id, e)}
                          className="btn-remove-preview absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-slate-950/80 border border-white/10 text-slate-300 hover:bg-red-500 hover:text-white flex items-center justify-center text-xs transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="scan-line-thumbnail absolute left-0 right-0 h-[2px] bg-cyan-400 animate-scan pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Auxiliary Biography Toggle */}
              <div className="meeting-prep-container p-4 rounded-xl bg-white/2 border border-white/5 space-y-4">
                <div className="prep-toggle-wrapper flex items-start gap-4">
                  <label className="switch-container relative inline-block w-11 h-6 shrink-0 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={prepModeEnabled}
                      onChange={(e) => setPrepModeEnabled(e.target.checked)}
                      className="peer opacity-0 w-0 h-0" 
                    />
                    <span className="slider absolute top-0 left-0 right-0 bottom-0 bg-white/10 peer-checked:bg-cyan-500/10 peer-checked:border-cyan-400 rounded-full border border-white/5 transition-all duration-300 before:absolute before:content-[''] before:h-4 before:w-4 before:left-1 before:bottom-0.7 peer-checked:before:translate-x-5 before:bg-slate-400 peer-checked:before:bg-cyan-400 before:rounded-full before:transition-all before:duration-300"></span>
                  </label>
                  <div className="prep-label-details">
                    <span className="prep-title text-sm font-semibold text-white">Enable Advanced Meeting Prep Mode</span>
                    <span className="prep-subtitle text-xs text-slate-400">Incorporate secondary background logs, dossiers, or LinkedIn Bios for a deeper visual-behavioral fusion.</span>
                  </div>
                </div>
                
                {prepModeEnabled && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="prep-input-wrapper space-y-2"
                  >
                    <label className="input-label text-[0.7rem] uppercase tracking-wider text-slate-400 font-mono">
                      LinkedIn Bios / Background Dossier Block
                    </label>
                    <textarea 
                      value={prepText}
                      onChange={(e) => setPrepText(e.target.value)}
                      className="textarea-input w-full p-3 rounded-lg border border-white/5 bg-slate-900/60 focus:border-cyan-500 hover:border-white/10 outline-none text-sm text-[#f1f5f9] placeholder:text-slate-600 transition-colors leading-relaxed" 
                      placeholder="Paste target's LinkedIn 'About' section, official bio, resume parameters, or a brief detail of your strategic intent with them..."
                      rows={4}
                    />
                  </motion.div>
                )}
              </div>

              {/* Begin Trigger controls */}
              <div className="action-btn-wrapper pt-4">
                <button 
                  onClick={startAnalysisWorkflow}
                  disabled={!activePresetKey && currentFiles.length === 0}
                  className="btn btn-primary btn-glow w-full md:max-w-md mx-auto py-3.5 rounded-xl font-title text-base tracking-[0.12em] font-bold shadow-lg"
                >
                  <span>BEGIN INTELLIGENCE SCAN</span>
                  <ArrowRight className="w-5 h-5 ml-1 inline" />
                </button>
              </div>

            </div>
          </motion.section>
        )}

        {/* ==========================================================================
            VIEW 2: LOADING SCANNING STATE
            ========================================================================== */}
        {currentView === "loading" && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[50vh] max-w-2xl mx-auto space-y-10"
          >
            <div className="radar-box relative w-48 h-48 flex items-center justify-center">
              {/* Spinning Conic Laser Overlay */}
              <div className="radar-scan absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(0,242,254,0.15)_0deg,rgba(0,242,254,0.05)_90deg,transparent_180deg)] animate-rotate duration-1000 z-10" />
              
              {/* Ring elements */}
              <div className="radar-circle-1 absolute w-full h-full border border-cyan-500/10 rounded-full animate-pulse-slow" />
              <div className="radar-circle-2 absolute w-2/3 h-2/3 border border-cyan-500/10 rounded-full" />
              <div className="radar-circle-3 absolute w-1/3 h-1/3 border border-cyan-500/15 rounded-full" />
              
              {/* Target glowing nucleus */}
              <div className="radar-center w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(0,242,254,0.8)] z-20" />
              
              {/* Dynamic preview block */}
              <div className="scanning-media-holder absolute w-24 h-24 rounded-lg overflow-hidden border border-cyan-400/30 z-[5] bg-slate-950 flex items-center justify-center shadow-lg">
                {activePresetKey ? (
                  <span className="text-4xl filter grayscale select-none">🕵️‍♂️</span>
                ) : currentFiles[0] ? (
                  <img src={currentFiles[0].src} className="w-full h-full object-cover filter brightness-[0.7] sepia-[20%] opacity-80" alt="Scanned closeup" />
                ) : (
                  <span className="text-4xl filter grayscale select-none">🕵️‍♂️</span>
                )}
                {/* Visual scan vertical line wrapper */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_10px_rgba(0,242,254,0.1)] animate-scan" style={{ animationDuration: "2s" }} />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="loading-title font-title text-xl font-bold tracking-widest text-[#f1f5f9]">
                Extracting Posture & Ocular Cues
              </h2>
              <p className="loading-subtitle text-xs text-slate-400 tracking-wider">
                Decrypting biological markers and behavioral projection patterns...
              </p>
            </div>

            {/* Custom Terminal Console Screen */}
            <div className="terminal-card glass-card w-full rounded-xl overflow-hidden border border-white/5 shadow-2xl">
              <div className="terminal-header px-4 py-2.5 bg-slate-950/80 border-b border-white/5 flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
                <span className="terminal-title font-mono text-[0.62rem] text-slate-500 tracking-widest ml-auto">
                  SHERLOCK_ENGINE_V3.8 // CONSOLE
                </span>
              </div>
              <div className="terminal-body h-48 p-4 bg-black/95 font-mono text-[0.74rem] text-sky-400 overflow-y-auto flex flex-col gap-2 scrollbar-none select-text">
                {logs.map((log) => (
                  <div key={log.id} className="log-line flex items-baseline gap-3">
                    <span className="log-timestamp text-slate-600 select-none shrink-0">{log.timestamp}</span>
                    <span className={`leading-relaxed ${
                      log.type === "success" 
                        ? "text-emerald-400" 
                        : log.type === "warning" 
                        ? "text-rose-400 font-semibold" 
                        : "text-sky-300"
                    }`}>
                      {log.text}
                    </span>
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
            </div>
          </motion.section>
        )}

        {/* ==========================================================================
            VIEW 3: DOSSIER COMPLETED REPORT VIEW
            ========================================================================== */}
        {currentView === "dossier" && reportData && (
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 select-text"
          >
            {/* Dossier Restricted Header Area */}
            <div className="dossier-header-bar flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-6">
              <div className="dossier-title-area space-y-1.5 text-left">
                <span className="dossier-tag inline-block uppercase text-[0.64rem] font-bold tracking-[0.2em] px-2.5 py-1 bg-red-500/10 border border-red-500/20 text-red-400 rounded">
                  RESTRICTED DOSSIER
                </span>
                <h2 className="dossier-subject-name font-title text-3xl font-bold tracking-wide text-white">
                  {reportData.name}
                </h2>
                <p className="dossier-meta text-xs text-slate-400">
                  {reportData.meta}
                </p>
              </div>
              
              <div className="no-print dossier-actions flex flex-wrap gap-2.5 w-full md:w-auto shrink-0 select-none">
                <button 
                  onClick={handleExportMarkdown}
                  className="btn btn-secondary flex-1 md:flex-none px-4 py-2 hover:text-[#c5a880] hover:border-[#c5a880]/30 rounded-lg text-xs font-semibold gap-2 border border-white/5 bg-slate-950/40 hover:bg-[#c5a880]/5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export MD</span>
                </button>
                <button 
                  onClick={handlePrintDossier}
                  className="btn btn-secondary flex-1 md:flex-none px-4 py-2 hover:text-[#c5a880] hover:border-[#c5a880]/30 rounded-lg text-xs font-semibold gap-2 border border-white/5 bg-slate-950/40 hover:bg-[#c5a880]/5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Briefing</span>
                </button>
                <button 
                  onClick={resetToHome}
                  className="btn btn-primary flex-1 md:flex-none px-4 py-2 hover:shadow-[0_0_15px_rgba(197,168,128,0.25)] rounded-lg text-xs font-semibold gap-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Scan</span>
                </button>
              </div>
            </div>

            {/* Dossier Snapshot Images Grid & Circular Summary Metrics Card */}
            <div className="no-print-tabs dossier-snapshot grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              
              {/* Left Column: Thumbnails queue visual indicators */}
              <div className="snapshot-photos flex gap-3 h-24 overflow-x-auto py-1 items-center bg-slate-950/30 rounded-xl px-4 border border-white/5 scrollbar-none shrink-0">
                {currentFiles.length > 0 ? (
                  currentFiles.map((file) => (
                    <div key={file.id} className="snapshot-thumb w-16 h-16 rounded-md overflow-hidden border border-white/10 hover:border-[#c5a880]/40 shrink-0 shadow-lg">
                      <img src={file.src} alt="Sub-angle camera feed" className="w-full h-full object-cover" />
                    </div>
                  ))
                ) : (
                  <div className="snapshot-thumb w-16 h-16 rounded-md overflow-hidden border border-white/5 bg-slate-900/60 shrink-0 flex items-center justify-center shadow-lg">
                    <span className="text-2xl filter grayscale select-none">🕵️‍♂️</span>
                  </div>
                )}
              </div>

              {/* Right Column: Score Summary */}
              <div className="snapshot-summary flex justify-end">
                <div className="dossier-score-card flex items-center gap-6 p-4 rounded-xl border border-white/5 bg-slate-950/40 backdrop-blur-xl w-full">
                  <div className="score-circle w-20 h-20 rounded-full border-2 border-cyan-400 bg-cyan-400/5 shadow-[0_0_12px_rgba(0,242,254,0.12)] flex flex-col items-center justify-center shrink-0 select-none">
                    <span className="score-num font-mono text-[#00f2fe] text-[1.45rem] font-bold leading-none">
                      {reportData.authenticity}
                    </span>
                    <span className="score-lbl text-[0.52rem] text-slate-400 tracking-[0.08em] uppercase">
                      AUTHENTICITY
                    </span>
                  </div>
                  
                  <div className="score-details-row flex-grow flex flex-col gap-1.5 text-xs text-left min-w-0">
                    <div className="score-detail-item flex justify-between border-b border-dashed border-white/5 pb-1">
                      <span className="detail-label text-slate-400 truncate">Confidence Curve</span>
                      <span className="detail-value text-cyan-400 font-semibold">{reportData.confidence} / 10</span>
                    </div>
                    <div className="score-detail-item flex justify-between border-b border-dashed border-white/5 pb-1">
                      <span className="detail-label text-slate-400 truncate">Ego Status Profile</span>
                      <span className="detail-value text-[#c5a880] font-semibold">{reportData.ego}</span>
                    </div>
                    <div className="score-detail-item flex justify-between pt-0.5">
                      <span className="detail-label text-slate-400 truncate">Decision Vector</span>
                      <span className="detail-value text-slate-200 capitalize font-semibold">{reportData.decisionStyle}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Tap Navigation Headers */}
            <div className="no-print-tabs dossier-tabs-nav flex gap-1 border-b border-white/5 overflow-x-auto scrollbar-none select-none">
              {[
                { id: "briefing", label: "1. Executive Briefing" },
                { id: "observations", label: "2. Visual Evidence" },
                { id: "personality", label: "3. Psychological Profile" },
                { id: "communication", label: "4. Communication Map" },
                { id: "negotiation", label: "5. High-Stakes Strategy" },
                { id: "gap", label: "6. The Projection Gap" }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`tab-link px-4 py-3 bg-none text-xs tracking-wider border-b-2 hover:text-white font-semibold whitespace-nowrap transition-all duration-200 ${
                      isActive 
                        ? "text-[#c5a880] border-[#c5a880] bg-white/2" 
                        : "text-slate-400 border-transparent"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Dossier Interactive Content Canvas */}
            <div className="no-print dossier-panels">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.18 }}
                  className="tab-container"
                >
                  {/* TAB 1: EXECUTIVE BRIEFING */}
                  {activeTab === "briefing" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
                      <div className="glass-card p-6 rounded-xl border border-white/5 space-y-3.5 text-left bg-slate-950/20">
                        <h3 className="panel-section-title font-title text-[#c5a880] text-xs font-semibold uppercase tracking-widest border-b border-white/5 pb-1.5">
                          First Impression (3 Seconds)
                        </h3>
                        <p className="text-large text-quote border-l-2 border-[#c5a880] pl-4 text-emerald-100 text-sm md:text-[0.95rem] italic leading-relaxed">
                          {reportData.firstImpression}
                        </p>
                      </div>
                      
                      <div className="glass-card p-6 rounded-xl border border-cyan-500/25 shadow-[0_0_20px_rgba(0,242,254,0.04)] hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(0,242,254,0.06)] bg-slate-950/25 space-y-3.5 transition-all text-left">
                        <h3 className="panel-section-title text-cyan-400 font-title text-xs font-semibold uppercase tracking-widest border-b border-cyan-500/10 pb-1.5">
                          Sherlock&apos;s Verdict
                        </h3>
                        <p className="verdict-content text-slate-300 text-xs md:text-sm leading-relaxed">
                          {reportData.verdict}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: VISUAL EVIDENCE LISTING */}
                  {activeTab === "observations" && (
                    <div className="observations-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
                      {[
                        { title: "Face & Expressions", icon: "👁️", list: reportData.observations?.face },
                        { title: "Posture & Body Language", icon: "🧍", list: reportData.observations?.posture },
                        { title: "Clothing & Grooming", icon: "👔", list: reportData.observations?.clothing },
                        { title: "Hands & Gestures", icon: "🤝", list: reportData.observations?.hands },
                        { title: "Accessories & Objects", icon: "⌚", list: reportData.observations?.accessories },
                        { title: "Environment & Context", icon: "🏢", list: reportData.observations?.environment }
                      ].map((item, idx) => (
                        <div key={idx} className="observation-block glass-card p-5 rounded-xl border border-white/5 bg-slate-950/30 flex flex-col gap-4">
                          <div className="block-header flex items-center gap-2 border-b border-white/5 pb-2">
                            <span className="text-base select-none">{item.icon}</span>
                            <h4 className="font-title text-xs font-bold uppercase tracking-widest text-[#f1f5f9]">{item.title}</h4>
                          </div>
                          
                          <ul className="obs-list list-none space-y-2 flex-grow">
                            {item.list && item.list.length > 0 ? (
                              item.list.map((obs: string, oIdx: number) => (
                                <li key={oIdx} className="relative pl-4 text-xs text-slate-400 leading-relaxed before:absolute before:left-0 before:top-0 before:content-['▪'] before:text-[#c5a880]">
                                  {obs}
                                </li>
                              ))
                            ) : (
                              <li className="text-xs text-slate-500 pl-4 relative before:absolute before:left-0 before:top-0 before:content-['▪'] before:text-[#c5a880] italic">
                                No visual markers established.
                              </li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB 3: PSYCHOLOGICAL PROFILE */}
                  {activeTab === "personality" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-left">
                      <div className="glass-card p-6 rounded-xl border border-white/5 bg-slate-950/30 space-y-5">
                        <h3 className="panel-section-title font-title text-[#c5a880] text-xs font-bold uppercase tracking-widest border-b border-white/5 pb-2">
                          Core Personality Structure
                        </h3>
                        
                        <div className="space-y-1">
                          <h4 className="sub-block-title font-title text-[0.72rem] text-[#c5a880] tracking-wider uppercase font-semibold">
                            Dominant Personality Type
                          </h4>
                          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{reportData.personalityType}</p>
                        </div>

                        <div className="space-y-1">
                          <h4 className="sub-block-title font-title text-[0.72rem] text-[#c5a880] tracking-wider uppercase font-semibold">
                            Stress & Tension Indicators
                          </h4>
                          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{reportData.stressIndicators}</p>
                        </div>
                      </div>

                      {/* Slider Metrics Card Container */}
                      <div className="glass-card p-6 rounded-xl border border-white/5 bg-slate-950/30 space-y-6">
                        <h3 className="panel-section-title font-title text-slate-200 text-xs font-bold uppercase tracking-widest border-b border-white/5 pb-2">
                          Metrics & Dynamic Indicators
                        </h3>
                        
                        <div className="metric-slider-group space-y-2">
                          <div className="metric-slider-label flex justify-between text-xs font-semibold">
                            <span>Confidence Coefficient</span>
                            <span className="value-highlight font-mono text-cyan-400">{reportData.confidence} / 10</span>
                          </div>
                          <div className="slider-bar-container w-full h-2 rounded-full border border-white/5 bg-slate-900/40 relative overflow-hidden">
                            <div 
                              className="slider-bar-fill h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-1000" 
                              style={{ width: `${(reportData.confidence || 8) * 10}%` }}
                            />
                          </div>
                          <span className="metric-scale-desc text-[0.68rem] text-slate-500">1 = Deep Insecurity • 10 = Imperious Certainty</span>
                        </div>

                        <div className="metric-slider-group space-y-2">
                          <div className="metric-slider-label flex justify-between text-xs font-semibold">
                            <span>Projected Authenticity Score</span>
                            <span className="value-highlight font-mono text-cyan-400">{reportData.authenticity}%</span>
                          </div>
                          <div className="slider-bar-container w-full h-2 rounded-full border border-white/5 bg-slate-900/40 relative overflow-hidden">
                            <div 
                              className="slider-bar-fill h-full rounded-full bg-gradient-to-r from-amber-600 to-[#c5a880] transition-all duration-1000" 
                              style={{ width: `${reportData.authenticity || 75}%` }}
                            />
                          </div>
                          <span className="metric-scale-desc text-[0.68rem] text-slate-500">0% = Pure Performance/Facade • 100% = Fully Congruent</span>
                        </div>

                        <div className="metric-slider-group space-y-2">
                          <div className="metric-slider-label flex justify-between text-xs font-semibold">
                            <span>Ego & Status Orientation</span>
                            <span className="value-highlight font-mono text-cyan-400">{reportData.ego}</span>
                          </div>
                          <div className="slider-bar-container w-full h-2 rounded-full border border-white/5 bg-slate-900/40 relative overflow-hidden">
                            <div 
                              className="slider-bar-fill h-full rounded-full bg-slate-600 transition-all duration-1000" 
                              style={{ width: reportData.ego === "High" ? "85%" : reportData.ego === "Medium" ? "60%" : "30%" }}
                            />
                          </div>
                          <span className="metric-scale-desc text-[0.68rem] text-slate-500">Low = Cooperative/Egoless • High = Demands Deference</span>
                        </div>

                        <div className="metric-slider-group space-y-2">
                          <div className="metric-slider-label flex justify-between text-xs font-semibold">
                            <span>Decision-Making Vector</span>
                            <span className="value-highlight font-mono text-cyan-400 capitalize">{reportData.decisionStyle}</span>
                          </div>
                          <div className="decision-sectors grid grid-cols-4 gap-1.5 pt-1 select-none">
                            {["analytical", "intuitive", "social", "cautious"].map((style) => {
                              const matchDecision = style === String(reportData.decisionStyle).toLowerCase();
                              return (
                                <div 
                                  key={style}
                                  className={`sector text-center py-2.5 rounded-lg border text-[0.68rem] font-bold tracking-wide transition-all ${
                                    matchDecision 
                                      ? "bg-cyan-500/5 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.06)]" 
                                      : "bg-white/2 border-white/5 text-slate-500"
                                  }`}
                                >
                                  {style}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* TAB 4: COMMUNICATION ENGINE MAP */}
                  {activeTab === "communication" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-left">
                      <div className="glass-card p-6 rounded-xl border border-white/5 bg-slate-950/30 space-y-4">
                        <h3 className="panel-section-title font-title text-slate-200 text-xs font-bold uppercase tracking-widest border-b border-white/5 pb-2">
                          Conversational Architecture
                        </h3>
                        
                        <div className="space-y-1">
                          <h4 className="sub-block-title font-title text-[0.72rem] text-[#c5a880] tracking-wider uppercase font-semibold">
                            Preferred Conversation Style
                          </h4>
                          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{reportData.commStyle}</p>
                        </div>

                        <div className="space-y-1">
                          <h4 className="sub-block-title font-title text-[0.72rem] text-[#c5a880] tracking-wider uppercase font-semibold">
                            Receptive To (Positive Triggers)
                          </h4>
                          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{reportData.commPositive}</p>
                        </div>

                        <div className="space-y-1">
                          <h4 className="sub-block-title font-title text-[0.72rem] text-[#c5a880] tracking-wider uppercase font-semibold">
                            Defensiveness & Resistance Triggers
                          </h4>
                          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{reportData.commNegative}</p>
                        </div>
                      </div>

                      {/* Highlighted Script Entry Card */}
                      <div className="glass-card p-6 rounded-xl border border-cyan-500/25 bg-gradient-to-br from-cyan-950/20 to-slate-950/30 space-y-4 shadow-[0_0_20px_rgba(0,242,254,0.03)] hover:border-cyan-500/45 transition-colors">
                        <h3 className="panel-section-title text-cyan-400 font-title text-xs font-bold uppercase tracking-widest border-b border-cyan-500/10 pb-2">
                          Rapport Ignition Strategy
                        </h3>
                        <p className="description-text text-xs text-slate-400">
                          Deploy this tailored introductory script immediately inside the first minute to lower cognitive defenses and command natural credibility.
                        </p>
                        
                        <div className="quote-card-highlight relative bg-[#c5a880]/5 border border-[#c5a880]/20 rounded-xl p-6 pt-10 mt-2">
                          <span className="quote-icon font-title text-7xl text-[#c5a880]/10 absolute top-[-5px] left-4 leading-none select-none">“</span>
                          <p className="quote-text text-[0.95rem] md:text-base italic leading-relaxed text-slate-100 font-serif relative z-10">
                            {reportData.openingLine}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: NEGOTIATION PROTOCAL STRATEGY */}
                  {activeTab === "negotiation" && (
                    <div className="space-y-6 text-left">
                      <div className="glass-card p-6 rounded-xl border border-white/5 bg-slate-950/30 space-y-4">
                        <h3 className="panel-section-title font-title text-slate-200 text-xs font-bold uppercase tracking-widest border-b border-white/5 pb-2">
                          Core Driver & Motivators
                        </h3>
                        
                        {/* Motivators Active Badges row */}
                        <div className="motivator-grid grid grid-cols-2 sm:grid-cols-5 gap-2 select-none">
                          {["status", "security", "achievement", "connection", "control"].map((mot) => {
                            const isMatched = (reportData.motivatorsList || []).includes(mot);
                            return (
                              <div
                                key={mot}
                                className={`motivator-badge text-center py-2.5 rounded-lg border text-[0.68rem] font-bold uppercase tracking-widest transition-all ${
                                  isMatched 
                                    ? "bg-[#c5a880]/10 border-[#c5a880] text-[#c5a880] shadow-[0_0_12px_rgba(197,168,128,0.12)]" 
                                    : "bg-white/2 border-white/5 text-slate-500"
                                }`}
                              >
                                {mot}
                              </div>
                            );
                          })}
                        </div>
                        <p className="text-xs md:text-sm text-slate-300 leading-relaxed pt-2">{reportData.motivatorsText}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <div className="glass-card p-6 rounded-xl border border-white/5 bg-slate-950/30 space-y-4">
                          <div className="space-y-1">
                            <h4 className="sub-block-title font-title text-[0.72rem] text-[#c5a880] tracking-wider uppercase font-semibold">
                              Likely Objection Style
                            </h4>
                            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{reportData.objectionStyle}</p>
                          </div>
                          
                          <div className="space-y-1">
                            <h4 className="sub-block-title font-title text-[0.72rem] text-[#c5a880] tracking-wider uppercase font-semibold">
                              Power Dynamics Preference
                            </h4>
                            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{reportData.powerDynamics}</p>
                          </div>
                        </div>

                        {/* High Stake Closing Block with Critical Alert warnings */}
                        <div className="glass-card p-6 rounded-xl border border-[#c5a880]/25 bg-slate-950/30 space-y-4">
                          <div className="space-y-1">
                            <h4 className="sub-block-title font-title text-[0.72rem] text-[#c5a880] tracking-wider uppercase font-semibold">
                              Closing Protocol
                            </h4>
                            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{reportData.closingStrategy}</p>
                          </div>
                          
                          <div className="danger-box p-4 rounded-lg bg-red-500/5 border border-red-500/25 space-y-1.5 transition-colors">
                            <h5 className="danger-title font-mono text-[0.68rem] text-red-400 font-bold tracking-widest uppercase flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              CRITICAL INTERACTION WARNING
                            </h5>
                            <p className="danger-text text-xs text-slate-300 leading-relaxed">{reportData.neverDo}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 6: THE PROJECTION GAP VIEW */}
                  {activeTab === "gap" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                      
                      <div className="glass-card p-6 pt-12 rounded-xl border border-white/5 bg-slate-950/40 relative overflow-hidden group">
                        <div className="absolute top-4 left-6 text-[0.58rem] font-mono tracking-widest font-bold px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 uppercase select-none">
                          PROJECTED MASK
                        </div>
                        <h3 className="gap-title font-title text-base text-cyan-300 font-semibold tracking-wide border-b border-white/5 pb-2.5 mb-3.5">
                          What They Want You To See
                        </h3>
                        <p className="gap-text text-slate-300 text-xs md:text-sm leading-relaxed">
                          {reportData.projection}
                        </p>
                      </div>

                      <div className="glass-card p-6 pt-12 rounded-xl border border-white/5 bg-slate-950/40 relative overflow-hidden group">
                        <div className="absolute top-4 left-6 text-[0.58rem] font-mono tracking-widest font-bold px-2 py-0.5 rounded border-[#c5a880]/30 bg-[#c5a880]/5 text-[#c5a880] uppercase select-none">
                          SUBTENSION SIGNALS
                        </div>
                        <h3 className="gap-title font-title text-base text-[#c5a880] font-semibold tracking-wide border-b border-white/5 pb-2.5 mb-3.5">
                          What They Actually Reveal
                        </h3>
                        <p className="gap-text text-slate-300 text-xs md:text-sm leading-relaxed">
                          {reportData.reveal}
                        </p>
                      </div>

                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Print-Only Plain Layout (Hidden on Screen, Appears on Native Print) */}
            <div className="print-report-container pt-8 border-t border-slate-950 space-y-12 block select-text">
              <div className="border-b-[3px] border-slate-950 pb-4 flex justify-between items-end">
                <div>
                  <h1 className="font-title text-3xl font-black tracking-widest">BEHAVIORAL BRIEFING DOSSIER</h1>
                  <p className="text-xs font-mono tracking-wider text-slate-500 uppercase mt-1">RESTRICTED INTEL MATRIX BRIEF // Restrict Access</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-red-600 border border-red-600/60 px-2.5 py-1 rounded inline-block tracking-widest font-mono uppercase">RESTRICTED</span>
                </div>
              </div>

              {/* Subject Info Table block */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-stone-300 text-sm leading-relaxed">
                <p><strong>SUBJECT:</strong> {reportData.name}</p>
                <p className="text-right"><strong>DATED:</strong> {new Date().toLocaleDateString()}</p>
                <p><strong>AUTHENTICITY INDEX:</strong> {reportData.authenticity}%</p>
                <p className="text-right"><strong>ESTIMATED CONFIDENCE:</strong> {reportData.confidence} / 10</p>
                <p><strong>EGO STATUS:</strong> {reportData.ego}</p>
                <p className="text-right"><strong>DECISION MODEL:</strong> <span className="capitalize">{reportData.decisionStyle}</span></p>
              </div>

              {/* Sections mapped sequentially */}
              <div className="space-y-8 text-black">
                
                <div className="glass-card-print space-y-2 p-4 border border-stone-300 rounded">
                  <h3 className="font-title font-semibold text-sm border-b border-stone-800 pb-1 text-stone-900 uppercase tracking-widest">
                    I. EXECUTIVE SUMMARY & INITIAL BIAS
                  </h3>
                  <p className="italic text-stone-800 text-xs md:text-sm pl-4 border-l border-stone-500"><strong>First Impression:</strong> {reportData.firstImpression}</p>
                  <p className="text-xs md:text-sm pt-2"><strong>Verdict Overview:</strong> {reportData.verdict}</p>
                </div>

                <div className="glass-card-print space-y-3 p-4 border border-stone-300 rounded page-break-inside-avoid">
                  <h3 className="font-title font-semibold text-sm border-b border-stone-800 pb-1 text-stone-900 uppercase tracking-widest">
                    II. VISUAL EVIDENCE CLUSTERS
                  </h3>
                  
                  {[
                    { title: "Ocular & Facial Traits", list: reportData.observations?.face },
                    { title: "Posture & Alignment Vectors", list: reportData.observations?.posture },
                    { title: "Clothing, Textures & Grooming", list: reportData.observations?.clothing },
                    { title: "Hands Position & Gesturing Cues", list: reportData.observations?.hands },
                    { title: "Accessories, Timepieces & Props", list: reportData.observations?.accessories },
                    { title: "Environment & Core Context", list: reportData.observations?.environment }
                  ].map((obsGroup, gId) => (
                    <div key={gId} className="space-y-1 pt-1 break-inside-avoid">
                      <h4 className="font-title text-[0.68rem] tracking-wider text-stone-900 font-bold uppercase">{obsGroup.title}</h4>
                      <ul className="list-disc pl-5 text-stone-700 text-xs space-y-1 leading-relaxed">
                        {obsGroup.list?.map((obs: string, oIdx: number) => (
                          <li key={oIdx}>{obs}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="glass-card-print space-y-3 p-4 border border-stone-300 rounded page-break-inside-avoid">
                  <h3 className="font-title font-semibold text-sm border-b border-stone-800 pb-1 text-stone-900 uppercase tracking-widest">
                    III. PSYCHOLOGICAL PROFILE DETAILS
                  </h3>
                  <p className="text-xs leading-relaxed"><strong>Core Model Structure:</strong> {reportData.personalityType}</p>
                  <p className="text-xs leading-relaxed pt-2"><strong>Physiological Stress Markers:</strong> {reportData.stressIndicators}</p>
                </div>

                <div className="glass-card-print space-y-3 p-4 border border-stone-300 rounded page-break-inside-avoid">
                  <h3 className="font-title font-semibold text-sm border-b border-stone-800 pb-1 text-stone-900 uppercase tracking-widest">
                    IV. CONVERSATIONAL ROADMAP API
                  </h3>
                  <p className="text-xs leading-relaxed"><strong>Verbal Strategy:</strong> {reportData.commStyle}</p>
                  <p className="text-xs leading-relaxed"><strong>Receptive triggers:</strong> {reportData.commPositive}</p>
                  <p className="text-xs leading-relaxed"><strong>Defensive thresholds:</strong> {reportData.commNegative}</p>
                  <div className="bg-stone-100 p-4 border border-stone-300 rounded mt-3">
                    <p className="text-xs leading-relaxed italic text-stone-900">
                      <strong>Rapport Ignition Prompt Command:</strong><br />
                      &quot;{reportData.openingLine}&quot;
                    </p>
                  </div>
                </div>

                <div className="glass-card-print space-y-3 p-4 border border-stone-300 rounded page-break-inside-avoid">
                  <h3 className="font-title font-semibold text-sm border-b border-stone-800 pb-1 text-stone-900 uppercase tracking-widest">
                    V. HIGH STAKE NEGOTIATION PROTOCOL
                  </h3>
                  <p className="text-xs leading-relaxed"><strong>Primary Drivers:</strong> {reportData.motivatorsText} ({ (reportData.motivatorsList || []).join(", ") })</p>
                  <p className="text-xs leading-relaxed"><strong>Likely Objection Tactics:</strong> {reportData.objectionStyle}</p>
                  <p className="text-xs leading-relaxed"><strong>Power Alignment Preference:</strong> {reportData.powerDynamics}</p>
                  <p className="text-xs leading-relaxed font-semibold"><strong>Deal Closing Guideline:</strong> {reportData.closingStrategy}</p>
                  <div className="p-3 bg-red-50 border border-red-300 rounded text-red-900 mt-2 font-semibold">
                    <p className="text-[0.68rem] tracking-wider uppercase font-bold text-red-700">⚠️ CRITICAL TRANS-ACTION CONSTRAINT</p>
                    <p className="text-xs leading-relaxed text-red-900">{reportData.neverDo}</p>
                  </div>
                </div>

                <div className="glass-card-print space-y-3 p-4 border border-stone-300 rounded page-break-inside-avoid">
                  <h3 className="font-title font-semibold text-sm border-b border-stone-800 pb-1 text-stone-900 uppercase tracking-widest">
                    VI. GAP ASSESSMENTS
                  </h3>
                  <p className="text-xs"><strong>Projected Surface Mask (The Ego Show):</strong><br />{reportData.projection}</p>
                  <p className="text-xs pt-2"><strong>Revealed Sub-Intentional Truth (Substance):</strong><br />{reportData.reveal}</p>
                </div>

              </div>
            </div>
          </motion.section>
        )}

      </main>

      {/* ----------------- SETTINGS modal DIALOG ----------------- */}
      <AnimatePresence>
        {settingsOpen && (
          <div className="modal-overlay fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* dark solid blur backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSettingsOpen(false)}
              className="absolute inset-0 bg-[#05080f]/85 backdrop-blur-md" 
            />
            
            {/* Modal Card container */}
            <motion.div 
              initial={{ scale: 0.93, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 15 }}
              className="modal-card glass-card max-w-lg w-full p-6 md:p-8 rounded-2xl relative z-25 bg-[#0e1424] border border-white/10 shadow-2xl space-y-6 text-left"
            >
              <div className="modal-header flex justify-between items-center border-b border-white/5 pb-3 shrink-0">
                <h3 className="font-title text-base font-semibold tracking-wider text-[#c5a880] uppercase">
                  API Configuration
                </h3>
                <button 
                  onClick={() => setSettingsOpen(false)}
                  className="flex items-center justify-center border border-white/5 hover:border-white/20 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-white/2 transition-colors duration-150"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="modal-body space-y-5 text-xs text-slate-400 leading-relaxed min-w-0">
                <p>
                  By default, Sherlock runs in <strong className="text-white">Simulation Mode</strong> utilizing local intelligence presets. To activate custom visual profiling, configure your client-side Google Gemini Developer API key in the field below. Your key is persisted locally in your client&apos;s browser sandbox (<code className="text-cyan-400 font-mono">localStorage</code>) and is never processed on non-Google relays.
                </p>

                <div className="form-group space-y-1.5 min-w-0">
                  <label className="input-label text-[0.7rem] uppercase tracking-wider text-slate-300 font-mono flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#c5a880]" />
                    Gemini Developer API Key
                  </label>
                  <div className="password-input-wrapper flex gap-2 w-full">
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="text-input flex-grow p-3 rounded-lg border border-white/5 bg-slate-950/60 focus:border-[#c5a880] select-text outline-none text-xs text-white placeholder:text-slate-700 transition-colors"
                      placeholder="AIzaSy..." 
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="px-3 rounded-lg border border-white/5 text-slate-400 hover:text-white bg-slate-900 border-white/10 hover:border-white/20 font-bold transition-all shrink-0 text-[0.68rem] tracking-wider font-mono"
                    >
                      {showPassword ? "HIDE" : "SHOW"}
                    </button>
                  </div>
                  <span className="input-hint text-[0.65rem] text-slate-500 block">
                    Get a free developer key from the official{" "}
                    <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-medium hover:underline">
                      Google AI Studio portal
                    </a>.
                  </span>
                </div>

                <div className="form-group space-y-1.5 min-w-0">
                  <label className="input-label text-[0.7rem] uppercase tracking-wider text-slate-300 font-mono">
                    Vision Model Selection
                  </label>
                  <select 
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="select-input w-full p-3 rounded-lg border border-white/5 bg-slate-950/60 focus:border-[#c5a880] outline-none text-xs text-slate-300 cursor-pointer"
                  >
                    <option value="gemini-3.5-flash">Gemini 3.5 Flash (Recommended - Hyper Fast & Highly Accurate)</option>
                    <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Heavy Reasoning - Comprehensive Analysis)</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer flex items-center justify-between pt-4 border-t border-white/5 shrink-0 select-none">
                <button 
                  onClick={handleClearSettings}
                  className="btn px-4 py-2 bg-red-600/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-semibold hover:bg-red-500 hover:text-white transition-colors"
                >
                  Clear Saved Key
                </button>
                <button 
                  onClick={handleSaveSettings}
                  className="btn btn-primary px-5 py-2 rounded-lg text-xs font-semibold"
                >
                  Save Configuration
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
