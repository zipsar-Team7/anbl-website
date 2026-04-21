import { useState, useMemo, useEffect } from "react";
import { labData } from "../../data/labData";
import "./Publications.css";

// Removed static import: import publicationsData from '../../data/publications.json';
import { API_ENDPOINTS } from '../../config/api';

const scholarUrl = labData.labInfo.contact.googleScholar;
const ITEMS_PER_PAGE = 4;

export default function Publications() {
  const [publicationsData, setPublicationsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeYear, setActiveYear] = useState("All");
  const [activeTopic, setActiveTopic] = useState("All Topics");
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedSearch, setAppliedSearch] = useState("");

  // Custom Dropdown State
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isTopicOpen, setIsTopicOpen] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.CITATIONS);
        if (!response.ok) throw new Error("Failed to fetch publications");
        const result = await response.json();

        // Ensure year is treated as string for the filtering logic
        const formattedData = result.data.map((pub) => ({
          ...pub,
          year: pub.year ? String(pub.year) : "",
        }));

        setPublicationsData(formattedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching publications:", err);
        setError(
          "Unable to load publications. We will Get back to you as soon as possible.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  // Extract unique years for filtering
  const years = useMemo(() => {
    const allYears = publicationsData
      .map((pub) => pub.year)
      .filter((year) => year && year.length === 4);
    const uniqueYears = [...new Set(allYears)];
    return ["All", ...uniqueYears.sort((a, b) => b - a)];
  }, [publicationsData]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsYearOpen(false);
      setIsTopicOpen(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Filter logic
  const filteredPublications = useMemo(() => {
    if (!publicationsData) return [];
    return publicationsData
      .filter((pub) => {
        const matchesSearch =
          pub.title?.toLowerCase().includes(appliedSearch.toLowerCase()) ||
          pub.authors?.toLowerCase().includes(appliedSearch.toLowerCase()) ||
          pub.publication?.toLowerCase().includes(appliedSearch.toLowerCase());

        const matchesYear = activeYear === "All" || pub.year === activeYear;

        const matchesTopic =
          activeTopic === "All Topics" ||
          pub.title?.toLowerCase().includes(activeTopic.toLowerCase()) ||
          pub.publication?.toLowerCase().includes(activeTopic.toLowerCase()) ||
          pub.authors?.toLowerCase().includes(activeTopic.toLowerCase());

        return matchesSearch && matchesYear && matchesTopic;
      })
      .sort((a, b) => parseInt(b.year || 0) - parseInt(a.year || 0));
  }, [publicationsData, appliedSearch, activeYear, activeTopic]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPublications.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPublications.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPublications, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [appliedSearch, activeYear, activeTopic]);

  const handleSearch = (e) => {
    e.preventDefault();
    setAppliedSearch(searchTerm);
  };

  return (
    <main className="publications-page">
      {/* ── HERO ───────────────────────────────────────── */}
      <section className="inner-hero">
        <div className="inner-hero__bg-gradient" aria-hidden="true" />
        <div className="inner-hero__particles">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="vibrating-particle"
              style={{
                bottom: `${Math.random() * 80}px`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        <div className="container">
          <div className="inner-hero__content">
            <span className="section-label">Academic Impact</span>
            <h1 className="t-h1">Peer-Reviewed Publications</h1>
            <p className="t-body inner-hero__sub">
              Explore our laboratory's research contributions to high-impact
              international journals. Search through our complete bibliography
              or filter by year.
            </p>
            <div className="inner-hero__actions" style={{ marginTop: "32px" }}>
              <a
                href={scholarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-red"
              >
                View on Google Scholar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEARCH HUB ─────────────────────────────────── */}
      <section className="search-hub-section">
        <div className="container">
          <div className="search-hub__glass">
            <form className="search-hub__form" onSubmit={handleSearch}>
              <div className="search-hub__input-wrapper">
                <div className="search-hub__icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <input
                  type="text"
                  className="search-hub__input"
                  placeholder="Deep search publications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {(searchTerm ||
                  appliedSearch ||
                  activeYear !== "All" ||
                  activeTopic !== "All Topics") && (
                  <button
                    type="button"
                    className="search-hub__clear-btn"
                    onClick={() => {
                      setSearchTerm("");
                      setAppliedSearch("");
                      setActiveYear("All");
                      setActiveTopic("All Topics");
                    }}
                    title="Clear all filters"
                  >
                    Clear All
                  </button>
                )}
                <button type="submit" className="search-hub__submit-btn">
                  <span className="submit-btn-text">Search</span>
                  <svg
                    className="submit-btn-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <span className="btn-shine"></span>
                </button>
              </div>
            </form>

            <div className="search-hub__filters">
              <div
                className="filter-group"
                onClick={(e) => e.stopPropagation()}
              >
                <label className="filter-label">Filter by Research Area</label>
                <div
                  className={`custom-select-container ${isTopicOpen ? "open" : ""}`}
                >
                  <button
                    type="button"
                    className="custom-select-trigger"
                    onClick={() => {
                      setIsTopicOpen(!isTopicOpen);
                      setIsYearOpen(false);
                    }}
                  >
                    <span>{activeTopic}</span>
                    <div className="select-arrow"></div>
                  </button>
                  {isTopicOpen && (
                    <div className="custom-select-options">
                      <div
                        className={`custom-option ${activeTopic === "All Topics" ? "selected" : ""}`}
                        onClick={() => {
                          setActiveTopic("All Topics");
                          setIsTopicOpen(false);
                        }}
                      >
                        All Research Topics
                      </div>
                      {[
                        "Nanomedicine",
                        "Biosafety",
                        "AI",
                        "Cancer",
                        "Nanoparticles",
                      ].map((topic) => (
                        <div
                          key={topic}
                          className={`custom-option ${activeTopic === topic ? "selected" : ""}`}
                          onClick={() => {
                            setActiveTopic(topic);
                            setIsTopicOpen(false);
                          }}
                        >
                          {topic}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div
                className="filter-group"
                onClick={(e) => e.stopPropagation()}
              >
                <label className="filter-label">
                  Filter by Publication Year
                </label>
                <div
                  className={`custom-select-container ${isYearOpen ? "open" : ""}`}
                >
                  <button
                    type="button"
                    className="custom-select-trigger"
                    onClick={() => {
                      setIsYearOpen(!isYearOpen);
                      setIsTopicOpen(false);
                    }}
                  >
                    <span>
                      {activeYear === "All"
                        ? "All Publication Years"
                        : activeYear}
                    </span>
                    <div className="select-arrow"></div>
                  </button>
                  {isYearOpen && (
                    <div className="custom-select-options">
                      <div
                        className={`custom-option ${activeYear === "All" ? "selected" : ""}`}
                        onClick={() => {
                          setActiveYear("All");
                          setIsYearOpen(false);
                        }}
                      >
                        All Publication Years
                      </div>
                      {years
                        .filter((y) => y !== "All")
                        .map((year) => (
                          <div
                            key={year}
                            className={`custom-option ${activeYear === year ? "selected" : ""}`}
                            onClick={() => {
                              setActiveYear(year);
                              setIsYearOpen(false);
                            }}
                          >
                            {year}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS LIST ─────────────────────────── */}
      <section className="results-section">
        <div className="container">
          <div className="results-header">
            <div className="results-info">
              <h2 className="results-title">
                {activeYear === "All"
                  ? "Complete Bibliography"
                  : `${activeYear} Publications`}
              </h2>
              <p className="results-count">
                Found {filteredPublications.length} peer-reviewed articles
              </p>
            </div>
            {appliedSearch && (
              <button
                className="clear-search-btn"
                onClick={() => {
                  setSearchTerm("");
                  setAppliedSearch("");
                }}
              >
                Clear Search: <strong>{appliedSearch}</strong> <span>×</span>
              </button>
            )}
          </div>

          <div className="publications-grid">
            {loading ? (
              <div className="loading-state center">
                <div className="spinner"></div>
                <p>Fetching latest research...</p>
              </div>
            ) : error ? (
              <div className="error-state center">
                <div className="error-icon">⚠️</div>
                <p>{error}</p>
                <button
                  className="btn btn-outline"
                  onClick={() => window.location.reload()}
                >
                  Retry Connection
                </button>
              </div>
            ) : (
              paginatedItems.map((pub, index) => (
                <div
                  key={pub._id || index}
                  className="pub-card"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="pub-card__main">
                    <div className="pub-card__header">
                      <span className="pub-card__year-badge">{pub.year}</span>
                      <span className="pub-card__journal">
                        {pub.publication}
                      </span>
                    </div>
                    <h3 className="pub-card__title">{pub.title}</h3>
                    <p className="pub-card__authors">{pub.authors}</p>
                    <div className="pub-card__footer">
                      <div className="pub-card__meta">
                        {pub.volume && (
                          <span className="meta-item">Vol. {pub.volume}</span>
                        )}
                        {pub.number && (
                          <span className="meta-item">No. {pub.number}</span>
                        )}
                        {pub.pages && (
                          <span className="meta-item">pp. {pub.pages}</span>
                        )}
                      </div>
                      <div className="pub-card__actions">
                        <a
                          href={
                            pub.url ||
                            `https://scholar.google.com/scholar?q=${encodeURIComponent(pub.title)}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pub-card__scholar-link"
                        >
                          View Article
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {!loading && !error && filteredPublications.length === 0 && (
              <div className="no-results center">
                <div className="no-results-icon">∅</div>
                <p className="t-h3">
                  No publications found matching your search.
                </p>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setSearchTerm("");
                    setAppliedSearch("");
                    setActiveYear("All");
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-nav"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>
              <div className="page-numbers">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    className={`page-num ${currentPage === i + 1 ? "active" : ""}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                className="page-nav"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
