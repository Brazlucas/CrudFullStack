import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "../components/GridComponent/Grid";
import Form from "../components/FormComponent/Form";
import { Container, Title, Footer, FooterTitle, FooterSubTitle } from "./Styles";
import { getUsers } from "../services/usersService";
import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        toast.error(error);
      }
    })();
  }, [setUsers]);

  return (
    <div>
      <>
        <Container>
          <Title>USUÁRIOS</Title>
        </Container>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      </>
      <Footer>
        <FooterTitle>Desenvolvido por Lucas Braz &copy;</FooterTitle>
        <br/>
        <FooterSubTitle>Este projeto foi desenvolvido em: Express, React e MySQL</FooterSubTitle>
      </Footer>
    </div>
  );
}

export default Users;