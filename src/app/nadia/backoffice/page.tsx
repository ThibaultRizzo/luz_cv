"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authApi, contentApi } from "@/lib/api";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  achievements: string[];
  highlight: string;
}

interface SkillCategory {
  category: string;
  icon: string;
  skills: { name: string; level: number }[];
}

interface Achievement {
  metric: string;
  description: string;
}

interface StatItem {
  metric: string;
  label: string;
}

interface ApproachItem {
  title: string;
  description: string;
}

interface ContactFormLabels {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface ContactBottomInfo {
  responseTime: { label: string; value: string };
  location: { label: string; value: string };
  languages: { label: string; value: string };
}

interface TextContent {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroBadge: string;
  heroStats: StatItem[];
  heroCtaText: string;
  heroScrollText: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutMainText: string;
  aboutSecondaryText: string;
  aboutQuote: string;
  aboutBadge: string;
  aboutTitleSuffix: string;
  aboutApproachTitle: string;
  aboutApproachItems: ApproachItem[];
  aboutImpactTitle: string;
  aboutImpactMetrics: StatItem[];
  aboutQuoteAuthor: string;
  experienceTitle: string;
  experienceSubtitle: string;
  experienceBadge: string;
  experienceBottomStats: StatItem[];
  experiences: ExperienceItem[];
  skillsTitle: string;
  skillsSubtitle: string;
  skillsDescription: string;
  skillsBadge: string;
  skillsCertificationsTitle: string;
  skillsToolsTitle: string;
  skillsQuoteAuthor: string;
  skillCategories: SkillCategory[];
  certifications: string[];
  tools: string[];
  skillsQuote: string;
  achievementsTitle: string;
  achievements: Achievement[];
  contactTitle: string;
  contactSubtitle: string;
  contactDescription: string;
  contactBadge: string;
  contactFormTitle: string;
  contactFormLabels: ContactFormLabels;
  contactFormPlaceholders: ContactFormLabels;
  contactSubmitButton: string;
  contactSuccessMessage: string;
  contactErrorMessage: string;
  contactInfoTitle: string;
  contactEmail: string;
  contactLinkedin: string;
  contactPhone: string;
  contactAvailabilityTitle: string;
  contactAvailabilityStatus: string;
  contactAvailabilityDescription: string;
  contactAvailabilityItems: string[];
  contactDownloadText: string;
  contactBottomInfo: ContactBottomInfo;
}

export default function BackOffice() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [textContent, setTextContent] = useState<TextContent>({
    heroTitle: "Ready to create",
    heroSubtitle: "something extraordinary?",
    heroDescription:
      "Transforming luxury retail experiences through innovative product leadership and strategic vision.",
    heroBadge: "",
    heroStats: [],
    heroCtaText: "",
    heroScrollText: "",
    aboutTitle: "Turning vision into reality",
    aboutDescription:
      "Experienced product leader with a passion for luxury retail and fashion technology.",
    aboutMainText:
      "I am a visionary Product Owner with over a decade of experience transforming luxury retail landscapes through strategic innovation and customer-obsessed design.",
    aboutSecondaryText:
      "My expertise lies in bridging the gap between ambitious business goals and exceptional user experiences. I've built my career on one fundamental belief: premium products deserve premium experiences.",
    aboutQuote:
      "Excellence isn't a destination—it's a mindset that transforms every touchpoint into an opportunity for delight.",
    aboutBadge: "",
    aboutTitleSuffix: "",
    aboutApproachTitle: "",
    aboutApproachItems: [],
    aboutImpactTitle: "",
    aboutImpactMetrics: [],
    aboutQuoteAuthor: "",
    experienceTitle: "A decade of",
    experienceSubtitle: "transformation",
    experienceBadge: "",
    experienceBottomStats: [],
    experiences: [
      {
        role: "Senior Product Owner",
        company: "Maison Lumière",
        period: "2018 - Present",
        location: "Paris, France",
        achievements: [
          "Spearheaded digital transformation resulting in €25M+ revenue increase",
          "Led cross-functional teams of 15+ across 3 countries",
          "Launched omnichannel platform serving 2M+ customers globally",
          "Achieved 40% increase in online conversion rates",
        ],
        highlight:
          "Transformed traditional luxury retail into digital-first experiences",
      },
    ],
    skillsTitle: "Mastery through",
    skillsSubtitle: "experience",
    skillsDescription:
      "A decade of hands-on experience has shaped these core competencies that drive exceptional results in luxury retail product management.",
    skillsBadge: "",
    skillsCertificationsTitle: "",
    skillsToolsTitle: "",
    skillsQuoteAuthor: "",
    skillCategories: [
      {
        category: "Product Leadership",
        icon: "🎯",
        skills: [
          { name: "Product Strategy", level: 95 },
          { name: "Roadmap Planning", level: 90 },
        ],
      },
    ],
    certifications: [
      "Certified Scrum Product Owner (CSPO)",
      "Google Analytics Certified",
    ],
    tools: ["Jira", "Figma", "Shopify Plus", "Salesforce"],
    skillsQuote:
      "Skills are built through challenges, refined through experience, and perfected through passion.",
    achievementsTitle: "Achievements",
    achievements: [
      { metric: "+40%", description: "Increase in Online Sales" },
      { metric: "+25%", description: "Customer Retention in 1 Year" },
    ],
    contactTitle: "Ready to create",
    contactSubtitle: "something extraordinary?",
    contactDescription:
      "Whether you're looking to transform your luxury retail experience or explore new product opportunities, I'd love to hear from you.",
    contactBadge: "",
    contactFormTitle: "",
    contactFormLabels: { name: "", email: "", company: "", message: "" },
    contactFormPlaceholders: { name: "", email: "", company: "", message: "" },
    contactSubmitButton: "",
    contactSuccessMessage: "",
    contactErrorMessage: "",
    contactInfoTitle: "",
    contactEmail: "",
    contactLinkedin: "",
    contactPhone: "",
    contactAvailabilityTitle: "",
    contactAvailabilityStatus: "",
    contactAvailabilityDescription: "",
    contactAvailabilityItems: [],
    contactDownloadText: "",
    contactBottomInfo: {
      responseTime: { label: "", value: "" },
      location: { label: "", value: "" },
      languages: { label: "", value: "" },
    },
  });
  const [activeTab, setActiveTab] = useState("hero");
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (!authApi.isLoggedIn()) {
        router.push("/nadia");
        return;
      }

      try {
        // Verify token with backend
        const userResponse = await authApi.getCurrentUser();
        if (!userResponse.success) {
          router.push("/nadia");
          return;
        }

        setIsAuthenticated(true);

        // Load content from API
        const contentResponse = await contentApi.getContent();
        if (contentResponse.success && contentResponse.data) {
          setTextContent(contentResponse.data as unknown as TextContent);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/nadia");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      router.push("/nadia");
    }
  };

  const handleTextChange = (
    field: keyof TextContent,
    value: string | string[],
  ) => {
    setTextContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    setErrorMessage("");
    try {
      const response = await contentApi.updateContent(
        textContent as unknown as Record<string, unknown>,
      );

      if (response.success) {
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        setSaveStatus("error");
        setErrorMessage(response.message || "Failed to save changes");
        console.error("Save failed:", response);
        setTimeout(() => setSaveStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Save error:", error);
      setSaveStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Network error occurred",
      );
      setTimeout(() => setSaveStatus("idle"), 5000);
    }
  };

  const updateExperience = (
    index: number,
    field: keyof ExperienceItem,
    value: string | string[],
  ) => {
    const newExperiences = [...textContent.experiences];
    if (field === "achievements") {
      newExperiences[index][field] = value as string[];
    } else {
      newExperiences[index][field] = value as string;
    }
    setTextContent((prev) => ({ ...prev, experiences: newExperiences }));
  };

  const addExperience = () => {
    const newExperience: ExperienceItem = {
      role: "New Role",
      company: "Company Name",
      period: "2023 - Present",
      location: "Location",
      achievements: ["Achievement 1", "Achievement 2"],
      highlight: "Main highlight",
    };
    setTextContent((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExperience],
    }));
  };

  const removeExperience = (index: number) => {
    setTextContent((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };

  const updateAchievement = (
    index: number,
    field: keyof Achievement,
    value: string,
  ) => {
    const newAchievements = [...textContent.achievements];
    newAchievements[index][field] = value;
    setTextContent((prev) => ({ ...prev, achievements: newAchievements }));
  };

  // Helper functions for StatItem arrays (heroStats, aboutImpactMetrics, experienceBottomStats)
  const updateStatItem = (
    field: "heroStats" | "aboutImpactMetrics" | "experienceBottomStats",
    index: number,
    key: keyof StatItem,
    value: string,
  ) => {
    const newStats = [...textContent[field]];
    newStats[index][key] = value;
    setTextContent((prev) => ({ ...prev, [field]: newStats }));
  };

  const addStatItem = (
    field: "heroStats" | "aboutImpactMetrics" | "experienceBottomStats",
  ) => {
    const newStat: StatItem = { metric: "", label: "" };
    setTextContent((prev) => ({ ...prev, [field]: [...prev[field], newStat] }));
  };

  const removeStatItem = (
    field: "heroStats" | "aboutImpactMetrics" | "experienceBottomStats",
    index: number,
  ) => {
    setTextContent((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Helper functions for ApproachItem array
  const updateApproachItem = (
    index: number,
    key: keyof ApproachItem,
    value: string,
  ) => {
    const newItems = [...textContent.aboutApproachItems];
    newItems[index][key] = value;
    setTextContent((prev) => ({ ...prev, aboutApproachItems: newItems }));
  };

  const addApproachItem = () => {
    const newItem: ApproachItem = { title: "", description: "" };
    setTextContent((prev) => ({
      ...prev,
      aboutApproachItems: [...prev.aboutApproachItems, newItem],
    }));
  };

  const removeApproachItem = (index: number) => {
    setTextContent((prev) => ({
      ...prev,
      aboutApproachItems: prev.aboutApproachItems.filter((_, i) => i !== index),
    }));
  };

  // Helper functions for ContactFormLabels
  const updateContactFormLabels = (
    key: keyof ContactFormLabels,
    value: string,
  ) => {
    setTextContent((prev) => ({
      ...prev,
      contactFormLabels: { ...prev.contactFormLabels, [key]: value },
    }));
  };

  const updateContactFormPlaceholders = (
    key: keyof ContactFormLabels,
    value: string,
  ) => {
    setTextContent((prev) => ({
      ...prev,
      contactFormPlaceholders: {
        ...prev.contactFormPlaceholders,
        [key]: value,
      },
    }));
  };

  // Helper functions for ContactBottomInfo
  const updateContactBottomInfo = (
    section: keyof ContactBottomInfo,
    key: "label" | "value",
    value: string,
  ) => {
    setTextContent((prev) => ({
      ...prev,
      contactBottomInfo: {
        ...prev.contactBottomInfo,
        [section]: { ...prev.contactBottomInfo[section], [key]: value },
      },
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "hero":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                Hero Badge
              </label>
              <input
                type="text"
                value={textContent.heroBadge}
                onChange={(e) => handleTextChange("heroBadge", e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                Hero Title
              </label>
              <input
                type="text"
                value={textContent.heroTitle}
                onChange={(e) => handleTextChange("heroTitle", e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                Hero Subtitle
              </label>
              <input
                type="text"
                value={textContent.heroSubtitle}
                onChange={(e) =>
                  handleTextChange("heroSubtitle", e.target.value)
                }
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                Hero Description
              </label>
              <textarea
                value={textContent.heroDescription}
                onChange={(e) =>
                  handleTextChange("heroDescription", e.target.value)
                }
                rows={4}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                Hero CTA Text
              </label>
              <input
                type="text"
                value={textContent.heroCtaText}
                onChange={(e) =>
                  handleTextChange("heroCtaText", e.target.value)
                }
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                Hero Scroll Text
              </label>
              <input
                type="text"
                value={textContent.heroScrollText}
                onChange={(e) =>
                  handleTextChange("heroScrollText", e.target.value)
                }
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif text-lg text-brand-cream">
                  Hero Stats
                </h3>
                <button
                  onClick={() => addStatItem("heroStats")}
                  className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg hover:bg-brand-cream transition-colors"
                >
                  Add Stat
                </button>
              </div>
              <div className="space-y-4">
                {textContent.heroStats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-brand-cream">
                        Stat {index + 1}
                      </h4>
                      <button
                        onClick={() => removeStatItem("heroStats", index)}
                        className="text-red-500 hover:text-red-700 text-lg"
                        title="Remove"
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                          Metric
                        </label>
                        <input
                          type="text"
                          value={stat.metric}
                          onChange={(e) =>
                            updateStatItem(
                              "heroStats",
                              index,
                              "metric",
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                          Label
                        </label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) =>
                            updateStatItem(
                              "heroStats",
                              index,
                              "label",
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "about":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                About Badge
              </label>
              <input
                type="text"
                value={textContent.aboutBadge}
                onChange={(e) => handleTextChange("aboutBadge", e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                  About Title
                </label>
                <input
                  type="text"
                  value={textContent.aboutTitle}
                  onChange={(e) =>
                    handleTextChange("aboutTitle", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                  About Title Suffix
                </label>
                <input
                  type="text"
                  value={textContent.aboutTitleSuffix}
                  onChange={(e) =>
                    handleTextChange("aboutTitleSuffix", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                About Description
              </label>
              <textarea
                value={textContent.aboutDescription}
                onChange={(e) =>
                  handleTextChange("aboutDescription", e.target.value)
                }
                rows={3}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                Main Text
              </label>
              <textarea
                value={textContent.aboutMainText}
                onChange={(e) =>
                  handleTextChange("aboutMainText", e.target.value)
                }
                rows={4}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                Secondary Text
              </label>
              <textarea
                value={textContent.aboutSecondaryText}
                onChange={(e) =>
                  handleTextChange("aboutSecondaryText", e.target.value)
                }
                rows={4}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
              />
            </div>

            <div className="border-t border-white/10 pt-6">
              <div>
                <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                  Approach Title
                </label>
                <input
                  type="text"
                  value={textContent.aboutApproachTitle}
                  onChange={(e) =>
                    handleTextChange("aboutApproachTitle", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>
              <div className="flex justify-between items-center mb-4 mt-4">
                <h3 className="font-serif text-lg text-brand-cream">
                  Approach Items
                </h3>
                <button
                  onClick={addApproachItem}
                  className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg hover:bg-brand-cream transition-colors"
                >
                  Add Item
                </button>
              </div>
              <div className="space-y-4">
                {textContent.aboutApproachItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-brand-cream">
                        Item {index + 1}
                      </h4>
                      <button
                        onClick={() => removeApproachItem(index)}
                        className="text-red-500 hover:text-red-700 text-lg"
                        title="Remove"
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) =>
                            updateApproachItem(index, "title", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                          Description
                        </label>
                        <textarea
                          value={item.description}
                          onChange={(e) =>
                            updateApproachItem(
                              index,
                              "description",
                              e.target.value,
                            )
                          }
                          rows={2}
                          className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm resize-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div>
                <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                  Impact Title
                </label>
                <input
                  type="text"
                  value={textContent.aboutImpactTitle}
                  onChange={(e) =>
                    handleTextChange("aboutImpactTitle", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>
              <div className="flex justify-between items-center mb-4 mt-4">
                <h3 className="font-serif text-lg text-brand-cream">
                  Impact Metrics
                </h3>
                <button
                  onClick={() => addStatItem("aboutImpactMetrics")}
                  className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg hover:bg-brand-cream transition-colors"
                >
                  Add Metric
                </button>
              </div>
              <div className="space-y-4">
                {textContent.aboutImpactMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-brand-cream">
                        Metric {index + 1}
                      </h4>
                      <button
                        onClick={() =>
                          removeStatItem("aboutImpactMetrics", index)
                        }
                        className="text-red-500 hover:text-red-700 text-lg"
                        title="Remove"
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                          Metric
                        </label>
                        <input
                          type="text"
                          value={metric.metric}
                          onChange={(e) =>
                            updateStatItem(
                              "aboutImpactMetrics",
                              index,
                              "metric",
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                          Label
                        </label>
                        <input
                          type="text"
                          value={metric.label}
                          onChange={(e) =>
                            updateStatItem(
                              "aboutImpactMetrics",
                              index,
                              "label",
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div>
                <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                  Quote
                </label>
                <textarea
                  value={textContent.aboutQuote}
                  onChange={(e) =>
                    handleTextChange("aboutQuote", e.target.value)
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                  Quote Author
                </label>
                <input
                  type="text"
                  value={textContent.aboutQuoteAuthor}
                  onChange={(e) =>
                    handleTextChange("aboutQuoteAuthor", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );
      case "experience":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                Experience Badge
              </label>
              <input
                type="text"
                value={textContent.experienceBadge}
                onChange={(e) =>
                  handleTextChange("experienceBadge", e.target.value)
                }
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                  Experience Title
                </label>
                <input
                  type="text"
                  value={textContent.experienceTitle}
                  onChange={(e) =>
                    handleTextChange("experienceTitle", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                  Experience Subtitle
                </label>
                <input
                  type="text"
                  value={textContent.experienceSubtitle}
                  onChange={(e) =>
                    handleTextChange("experienceSubtitle", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif text-lg text-brand-cream">
                  Bottom Stats
                </h3>
                <button
                  onClick={() => addStatItem("experienceBottomStats")}
                  className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg hover:bg-brand-cream transition-colors"
                >
                  Add Stat
                </button>
              </div>
              <div className="space-y-4">
                {textContent.experienceBottomStats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-brand-cream">
                        Stat {index + 1}
                      </h4>
                      <button
                        onClick={() =>
                          removeStatItem("experienceBottomStats", index)
                        }
                        className="text-red-500 hover:text-red-700 text-lg"
                        title="Remove"
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                          Metric
                        </label>
                        <input
                          type="text"
                          value={stat.metric}
                          onChange={(e) =>
                            updateStatItem(
                              "experienceBottomStats",
                              index,
                              "metric",
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                          Label
                        </label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) =>
                            updateStatItem(
                              "experienceBottomStats",
                              index,
                              "label",
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif text-lg text-brand-cream">
                  Experience Items
                </h3>
                <button
                  onClick={addExperience}
                  className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg hover:bg-brand-cream transition-colors"
                >
                  Add Experience
                </button>
              </div>
              <div className="space-y-6">
                {textContent.experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="bg-brand-cream/30 p-6 rounded-xl border border-brand-deep/10"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-brand-cream">
                        Experience {index + 1}
                      </h4>
                      <button
                        onClick={() => removeExperience(index)}
                        className="text-red-500 hover:text-red-700 text-lg"
                        title="Remove"
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                          Role
                        </label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) =>
                            updateExperience(index, "role", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                          Company
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) =>
                            updateExperience(index, "company", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                          Period
                        </label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) =>
                            updateExperience(index, "period", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) =>
                            updateExperience(index, "location", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                        Highlight
                      </label>
                      <textarea
                        value={exp.highlight}
                        onChange={(e) =>
                          updateExperience(index, "highlight", e.target.value)
                        }
                        rows={2}
                        className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                        Achievements (one per line)
                      </label>
                      <textarea
                        value={exp.achievements.join("\n")}
                        onChange={(e) =>
                          updateExperience(
                            index,
                            "achievements",
                            e.target.value
                              .split("\n")
                              .filter((line) => line.trim()),
                          )
                        }
                        rows={4}
                        className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "skills":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                Skills Badge
              </label>
              <input
                type="text"
                value={textContent.skillsBadge}
                onChange={(e) =>
                  handleTextChange("skillsBadge", e.target.value)
                }
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                  Skills Title
                </label>
                <input
                  type="text"
                  value={textContent.skillsTitle}
                  onChange={(e) =>
                    handleTextChange("skillsTitle", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                  Skills Subtitle
                </label>
                <input
                  type="text"
                  value={textContent.skillsSubtitle}
                  onChange={(e) =>
                    handleTextChange("skillsSubtitle", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                Skills Description
              </label>
              <textarea
                value={textContent.skillsDescription}
                onChange={(e) =>
                  handleTextChange("skillsDescription", e.target.value)
                }
                rows={3}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
              />
            </div>

            {/* Skill Categories */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="font-serif text-lg text-brand-cream/90 mb-4">
                Skill Categories
              </h3>
              <p className="text-sm text-brand-cream/60 mb-4">
                These categories are stored in the database and loaded
                dynamically.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {textContent.skillCategories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">{category.icon}</span>
                      <h4 className="font-medium text-brand-cream">
                        {category.category}
                      </h4>
                    </div>
                    <div className="space-y-1 text-sm">
                      {category.skills.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="flex justify-between text-brand-cream"
                        >
                          <span>{skill.name}</span>
                          <span className="text-brand-gold font-medium">
                            {skill.level}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div>
                <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                  Skills Quote
                </label>
                <textarea
                  value={textContent.skillsQuote}
                  onChange={(e) =>
                    handleTextChange("skillsQuote", e.target.value)
                  }
                  rows={2}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                  Quote Author
                </label>
                <input
                  type="text"
                  value={textContent.skillsQuoteAuthor}
                  onChange={(e) =>
                    handleTextChange("skillsQuoteAuthor", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                  Certifications Title
                </label>
                <input
                  type="text"
                  value={textContent.skillsCertificationsTitle}
                  onChange={(e) =>
                    handleTextChange(
                      "skillsCertificationsTitle",
                      e.target.value,
                    )
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                  Tools Title
                </label>
                <input
                  type="text"
                  value={textContent.skillsToolsTitle}
                  onChange={(e) =>
                    handleTextChange("skillsToolsTitle", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                  Certifications (one per line)
                </label>
                <textarea
                  value={textContent.certifications.join("\n")}
                  onChange={(e) =>
                    handleTextChange(
                      "certifications",
                      e.target.value.split("\n").filter((line) => line.trim()),
                    )
                  }
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                  Tools (one per line)
                </label>
                <textarea
                  value={textContent.tools.join("\n")}
                  onChange={(e) =>
                    handleTextChange(
                      "tools",
                      e.target.value.split("\n").filter((line) => line.trim()),
                    )
                  }
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>
        );
      case "achievements":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                Achievements Title
              </label>
              <input
                type="text"
                value={textContent.achievementsTitle}
                onChange={(e) =>
                  handleTextChange("achievementsTitle", e.target.value)
                }
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />
            </div>
            <div className="border-t border-white/10 pt-6">
              <h3 className="font-serif text-lg text-brand-cream/90 mb-4">
                Achievement Items
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {textContent.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                  >
                    <h4 className="font-medium text-brand-cream mb-3">
                      Achievement {index + 1}
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                          Metric
                        </label>
                        <input
                          type="text"
                          value={achievement.metric}
                          onChange={(e) =>
                            updateAchievement(index, "metric", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          value={achievement.description}
                          onChange={(e) =>
                            updateAchievement(
                              index,
                              "description",
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                Contact Badge
              </label>
              <input
                type="text"
                value={textContent.contactBadge}
                onChange={(e) =>
                  handleTextChange("contactBadge", e.target.value)
                }
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                Contact Title
              </label>
              <input
                type="text"
                value={textContent.contactTitle}
                onChange={(e) =>
                  handleTextChange("contactTitle", e.target.value)
                }
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                Contact Subtitle
              </label>
              <input
                type="text"
                value={textContent.contactSubtitle}
                onChange={(e) =>
                  handleTextChange("contactSubtitle", e.target.value)
                }
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                Contact Description
              </label>
              <textarea
                value={textContent.contactDescription}
                onChange={(e) =>
                  handleTextChange("contactDescription", e.target.value)
                }
                rows={4}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
              />
            </div>

            <div className="border-t border-white/10 pt-6">
              <h3 className="font-serif text-lg text-brand-cream/90 mb-4">
                Contact Form
              </h3>
              <div>
                <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                  Form Title
                </label>
                <input
                  type="text"
                  value={textContent.contactFormTitle}
                  onChange={(e) =>
                    handleTextChange("contactFormTitle", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>
              <div className="mt-4 bg-brand-cream/30 p-4 rounded-xl">
                <h4 className="font-medium text-brand-cream mb-3">
                  Form Labels
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-brand-cream/80 mb-1">
                      Name Label
                    </label>
                    <input
                      type="text"
                      value={textContent.contactFormLabels.name}
                      onChange={(e) =>
                        updateContactFormLabels("name", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-brand-cream/80 mb-1">
                      Email Label
                    </label>
                    <input
                      type="text"
                      value={textContent.contactFormLabels.email}
                      onChange={(e) =>
                        updateContactFormLabels("email", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-brand-cream/80 mb-1">
                      Company Label
                    </label>
                    <input
                      type="text"
                      value={textContent.contactFormLabels.company}
                      onChange={(e) =>
                        updateContactFormLabels("company", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-brand-cream/80 mb-1">
                      Message Label
                    </label>
                    <input
                      type="text"
                      value={textContent.contactFormLabels.message}
                      onChange={(e) =>
                        updateContactFormLabels("message", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-brand-cream/30 p-4 rounded-xl">
                <h4 className="font-medium text-brand-cream mb-3">
                  Form Placeholders
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-brand-cream/80 mb-1">
                      Name Placeholder
                    </label>
                    <input
                      type="text"
                      value={textContent.contactFormPlaceholders.name}
                      onChange={(e) =>
                        updateContactFormPlaceholders("name", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-brand-cream/80 mb-1">
                      Email Placeholder
                    </label>
                    <input
                      type="text"
                      value={textContent.contactFormPlaceholders.email}
                      onChange={(e) =>
                        updateContactFormPlaceholders("email", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-brand-cream/80 mb-1">
                      Company Placeholder
                    </label>
                    <input
                      type="text"
                      value={textContent.contactFormPlaceholders.company}
                      onChange={(e) =>
                        updateContactFormPlaceholders("company", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-brand-cream/80 mb-1">
                      Message Placeholder
                    </label>
                    <input
                      type="text"
                      value={textContent.contactFormPlaceholders.message}
                      onChange={(e) =>
                        updateContactFormPlaceholders("message", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                    Submit Button Text
                  </label>
                  <input
                    type="text"
                    value={textContent.contactSubmitButton}
                    onChange={(e) =>
                      handleTextChange("contactSubmitButton", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                    Success Message
                  </label>
                  <input
                    type="text"
                    value={textContent.contactSuccessMessage}
                    onChange={(e) =>
                      handleTextChange("contactSuccessMessage", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                    Error Message
                  </label>
                  <input
                    type="text"
                    value={textContent.contactErrorMessage}
                    onChange={(e) =>
                      handleTextChange("contactErrorMessage", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h3 className="font-serif text-lg text-brand-cream/90 mb-4">
                Contact Information
              </h3>
              <div>
                <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                  Info Title
                </label>
                <input
                  type="text"
                  value={textContent.contactInfoTitle}
                  onChange={(e) =>
                    handleTextChange("contactInfoTitle", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    value={textContent.contactEmail}
                    onChange={(e) =>
                      handleTextChange("contactEmail", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    value={textContent.contactLinkedin}
                    onChange={(e) =>
                      handleTextChange("contactLinkedin", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={textContent.contactPhone}
                    onChange={(e) =>
                      handleTextChange("contactPhone", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                  Download Resume Text
                </label>
                <input
                  type="text"
                  value={textContent.contactDownloadText}
                  onChange={(e) =>
                    handleTextChange("contactDownloadText", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h3 className="font-serif text-lg text-brand-cream/90 mb-4">
                Availability
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                    Availability Title
                  </label>
                  <input
                    type="text"
                    value={textContent.contactAvailabilityTitle}
                    onChange={(e) =>
                      handleTextChange(
                        "contactAvailabilityTitle",
                        e.target.value,
                      )
                    }
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                    Availability Status
                  </label>
                  <input
                    type="text"
                    value={textContent.contactAvailabilityStatus}
                    onChange={(e) =>
                      handleTextChange(
                        "contactAvailabilityStatus",
                        e.target.value,
                      )
                    }
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                  Availability Description
                </label>
                <textarea
                  value={textContent.contactAvailabilityDescription}
                  onChange={(e) =>
                    handleTextChange(
                      "contactAvailabilityDescription",
                      e.target.value,
                    )
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-brand-cream/90 mb-2">
                  Availability Items (one per line)
                </label>
                <textarea
                  value={textContent.contactAvailabilityItems.join("\n")}
                  onChange={(e) =>
                    handleTextChange(
                      "contactAvailabilityItems",
                      e.target.value.split("\n").filter((line) => line.trim()),
                    )
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                />
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h3 className="font-serif text-lg text-brand-cream/90 mb-4">
                Bottom Info
              </h3>
              <div className="space-y-4">
                <div className="bg-brand-cream/30 p-4 rounded-xl">
                  <h4 className="font-medium text-brand-cream mb-3">
                    Response Time
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-brand-cream/80 mb-1">
                        Label
                      </label>
                      <input
                        type="text"
                        value={textContent.contactBottomInfo.responseTime.label}
                        onChange={(e) =>
                          updateContactBottomInfo(
                            "responseTime",
                            "label",
                            e.target.value,
                          )
                        }
                        className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-brand-cream/80 mb-1">
                        Value
                      </label>
                      <input
                        type="text"
                        value={textContent.contactBottomInfo.responseTime.value}
                        onChange={(e) =>
                          updateContactBottomInfo(
                            "responseTime",
                            "value",
                            e.target.value,
                          )
                        }
                        className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-brand-cream/30 p-4 rounded-xl">
                  <h4 className="font-medium text-brand-cream mb-3">
                    Location
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-brand-cream/80 mb-1">
                        Label
                      </label>
                      <input
                        type="text"
                        value={textContent.contactBottomInfo.location.label}
                        onChange={(e) =>
                          updateContactBottomInfo(
                            "location",
                            "label",
                            e.target.value,
                          )
                        }
                        className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-brand-cream/80 mb-1">
                        Value
                      </label>
                      <input
                        type="text"
                        value={textContent.contactBottomInfo.location.value}
                        onChange={(e) =>
                          updateContactBottomInfo(
                            "location",
                            "value",
                            e.target.value,
                          )
                        }
                        className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-brand-cream/30 p-4 rounded-xl">
                  <h4 className="font-medium text-brand-cream mb-3">
                    Languages
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-brand-cream/80 mb-1">
                        Label
                      </label>
                      <input
                        type="text"
                        value={textContent.contactBottomInfo.languages.label}
                        onChange={(e) =>
                          updateContactBottomInfo(
                            "languages",
                            "label",
                            e.target.value,
                          )
                        }
                        className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-brand-cream/80 mb-1">
                        Value
                      </label>
                      <input
                        type="text"
                        value={textContent.contactBottomInfo.languages.value}
                        onChange={(e) =>
                          updateContactBottomInfo(
                            "languages",
                            "value",
                            e.target.value,
                          )
                        }
                        className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-deep flex items-center justify-center">
        <div className="text-brand-cream">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-brand-deep">
      {/* Save Status - Fixed at top */}
      {saveStatus !== "idle" && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          {saveStatus === "saving" && (
            <div className="flex items-center px-6 py-3 bg-blue-100 text-blue-700 rounded-lg shadow-lg">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </div>
          )}
          {saveStatus === "saved" && (
            <div className="flex items-center px-6 py-3 bg-green-100 text-green-700 rounded-lg shadow-lg">
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Saved successfully!
            </div>
          )}
          {saveStatus === "error" && (
            <div className="flex flex-col px-6 py-3 bg-red-100 text-red-700 rounded-lg shadow-lg max-w-md">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">Error saving changes</span>
              </div>
              {errorMessage && (
                <p className="mt-1 ml-8 text-sm">{errorMessage}</p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="container mx-auto px-6 py-4 max-w-7xl">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-4 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6">
              <div className="mb-6">
                <h1 className="font-serif text-2xl text-brand-cream mb-4">
                  Back Office
                </h1>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm text-brand-cream rounded-lg hover:bg-brand-gold hover:text-brand-deep transition-all duration-300 flex items-center justify-center gap-2 border border-white/30"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>

              <h2 className="font-serif text-lg text-brand-cream/80 mb-4 mt-6">
                Sections
              </h2>
              <nav className="space-y-2">
                {[
                  { id: "hero", label: "Hero Section", icon: "🏠" },
                  { id: "about", label: "About Section", icon: "👤" },
                  { id: "experience", label: "Experience", icon: "💼" },
                  { id: "skills", label: "Skills", icon: "⚡" },
                  { id: "achievements", label: "Achievements", icon: "🏆" },
                  { id: "contact", label: "Contact", icon: "📧" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                      activeTab === tab.id
                        ? "bg-brand-gold text-brand-deep font-medium shadow-md"
                        : "text-brand-cream/70 hover:bg-white/20 hover:text-brand-cream border border-transparent hover:border-white/20"
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-2xl text-brand-cream capitalize">
                  {activeTab} Section
                </h2>
                <button
                  onClick={handleSave}
                  disabled={saveStatus === "saving"}
                  className="px-6 py-3 bg-brand-gold text-brand-deep rounded-lg hover:bg-brand-gold/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium shadow-lg"
                >
                  {saveStatus === "saving" ? "Saving..." : "Save Changes"}
                </button>
              </div>

              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
