import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AnimatedBackground from "../components/AnimatedBackground";

import GlassCard from "../components/ui/GlassCard";
import PageHeader from "../components/ui/PageHeader";
import PrimaryButton from "../components/ui/PrimaryButton";
import ModernInput from "../components/ui/ModernInput";
import ModernSelect from "../components/ui/ModernSelect";
import FormSection from "../components/ui/FormSection";

import {
    getAlertRuleById,
    updateAlertRule,
} from "../services/alertRuleService";

function EditAlertRule() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [rule, setRule] = useState({
        name: "",
        description: "",
        eventType: "FAILED_LOGIN",
        conditionType: "GREATER_THAN",
        threshold: 5,
        severity: "High",
        enabled: true,
    });

    useEffect(() => {
        loadRule();
    }, []);

    const loadRule = async () => {
        try {

            const res = await getAlertRuleById(id);

            setRule(res.data);

        } catch (error) {

            console.error(error);

            alert("Failed to Load Alert Rule");

        }
    };

    const saveRule = async () => {

        try {

            await updateAlertRule(id, rule);

            alert("Alert Rule Updated Successfully");

            navigate("/alert-rules");

        } catch (error) {

            console.error(error);

            alert("Failed to Update Alert Rule");

        }

    };

    return (
        <>
            <Navbar />
            <Sidebar />

            <main className="ml-64 mt-16 min-h-screen bg-slate-950 relative overflow-hidden">

                <AnimatedBackground />

                <div className="relative z-10 p-8">

                    <PageHeader
                        title="Edit Alert Rule"
                        subtitle="Update automatic alert generation rule"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >

                        <GlassCard className="max-w-5xl mx-auto p-10">

                            <FormSection>

                                <ModernInput
                                    label="Rule Name"
                                    value={rule.name}
                                    onChange={(e) =>
                                        setRule({
                                            ...rule,
                                            name: e.target.value,
                                        })
                                    }
                                />

                                <ModernInput
                                    label="Threshold"
                                    type="number"
                                    value={rule.threshold}
                                    onChange={(e) =>
                                        setRule({
                                            ...rule,
                                            threshold: Number(e.target.value),
                                        })
                                    }
                                />

                                <ModernSelect
                                    label="Event Type"
                                    value={rule.eventType}
                                    onChange={(e) =>
                                        setRule({
                                            ...rule,
                                            eventType: e.target.value,
                                        })
                                    }
                                    options={[
                                        "FAILED_LOGIN",
                                        "PORT_SCAN",
                                        "MALWARE",
                                        "DDOS",
                                        "SQL_INJECTION",
                                        "XSS",
                                        "BRUTE_FORCE",
                                    ]}
                                />

                                <ModernSelect
                                    label="Condition"
                                    value={rule.conditionType}
                                    onChange={(e) =>
                                        setRule({
                                            ...rule,
                                            conditionType: e.target.value,
                                        })
                                    }
                                    options={[
                                        "GREATER_THAN",
                                        "LESS_THAN",
                                        "EQUAL",
                                    ]}
                                />

                                <ModernSelect
                                    label="Severity"
                                    value={rule.severity}
                                    onChange={(e) =>
                                        setRule({
                                            ...rule,
                                            severity: e.target.value,
                                        })
                                    }
                                    options={[
                                        "Critical",
                                        "High",
                                        "Medium",
                                        "Low",
                                    ]}
                                />

                                <ModernSelect
                                    label="Enabled"
                                    value={rule.enabled.toString()}
                                    onChange={(e) =>
                                        setRule({
                                            ...rule,
                                            enabled: e.target.value === "true",
                                        })
                                    }
                                    options={[
                                        { value: "true", label: "Enabled" },
                                        { value: "false", label: "Disabled" },
                                    ]}
                                />

                            </FormSection>

                            <div className="mt-8">

                                <label className="block text-cyan-400 text-sm font-medium mb-2">
                                    Description
                                </label>

                                <textarea
                                    rows="5"
                                    value={rule.description}
                                    onChange={(e) =>
                                        setRule({
                                            ...rule,
                                            description: e.target.value,
                                        })
                                    }
                                    className="
                                        w-full
                                        rounded-xl
                                        bg-slate-800
                                        border
                                        border-slate-700
                                        px-5
                                        py-4
                                        text-white
                                        focus:border-cyan-400
                                        focus:ring-2
                                        focus:ring-cyan-500/30
                                        outline-none
                                        resize-none
                                    "
                                />

                            </div>

                            <div className="flex justify-end gap-4 mt-10">

                                <PrimaryButton
                                    onClick={() => navigate("/alert-rules")}
                                    className="bg-slate-700 hover:bg-slate-600 text-white"
                                >
                                    Cancel
                                </PrimaryButton>

                                <PrimaryButton
                                    onClick={saveRule}
                                    className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                                >
                                    Update Alert Rule
                                </PrimaryButton>

                            </div>

                        </GlassCard>

                    </motion.div>

                </div>

            </main>

        </>
    );
}

export default EditAlertRule;