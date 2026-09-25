import { type ReactNode, useEffect, useRef } from "react";
import { ClerkProvider, SignIn, SignUp, useClerk, useAuth } from "@clerk/react";
import { publishableKeyFromHost } from "@clerk/shared/keys";
import { shadcn } from "@clerk/themes";
import { ruRU } from "@clerk/localizations";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Dashboard } from "@/components/Dashboard";
import { Settings } from "@/components/Settings";
import { Docs } from "@/components/Docs";
import { Workspace } from "@/components/Workspace";
import { Redirect, Route, Switch, useLocation, Router as WouterRouter } from "wouter";

const queryClient = new QueryClient();
const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath) ? path.slice(basePath.length) || "/" : path;
}

if (!clerkPubKey) throw new Error("Не задан VITE_CLERK_PUBLISHABLE_KEY в файле .env");

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: "clerk",
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
  colorPrimary: "#244b5a",
    colorForeground: "#153040",
    colorMutedForeground: "#66818b",
    colorDanger: "#af6d72",
    colorBackground: "#ffffff",
    colorInput: "#fafdfe",
    colorInputForeground: "#315460",
    colorNeutral: "#dcecef",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    borderRadius: "0.8rem",
  },
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox: "bg-white rounded-2xl w-[440px] max-w-full overflow-hidden shadow-[0_18px_60px_rgba(32,79,91,.12)]",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: { color: "#153040", fontWeight: "700" },
    headerSubtitle: { color: "#66818b" },
    socialButtonsBlockButtonText: { color: "#315460", fontWeight: "600" },
    formFieldLabel: { color: "#315460", fontWeight: "600" },
    footerActionLink: { color: "#315d6d", fontWeight: "700" },
    footerActionText: { color: "#66818b" },
    dividerText: { color: "#66818b" },
    identityPreviewEditButton: { color: "#315d6d" },
    formFieldSuccessText: { color: "#3f795f" },
    alertText: { color: "#8c5057" },
    logoBox: "mb-2",
    logoImage: "max-h-10",
    socialButtonsBlockButton: "border-[#dcecef] bg-white hover:bg-[#f2f9fa]",
    formButtonPrimary: "bg-[#244b5a] text-white hover:bg-[#326b7a]",
    formFieldInput: "border-[#d8e9eb] bg-[#fafdfe] text-[#315460]",
    footerAction: "text-[#66818b]",
    dividerLine: "bg-[#dcecef]",
    alert: "border-[#eed6d6] bg-[#fae7e7]",
    otpCodeFieldInput: "border-[#d8e9eb] text-[#315460]",
    formFieldRow: "mb-4",
    main: "text-[#153040]",
  },
};

function HomeRedirect() {
  const { isLoaded, isSignedIn } = useAuth();
  if (isLoaded && isSignedIn) return <Redirect to="/dashboard"/>;
  return <Dashboard/>;
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <div className="grid min-h-[60vh] place-items-center text-sm text-slate-500">Загружаем аккаунт…</div>;
  if (!isSignedIn) return <Redirect to="/"/>;
  return <>{children}</>;
}

function SignInPage() {
  return <div className="flex min-h-[100dvh] items-center justify-center bg-[#f2f9fa] px-4 py-10"><SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`}/></div>;
}

function SignUpPage() {
  return <div className="flex min-h-[100dvh] items-center justify-center bg-[#f2f9fa] px-4 py-10"><SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`}/></div>;
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const client = useQueryClient();
  const previousUserId = useRef<string | null | undefined>(undefined);
  useEffect(() => addListener(({ user }) => {
    const userId = user?.id ?? null;
    if (previousUserId.current !== undefined && previousUserId.current !== userId) client.clear();
    previousUserId.current = userId;
  }), [addListener, client]);
  return null;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function AppRoutes() {
  return <RoutedErrorBoundary><Switch>
    <Route path="/" component={HomeRedirect}/>
    <Route path="/sign-in/*?" component={SignInPage}/>
    <Route path="/sign-up/*?" component={SignUpPage}/>
    <Route path="/dashboard"><ProtectedRoute><Workspace/></ProtectedRoute></Route>
    <Route path="/settings"><ProtectedRoute><Settings/></ProtectedRoute></Route>
    <Route path="/docs" component={Docs}/>
    <Route path="/docs/:slug" component={Docs}/>
    <Route component={NotFound}/>
  </Switch></RoutedErrorBoundary>;
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();
  return <ClerkProvider
    publishableKey={clerkPubKey}
    proxyUrl={clerkProxyUrl}
    appearance={clerkAppearance}
    signInUrl={`${basePath}/sign-in`}
    signUpUrl={`${basePath}/sign-up`}
    localization={{
      ...ruRU,
      signIn: {
        ...ruRU.signIn,
        start: {
          ...ruRU.signIn?.start,
          title: "Войти в Stratus Hub",
          subtitle: "Войдите, чтобы открыть личный кабинет",
        },
      },
      signUp: {
        ...ruRU.signUp,
        start: {
          ...ruRU.signUp?.start,
          title: "Создать аккаунт Stratus Hub",
          subtitle: "Зарегистрируйтесь, чтобы открыть личный кабинет",
        },
      },
    }}
    routerPush={(to: string) => setLocation(stripBase(to))}
    routerReplace={(to: string) => setLocation(stripBase(to), { replace: true })}
  >
    <QueryClientProvider client={queryClient}>
      <ClerkQueryClientCacheInvalidator/>
      <TooltipProvider><AppRoutes/><Toaster/></TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>;
}

function App() {
  return <WouterRouter base={basePath}><ClerkProviderWithRoutes/></WouterRouter>;
}

export default App;