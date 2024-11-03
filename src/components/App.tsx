import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import {Navigate, Route, Routes} from 'react-router-dom';
import {routes, ROUTES_PATHS} from '@/navigation/routes.tsx';
import {useStartParamNavigate} from "@/hooks/useStartParamNavigate.ts";

const queryClient = new QueryClient();

export function App() {
  useStartParamNavigate();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {routes.map((route) => <Route key={route.path} {...route} />)}
        <Route path="*" element={<Navigate to={ROUTES_PATHS.gifts}/>}/>
      </Routes>
    </QueryClientProvider>
  );
}
