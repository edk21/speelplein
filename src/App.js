import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ChildrenList from "./components/ChildrenList";
import Create from "./components/Create";
import Edit from "./components/Edit";
import ExcelData from "./components/ExcelData";
import GenerateQR from "./components/GenerateQR";
import LegalStats from "./components/LegalStats";
import LegalStatsTable from "./components/LegalStatsTable";
import Navbar from "./components/Navbar";
import NotFound from "./components/Notfound";
import Stats from "./components/Stats";

function App() {

  return (
    <Router>
      <div className='container'>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<ChildrenList />} />
          <Route exact path='/qrGenerator' element={<GenerateQR />} />
          <Route exact path='/excelFile' element={<ExcelData />} />
          <Route exact path='/edit/:id' element={<Edit />} />
          <Route exact path='/create' element={<Create />} />
          <Route exact path='/dailyR' element={<Stats />} />
          <Route exact path='/legalS' element={<LegalStatsTable />} />
          <Route exact path='/legalss/:id' element={<LegalStats />} />
          <Route element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
