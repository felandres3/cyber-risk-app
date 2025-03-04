import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import RiskTable from './components/RiskTable';
import PaginationControls from './components/PaginationControls'; // Nuevo import

function App() {
  const [search, setSearch] = useState('');
  const [idFilter, setIdFilter] = useState('');
  const [impactFilter, setImpactFilter] = useState('');
  const [probabilityFilter, setProbabilityFilter] = useState('');
  const [risks, setRisks] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [sortDir, setSortDir] = useState('asc');

  const fetchRisks = async () => {
    try {
      const url = `http://localhost:5000/risks?search=${search}&id=${idFilter}&impact=${impactFilter}&probability=${probabilityFilter}&page=${page}&per_page=${perPage}&sort_by=${sortBy}&sort_dir=${sortDir}`;
      console.log('Fetching URL:', url);
      const response = await axios.get(url);
      setRisks(response.data.risks);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching risks:', error);
      setRisks([]);
    }
  };

  useEffect(() => {
    fetchRisks();
  }, [search, idFilter, impactFilter, probabilityFilter, page, perPage, sortBy, sortDir]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleIdFilter = (e) => {
    setIdFilter(e.target.value);
    setPage(1);
  };

  const handleImpactFilter = (e) => {
    setImpactFilter(e.target.value);
    setPage(1);
  };

  const handleProbabilityFilter = (e) => {
    setProbabilityFilter(e.target.value);
    setPage(1);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDir('asc');
    }
    setPage(1);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Nuevo return con PaginationControls
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Gestión de Riesgos</h1>
      <SearchBar value={search} onChange={handleSearch} />
      <Filters
        idValue={idFilter}
        onIdChange={handleIdFilter}
        impactValue={impactFilter}
        onImpactChange={handleImpactFilter}
        probabilityValue={probabilityFilter}
        onProbabilityChange={handleProbabilityFilter}
        perPage={perPage}
        onPerPageChange={handlePerPageChange}
      />
      <RiskTable
        risks={risks}
        search={search}
        sortBy={sortBy}
        sortDir={sortDir}
        onSort={handleSort}
      />
      <PaginationControls
        page={page}
        totalPages={totalPages}
        risksLength={risks.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;