import React, { useEffect, useRef } from "react";
import { FormContainer, InputArea, Label, Input, Button } from "./Styles";
import { createUser, updateUser } from "../../services/usersService";
import { toast } from "react-toastify";

const Form = ({ onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.fone.value = onEdit.fone;
      user.data_nascimento.value = onEdit.data_nascimento;
    }
  }, [onEdit]);

  const handleSubmit = async () => {
    const user = ref.current;

    if (
      !user.nome.value ||
      !user.email.value ||
      !user.fone.value ||
      !user.data_nascimento.value
    ) {
      return toast.warn("Preencha todos os campos!");
    };

    if (onEdit) {
      await updateUser({
        nome: user.nome.value,
        email: user.email.value,
        fone: user.fone.value,
        data_nascimento: user.data_nascimento.value,
        
      }, onEdit.id)
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
 
    } else {
      await createUser({
        nome: user.nome.value,
        email: user.email.value,
        fone: user.fone.value,
        data_nascimento: user.data_nascimento.value,
      })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }
    user.nome.value = "";
    user.email.value = "";
    user.fone.value = "";
    user.data_nascimento.value = "";

    onEdit(null);
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>Email</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="fone" />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="data_nascimento" type="date" />
      </InputArea>
      <Button style={{marginTop: "23px"}} type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;