import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    filterUsers();
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterUsers = () => {
    const query = searchQuery.toLowerCase();
    const filteredUsers = users.filter((user) => {
      const { name, username, email } = user;
      return (
        name.toLowerCase().includes(query) ||
        username.toLowerCase().includes(query) ||
        email.toLowerCase().includes(query)
      );
    });
    setFilteredUsers(filteredUsers);
  };

  return (
    <div className="container">
      <div className='input-search-container'>
        <input
          type="text"
          placeholder="Search for influencers"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? 'white-row' : 'alt-row'}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td><Link to={user.website} target='_blank'>{user.website}</Link></td>
              </tr>
            ))
          ) : (
            users.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? 'white-row' : 'alt-row'}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td><Link to={user.website} target='_blank'>{user.website}</Link></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
