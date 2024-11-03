import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import {routes, ROUTES_PATHS} from '@/navigation/routes.tsx';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          {routes.map((route) => <Route key={route.path} {...route} />)}
          <Route path="*" element={<Navigate to={ROUTES_PATHS.gifts}/>}/>
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
}
