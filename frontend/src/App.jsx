import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { NotificationProvider } from "./context/NotificationContext";

import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <NotificationProvider>

            <AppRoutes />

            <ToastContainer
                position="top-right"
                autoClose={5000}
                newestOnTop
                theme="dark"
            />

        </NotificationProvider>
    );
}

export default App;