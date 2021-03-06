import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getContent } from "./Api";
import User from "./User";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

export default function Users({ setLoggedIn }) {
  const [users, setUsers] = useState([{}]);
  const [search, setSearch] = useState(null);
  const [initialList, setInitialList] = useState([{}]);

  const logout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  const listUsers = () => {
    getContent(localStorage.jwt)
      .then((res) => {
        setInitialList(res)
        setUsers(res)
      })
      .catch((err) => console.log(err));
  }
  
  useEffect(() => {
    listUsers();
  }, []);

  const sortDown = () => {
    const sort = [...users].sort((a,b) => b.id - a.id)
    setUsers(sort);
  }

  const sortUp = () => {
    const sort = [...users].sort((a,b) => a.id - b.id)
    setUsers(sort);
  }

  const handleChange = e => setSearch(e.target.value);

  const filterino = (search) => {
    return users.filter(el => {
      return el.username.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }
  
  useEffect(() => {
    if (!search) {
      return setUsers(initialList)
    } else {
      return setUsers(filterino(search));
    }
  }, [search]);
  
  return (
    <main className="content">
      <input type="text" placeholder="Поиск по логину" value={search || ''} onChange={handleChange}/>
      <ul>
        <li>
          <span className="content__list">ID <ArrowDropDownIcon onClick={sortDown}/><ArrowDropUpIcon onClick={sortUp}/></span>
          <span className="content__list">Username</span>
          <span className="content__list">Last login</span>
        </li>
        {users.map((item, index) => (
          <User item={item} key={index} />
        ))}
      </ul>
      <Button size="large" fullWidth variant="contained" color="primary" onClick={logout}>Выйти</Button>
    </main>
  );
}