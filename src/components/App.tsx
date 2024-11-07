import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes, ROUTES_PATHS } from "@/navigation/routes.tsx";
import { useStartParamNavigate } from "@/hooks/useStartParamNavigate.ts";
import { LanguageContextProvider } from "@/contexts/language/LanguageContext.tsx";
import { MenuContextProvider } from "@/contexts/menu/MenuContext.tsx";
import { Menu } from "@/components/Menu/Menu.tsx";
import { NotificationsContextProvider } from "@/contexts/notifications/NotificationsContext.tsx";
import { Notifications } from "@/components/Notifications/Notifications.tsx";

const queryClient = new QueryClient();

export function App() {
  useStartParamNavigate();
  return (
    <LanguageContextProvider>
      <NotificationsContextProvider>
        <MenuContextProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              {routes.map((route) => (
                <Route key={route.path} {...route} />
              ))}
              <Route path="*" element={<Navigate to={ROUTES_PATHS.gifts} />} />
            </Routes>
            <Menu />
            <Notifications />
          </QueryClientProvider>
        </MenuContextProvider>
      </NotificationsContextProvider>
    </LanguageContextProvider>
  );
}
