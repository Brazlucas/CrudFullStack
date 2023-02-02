import React from "react";
import { Table, Thead, Tbody, Td, Tr, Th } from "./Styles";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { deleteUser } from "../../services/usersService";

const Grid = ({ users, setUsers, setOnEdit }) => {

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await deleteUser(id)
    .then(({ data }) => {
      const newArray = users.filter((user) => user.id !== id);

      setUsers(newArray);
      toast.success(data);
    })
    .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  }

  {console.log(users)}
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th onlyWeb>Fone</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
       {users.map((item, i) => (
         <Tr key={i}>
          <Td width="30%">{item.nome}</Td>
          <Td width="30%">{item.email}</Td>
          <Td width="20%" onlyWeb>{item.fone}</Td>
          <Td alignCenter width="5%">
            <FaEdit style={{cursor: "pointer"}} onClick={() => handleEdit(item)} />
          </Td>
            <Td alignCenter width="5%">
              <FaTrash style={{cursor: "pointer"}} onClick={() => handleDelete(item.id)} />
            </Td>
        </Tr>
       ))}
      </Tbody>
    </Table>
  );
};

export default Grid;