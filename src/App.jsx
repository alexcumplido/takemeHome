import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./components/header/Header.jsx";
import { Footer } from "./components/footer/Footer.jsx";
import { Home } from "./routes/home/Home.jsx";
import { SearchParams } from "./routes/search/SearchParams.jsx";
import { WrappedDetails } from "./routes//details/Details.jsx";
import { SavedDashboard } from "./routes/saved/SavedDashboard.jsx";
import { Contact } from "./routes/contact/Contact.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
const App = () => {
  return (
    <StrictMode>
      {/* <ThemeContext.Provider value={theme}> */}
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/details/:id/:save" element={<WrappedDetails />} />
            <Route path="/dashboard" element={<SavedDashboard />} />
            <Route path="/search" element={<SearchParams />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </QueryClientProvider>
        <Header />
      </BrowserRouter>
      {/* </ThemeContext.Provider> */}
    </StrictMode>
  );
};
