import React, { useEffect, useState, useRef } from "react";

/**
 * User.jsx – clean, self‑contained user list with:
 *   • Search (name & username)
 *   • Column sorting (including nested props like address.city)
 *   • Client‑side pagination (5 per page)
 *   • JSON export/import with validation
 */
export default function User() {
  const [users, setUsers] = useState([]); // master list
  const [displayedUsers, setDisplayedUsers] = useState([]); // filtered / sorted view
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
      .catch(console.error);
  }, []);

  const getNested = (obj, path) =>
    path.split(".").reduce((o, key) => (o ? o[key] : undefined), obj);

  const compareBy = (key, asc) => (a, b) => {
    const aVal = getNested(a, key)?.toString().toLowerCase() ?? "";
    const bVal = getNested(b, key)?.toString().toLowerCase() ?? "";
    if (aVal < bVal) return asc ? -1 : 1;
    if (aVal > bVal) return asc ? 1 : -1;
    return 0;
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = users.filter(
      (u) =>
        u.name.toLowerCase().includes(value) ||
        u.username.toLowerCase().includes(value)
    );
    setDisplayedUsers(filtered);
    setPage(1);
  };

  const handleSort = (key) => {
    const asc = key === sortKey ? !sortAsc : true;
    const sorted = [...displayedUsers].sort(compareBy(key, asc));
    setSortKey(key);
    setSortAsc(asc);
    setDisplayedUsers(sorted);
  };

  const handleExport = () => {
    const json = JSON.stringify(users, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        if (Array.isArray(data)) {
          setUsers(data);
          setDisplayedUsers(data);
        } else if (Array.isArray(data.users)) {
          setUsers(data.users);
          setDisplayedUsers(data.users);
        } else {
          throw new Error("Imported JSON must be an array or { users: [...] }");
        }
        setSearch("");
        setPage(1);
      } catch (err) {
        alert(err.message || "Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginated = Array.isArray(displayedUsers)
    ? displayedUsers.slice(startIndex, startIndex + itemsPerPage)
    : [];
  const totalPages = Math.max(1, Math.ceil((Array.isArray(displayedUsers) ? displayedUsers.length : 0) / itemsPerPage));

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "address.city", label: "City" },
    { key: "website", label: "Website" },
    { key: "company.name", label: "Company" },
  ];

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>📋 User List</h2>

        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by name or username..."
          style={styles.input}
        />

        <div style={styles.actions}>
          <button style={styles.button} onClick={handleExport}>⬇️ Export</button>
          <button style={styles.button} onClick={() => fileInputRef.current?.click()}>⬆️ Import</button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept=".json"
            onChange={handleImport}
          />
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              {columns.map(({ key, label }) => (
                <th key={key} onClick={() => handleSort(key)} style={styles.th}>
                  {label} {sortKey === key && (sortAsc ? "▲" : "▼")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((u) => (
              <tr key={u.id}>
                <td style={styles.td}>{u.id}</td>
                <td style={styles.td}>{u.name}</td>
                <td style={styles.td}>{u.username}</td>
                <td style={styles.td}>{u.email}</td>
                <td style={styles.td}>{u.phone}</td>
                <td style={styles.td}>{u.address?.city}</td>
                <td style={styles.td}>{u.website}</td>
                <td style={styles.td}>{u.company?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>

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
    gap: 10,
    marginBottom: 20,
  },
  button: {
    padding: "10px 16px",
    borderRadius: 6,
    backgroundColor: "#111",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  th: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    fontWeight: 600,
    borderBottom: "2px solid #ddd",
    color: "#222",
    cursor: "pointer",
    userSelect: "none",
  },
  td: {
    padding: 12,
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
    fontWeight: 600,
  },
  pageText: {
    fontSize: 16,
    fontWeight: 500,
    color: "#555",
  },
};
