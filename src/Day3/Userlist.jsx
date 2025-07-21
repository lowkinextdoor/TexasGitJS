import React, { useEffect, useState, useRef } from "react";

export default function Userlist() {
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("id");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setDisplayedUsers(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(value) ||
        user.username.toLowerCase().includes(value)
    );
    setDisplayedUsers(filtered);
    setPage(1); // Reset page on search
  };

  const handleSort = (key) => {
    const asc = key === sortKey ? !sortAsc : true;
    const sorted = [...displayedUsers].sort((a, b) => {
      const aVal = a[key]?.toString().toLowerCase();
      const bVal = b[key]?.toString().toLowerCase();
      return asc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
    setSortKey(key);
    setSortAsc(asc);
    setDisplayedUsers(sorted);
  };

  const handleExport = () => {
    const json = JSON.stringify(displayedUsers, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "userlist.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setUsers(data);
        setDisplayedUsers(data);
        setSearch("");
        setPage(1);
      } catch {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginated = displayedUsers.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(displayedUsers.length / itemsPerPage);

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>📋 User List</h2>

        {/* Search bar */}
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by name or username..."
          style={styles.input}
        />

        {/* Export/Import */}
        <div style={styles.actions}>
          <button style={styles.button} onClick={handleExport}>⬇️ Export</button>
          <button style={styles.button} onClick={() => fileInputRef.current.click()}>⬆️ Import</button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept=".json"
            onChange={handleImport}
          />
        </div>

        {/* Table */}
        <table style={styles.table}>
          <thead>
            <tr>
              {["id", "name", "username", "email", "phone", "address.city", "website", "company.name"].map((key, idx) => {
                const label = key.includes(".") ? key.split(".")[0] : key;
                return (
                  <th
                    key={idx}
                    onClick={() => handleSort(key.includes(".") ? key.split(".")[0] : key)}
                    style={styles.th}
                  >
                    {label.charAt(0).toUpperCase() + label.slice(1)}{" "}
                    {sortKey === label && (sortAsc ? "▲" : "▼")}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paginated.map((user) => (
              <tr key={user.id}>
                <td style={styles.td}>{user.id}</td>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.username}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.phone}</td>
                <td style={styles.td}>{user.address.city}</td>
                <td style={styles.td}>{user.website}</td>
                <td style={styles.td}>{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={styles.pagination}>
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            style={styles.pageButton}
          >
            ◀ Prev
          </button>
          <span style={styles.pageText}>Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            style={styles.pageButton}
          >
            Next ▶
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    padding: 30,
    width: "100%",
    maxWidth: 1200,
    fontFamily: "'Segoe UI', sans-serif",
  },
  title: {
    fontSize: 26,
    fontFamily: "'Benguiat Bold', serif",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    fontSize: 16,
    marginBottom: 20,
    borderRadius: 8,
    border: "1px solid #ccc",
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginBottom: 20,
  },
  button: {
    padding: "10px 16px",
    borderRadius: 6,
    backgroundColor: "#111",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  th: {
    padding: "12px",
    backgroundColor: "#f0f0f0",
    fontWeight: "600",
    borderBottom: "2px solid #ddd",
    color: "#222",
    cursor: "pointer",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    color: "#333",
    fontSize: 15,
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "center",
  },
  pageButton: {
    padding: "8px 16px",
    borderRadius: 6,
    backgroundColor: "#111",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
  },
  pageText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
};
