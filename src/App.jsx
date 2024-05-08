import Inbox from "./Components/pages/Inbox";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: Infinity,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="p-[1rem]">
          <Inbox />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
