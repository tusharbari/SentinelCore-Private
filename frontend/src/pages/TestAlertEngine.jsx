import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AnimatedBackground from "../components/AnimatedBackground";
import GlassCard from "../components/ui/GlassCard";
import PageHeader from "../components/ui/PageHeader";
import PrimaryButton from "../components/ui/PrimaryButton";
import api from "../services/api";

function TestAlertEngine() {

    const [loading, setLoading] = useState(false);

    const sendTestEvent = async () => {

        setLoading(true);

        try {

            await api.post("/alert-engine/process", {
                eventType: "FAILED_LOGIN",
                value: 8,
                source: "Firewall",
                description: "8 failed login attempts"
            });

            alert("✅ Test event processed successfully!");

        } catch (error) {

            console.error(error);
            alert("❌ Failed to process event");

        }

        setLoading(false);
    };

    return (
        <>
            <Navbar />
            <Sidebar />

            <main className="ml-64 mt-16 min-h-screen bg-slate-950">
                <AnimatedBackground />

                <div className="relative z-10 p-8">

                    <PageHeader
                        title="Alert Engine Test"
                        subtitle="Generate a sample security event"
                    />

                    <GlassCard className="max-w-xl mx-auto p-10 text-center">

                        <p className="text-slate-300 mb-8">
                            Click the button below to send a sample
                            <strong> FAILED_LOGIN </strong>
                            security event.
                        </p>

                        <PrimaryButton
                            onClick={sendTestEvent}
                            disabled={loading}
                            className="bg-red-600 hover:bg-red-500 text-white"
                        >
                            {loading ? "Processing..." : "Generate Test Event"}
                        </PrimaryButton>

                    </GlassCard>

                </div>

            </main>
        </>
    );
}

export default TestAlertEngine;