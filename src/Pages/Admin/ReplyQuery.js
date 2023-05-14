import React, { useEffect, useState } from 'react';
import axios from "axios";
import {useLocation, useNavigate} from 'react-router-dom';
import { Form, Button, FormControl } from "react-bootstrap";

export default function ReplyQuery() {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [replyTexts, setReplyTexts] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const id = location.state.id.id.id;
      const url = `http://localhost:8081/api/admin/quries`;
      const result = await axios.get(url, { headers: {"Authorization" : `Bearer ${location.state.id.id.token}`} })
      setUsers(result.data);
      setReplyTexts(Array(result.data.length).fill(''));
    } catch (error) {
      console.error(error);
    }
  }


  const reply = async (id, index) => {
    try {console.log(id);
      const url = `http://localhost:8081/api/admin/reply-querys/${id}`;
     // const data = { queryId: id, replyText: replyTexts[index] };
      const result = await axios.post(url,replyTexts[index], { headers: {"Authorization" : `Bearer ${location.state.id.id.token}`} });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const handleReplyTextChange = (event, index) => {
    const newReplyTexts = [...replyTexts];
    newReplyTexts[index] = event.target.value;
    setReplyTexts(newReplyTexts);
  }

  return (
    <div className='container'>
      <div className='py-4'>
        <table className='table border shadow'>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Subject</th>
              <th scope="col">Query</th>
              <th scope="col">Action</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user,index)=>(
              <tr key={user.id}>
                <th scope="row">{index+1}</th>
                <td>{user.subject}</td>
                <td>{user.queryText}</td>
                <td>
                  <Form>
                    <FormControl
                      as="textarea"
                      rows={3}
                      placeholder="Reply"
                      value={replyTexts[index]}
                      onChange={(event) => handleReplyTextChange(event, index)}
                    />
                  </Form>
                </td>
                <td>
                  <Button
                    className="btn btn-danger btn-lg btn-block"
                    onClick={() => reply(user.id, index)}
                  >
                   Submit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
