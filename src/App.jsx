import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode, useState } from "react";
import { Header } from "./components/header/Header.jsx";
import { Footer } from "./components/footer/Footer.jsx";
import { Home } from "./routes/home/Home.jsx";
import { SearchParams } from "./routes/search/SearchParams.jsx";
import { WrappedDetails } from "./routes//details/Details.jsx";
import { SavedDashboard } from "./routes/saved/SavedDashboard.jsx";
import { ContactUs } from "./routes/contact/Contact.jsx";

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="details/:id" element={<WrappedDetails />} />
          <Route path="dashboard" element={<SavedDashboard />} />
          <Route path="search" element={<SearchParams />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
