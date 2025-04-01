import Listeners from './listeners';
import QueryProvider from './providers/QueryProvider';
import AppRouter from './router';

function App() {
  return (
    <QueryProvider>
      <AppRouter />
      <Listeners />
    </QueryProvider>
  );
}

export default App;
