import { useNavigate } from "react-router-dom";
import {
    FaBell,
    FaCheckDouble,
    FaTrash,
    FaClock,
    FaArrowRight
} from "react-icons/fa";

import { useNotifications } from "../context/NotificationContext";

const severityStyle = (severity) => {

    switch (severity?.toUpperCase()) {

        case "CRITICAL":
            return "bg-red-600 text-white";

        case "HIGH":
            return "bg-red-100 text-red-700";

        case "MEDIUM":
            return "bg-yellow-100 text-yellow-700";

        case "LOW":
            return "bg-green-100 text-green-700";

        default:
            return "bg-gray-100 text-gray-700";
    }

};

const timeAgo = (date) => {

    if (!date) return "Just now";

    const seconds =
        Math.floor((new Date() - new Date(date)) / 1000);

    if (seconds < 60)
        return "Just now";

    if (seconds < 3600)
        return `${Math.floor(seconds / 60)} min ago`;

    if (seconds < 86400)
        return `${Math.floor(seconds / 3600)} hr ago`;

    return new Date(date).toLocaleDateString();

};

function NotificationDropdown({ open }) {

    const navigate = useNavigate();

    const {
        notifications,
        unreadCount,
        markAllRead,
        clearNotifications
    } = useNotifications();

    if (!open) return null;

    return (

        <div
            className="
                absolute
                right-0
                mt-4
                w-[430px]
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-2xl
                overflow-hidden
                z-50
            "
        >

            {/* Header */}

            <div className="bg-gradient-to-r from-slate-900 to-cyan-700 text-white px-5 py-4">

                <div className="flex justify-between items-start">

                    <div>

                        <h2 className="font-bold text-lg flex items-center gap-2">
                            <FaBell />
                            Notifications
                        </h2>

                        <p className="text-sm text-slate-200 mt-1">
                            Stay updated with security events
                        </p>

                    </div>

                    <div className="flex items-center gap-2">

                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>

                        <span className="text-sm">
                            {unreadCount} New
                        </span>

                    </div>

                </div>

            </div>

            {/* Notification List */}

            <div className="max-h-[420px] overflow-y-auto">

                {

                    notifications.length === 0 ?

                        (

                            <div className="p-10 text-center">

                                <FaBell
                                    className="text-5xl mx-auto text-slate-300 mb-4"
                                />

                                <h3 className="font-bold text-slate-700">
                                    You're all caught up!
                                </h3>

                                <p className="text-sm text-gray-500 mt-2">
                                    No security alerts available.
                                </p>

                            </div>

                        )

                        :

                        notifications.map((notification) => (

                            <div

                                key={notification.id}

                                onClick={() => navigate("/alert-list")}

                                className={`
                                    group
                                    p-4
                                    border-b
                                    hover:bg-cyan-50
                                    hover:shadow-md
                                    transition-all
                                    duration-200
                                    cursor-pointer
                                    ${!notification.readStatus
                                        ? "bg-blue-50"
                                        : ""
                                    }
                                `}

                            >

                                <div className="flex justify-between">

                                    <div className="flex-1">

                                        <div className="flex items-center gap-3">

                                            <span
                                                className={`
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    text-xs
                                                    font-bold
                                                    ${severityStyle(notification.severity)}
                                                `}
                                            >
                                                {notification.severity}
                                            </span>

                                        </div>

                                        <h3 className="font-semibold text-slate-800 mt-3">
                                            {notification.title}
                                        </h3>

                                        <p className="text-sm text-gray-600 mt-2 break-words">
                                            {notification.message}
                                        </p>

                                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-3">

                                            <FaClock />

                                            {timeAgo(
                                                notification.receivedAt ||
                                                notification.createdAt
                                            )}

                                        </div>

                                    </div>

                                    <FaArrowRight
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            navigate("/alert-list");

                                        }}
                                        className="
                                            text-slate-400
                                            group-hover:text-cyan-600
                                            group-hover:translate-x-1
                                            transition-all
                                            mt-2
                                            cursor-pointer
                                        "
                                    />

                                </div>

                            </div>

                        ))

                }

            </div>

            {/* Footer */}

            {

                notifications.length > 0 &&

                (

                    <div className="bg-slate-50 border-t p-4">

                        <div className="flex gap-2">

                            <button
                                onClick={markAllRead}
                                className="
                                    flex-1
                                    bg-cyan-600
                                    hover:bg-cyan-700
                                    text-white
                                    py-2
                                    rounded-lg
                                    font-semibold
                                "
                            >

                                <FaCheckDouble className="inline mr-2" />

                                Mark All Read

                            </button>

                            <button
                                onClick={clearNotifications}
                                className="
                                    flex-1
                                    bg-red-600
                                    hover:bg-red-700
                                    text-white
                                    py-2
                                    rounded-lg
                                    font-semibold
                                "
                            >

                                <FaTrash className="inline mr-2" />

                                Clear

                            </button>

                        </div>

                        <button

                            onClick={() => navigate("/alert-list")}

                            className="
                                mt-3
                                w-full
                                py-2
                                rounded-lg
                                hover:bg-slate-200
                                transition
                                text-cyan-700
                                font-semibold
                                flex
                                justify-center
                                items-center
                                gap-2
                            "

                        >

                            View All Alerts

                            <FaArrowRight />

                        </button>

                    </div>

                )

            }

        </div>

    );

}

export default NotificationDropdown;