import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    employeeId: '',
    fullName: '',
    email: '',
    phone: ''
  });
  const [editingId, setEditingId] = useState(null);

  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/api/employees', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async () => {
    try {
      if (editingId) {
        await api.put(`/api/employees/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await api.post('/api/employees', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchEmployees();
      resetForm();
    } catch (err) {
      console.error('Add/Update error:', err);
    }
  };

  const handleEdit = (emp) => {
    setFormData(emp);
    setEditingId(emp._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await api.delete(`/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEmployees();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const resetForm = () => {
    setFormData({ employeeId: '', fullName: '', email: '', phone: '' });
    setEditingId(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredEmployees = employees.filter(emp =>
    emp.fullName.toLowerCase().includes(search.toLowerCase()) ||
    emp.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Employee Dashboard</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="filters">
        <input
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          value={formData.employeeId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <button className="add-btn" onClick={handleAddOrUpdate}>
          {editingId ? 'Update Employee' : 'Add Employee'}
        </button>
        <input
          className="search"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.employeeId}</td>
              <td>{emp.fullName}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(emp)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(emp._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;


// // src/components/Dashboard.jsx
// import React, { useState, useEffect } from 'react';
// import api from '../services/api';
// import '../styles/Dashboard.css';

// const Dashboard = () => {
//   const [employees, setEmployees] = useState([]);
//   const [search, setSearch] = useState('');
//   const [formData, setFormData] = useState({
//     employeeId: '', fullName: '', email: '', phone: ''
//   });
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const res = await api.get('/api/employees'); // uses token in header
//       setEmployees(res.data);
//     } catch (err) {
//       console.error('Fetch error:', err);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({...formData, [e.target.name]: e.target.value });
//   };

//   const handleAddOrUpdate = async () => {
//     try {
//       if (editingId) {
//         await api.put(`/api/employees/${editingId}`, formData);
//       } else {
//         await api.post('/api/employees', formData);
//       }
//       fetchEmployees();
//       resetForm();
//     } catch (err) {
//       console.error('Add/Update error:', err);
//     }
//   };

//   const handleEdit = (emp) => {
//     setFormData(emp);
//     setEditingId(emp._id);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this employee?')) return;
//     try {
//       await api.delete(`/api/employees/${id}`);
//       fetchEmployees();
//     } catch (err) {
//       console.error('Delete error:', err);
//     }
//   };

//   const resetForm = () => {
//     setFormData({ employeeId: '', fullName: '', email: '', phone: '' });
//     setEditingId(null);
//   };

//   const filteredEmployees = employees.filter(emp =>
//     emp.fullName.toLowerCase().includes(search.toLowerCase()) ||
//     emp.email.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="dashboard-container">
//       <button onClick={() => window.location.href = "/"} className="back-btn">← Return to Home</button>
//       <h2>Employee Dashboard</h2>

//       <div className="filters">
//         <input type="text" name="employeeId" placeholder="Employee ID" value={formData.employeeId} onChange={handleChange} />
//         <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//         <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
//         <button className="add-btn" onClick={handleAddOrUpdate}>
//           {editingId ? 'Update Employee' : 'Add Employee'}
//         </button>
//         <input
//           className="search"
//           placeholder="Search employees..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>Employee ID</th>
//             <th>Full Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredEmployees.map(emp => (
//             <tr key={emp._id}>
//               <td>{emp.employeeId}</td>
//               <td>{emp.fullName}</td>
//               <td>{emp.email}</td>
//               <td>{emp.phone}</td>
//               <td>
//                 <button className="edit" onClick={() => handleEdit(emp)}>Edit</button>
//                 <button className="delete" onClick={() => handleDelete(emp._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Dashboard;
