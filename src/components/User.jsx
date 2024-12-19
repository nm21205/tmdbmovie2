import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const User = () => { // props의 이름을 변경
  const { id } = useParams();
  const [user, setUser] = useState(null); // 상태 변수는 그대로 유지
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then((res)=>{
      setUser(res.data)
      setLoading(false)
    })
    // API 호출 및 사용자 정보 설정 로직이 여기에 들어가야 합니다.
  }, [id]);

  return (
    <div className='userWrap'>
      {/* 사용자 정보를 렌더링하는 코드가 여기에 들어가야 합니다. */}
      <h2>user</h2>
      <div className="userDetail">
        {isLoading ? (<div className='loding'>로딩중...</div>) : (
          <div>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.website}</p>
          </div>
        )
        }
      </div>
    </div>
  );
}

export default User;