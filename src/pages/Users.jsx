import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 


const Users = () => {
  const [users, setUsers] = useState([]);
  const[modal, setModal] = useState(false);
  const[selectedUser, setSelectedUser] = useState(null);

  const userInfo = (user)=>{
    setSelectedUser(user);
  }


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error); // 오류 처리
      });
  }, []); // 빈 배열을 의존성으로 설정하여 컴포넌트가 마운트될 때만 실행

  return (
    <div>
      <h2>User List</h2>
      {
        users.map((user) => (
          <div className='userCard' onClick={(e)=>{e.stopPropagation(); userInfo(user)}}> {/* 각 사용자에 대한 고유 키 추가 */}
            {/* <Link to={`/users/${user.id}`}>{user.name}</Link> user.id 사용 */}
            <div className="active" onClick={()=>{setModal(!modal)}}>
{user.name}
            </div>
          </div>
        ))
      }
{
  modal === true ? <Modal userInfo={selectedUser}/> : null
}
    </div>
  );
};

function Modal({userInfo}){
  return(
    <div className='modal'>
<p>{userInfo.name}</p>
<p>{userInfo.phone}</p>
<p>{userInfo.website}</p>

    </div>
  )
}


export default Users;