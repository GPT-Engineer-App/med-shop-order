import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Index from "./pages/Index.jsx";

function App() {
  return (
    <Box bg="blue.500" minH="100vh">
      <Router>
        <Routes>
          <Route exact path="/" element={<Index />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
