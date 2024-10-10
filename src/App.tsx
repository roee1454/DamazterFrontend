import { Routes, Route } from "react-router-dom";
import Index from "./pages";
import Header from "./components/header";
import { Toaster } from "./components/ui/toaster";
import Chat from "./pages/Chat";

function App() {
    return (
        <div dir="rtl" className="px-2.5 sm:px-10 md:px-20 py-4 sm:py-5 md:py-6">
            <Toaster />
            <Header />
            <Routes>
                <Route index element={<Index />} />
                <Route path="chat/:id" element={<Chat />} />
            </Routes>
        </div>
    )
}
export default App;
