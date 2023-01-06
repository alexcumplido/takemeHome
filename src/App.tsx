import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { Home } from "./routes/home/Home";
import { SearchParams } from "./routes/search/SearchParams";
import { WrappedDetails } from "./routes/details/Details";
import { SavedDashboard } from "./routes/saved/SavedDashboard";
import { ContactUs } from "./routes/contact/Contact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdoptedAnimalContext } from "./context/AdoptedAnimalContext.js";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedAnimal = React.useState(null);
  return (
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AdoptedAnimalContext.Provider value={adoptedAnimal}>
            <Header />
            <Routes>
              <Route path="details/:id" element={<WrappedDetails />} />
              <Route path="dashboard" element={<SavedDashboard />} />
              <Route path="search" element={<SearchParams />} />
              <Route path="contact" element={<ContactUs />} />
              <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
          </AdoptedAnimalContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
