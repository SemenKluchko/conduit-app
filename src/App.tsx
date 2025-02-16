import React from "react";

import { AuthProvider } from "context/AuthProvider";
import { Router } from "routes/Router";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "api/queryClient";
import { ErrorBoundary } from "components/error-boundary/ErrorBoundary";

function App() {
  return (
          <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                    <ErrorBoundary>
                      <AuthProvider>
                          <Router />
                      </AuthProvider>
                    </ErrorBoundary>
              </BrowserRouter>
          </QueryClientProvider>
  );
}

export default App;
