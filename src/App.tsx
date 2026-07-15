import { Router as WouterRouter, Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import AuthCallback from "@/pages/Auth/callback";

function App() {
  return (
    <div className="dark">
      <TooltipProvider>
        <WouterRouter>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/auth/callback" component={AuthCallback} />
            <Route>
              <div
                style={{
                  background: "#050504",
                  width: "100vw",
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                  fontWeight: 600,
                  fontSize: "1.4rem",
                  color: "#8fd694",
                }}
              >
                THE NERDIO — 404 NOT FOUND
              </div>
            </Route>
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </div>
  );
}

export default App;
