import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import {Navigate, Route, Routes} from 'react-router-dom';
import {routes, ROUTES_PATHS} from '@/navigation/routes.tsx';
import {useStartParamNavigate} from "@/hooks/useStartParamNavigate.ts";
import {ThemeContextProvider} from "@/contexts/theme/ThemeContext.tsx";
import {LanguageContextProvider} from "@/contexts/language/LanguageContext.tsx";

const queryClient = new QueryClient();

export function App() {
  useStartParamNavigate();
  return (
    <ThemeContextProvider>
      <LanguageContextProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            {routes.map((route) => <Route key={route.path} {...route} />)}
            <Route path="*" element={<Navigate to={ROUTES_PATHS.gifts}/>}/>
          </Routes>
        </QueryClientProvider>
      </LanguageContextProvider>
    </ThemeContextProvider>
  );
}
