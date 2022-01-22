import logo from "../../assets/logo.png";

import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import Loader from "react-loader-spinner";
import { Container, Button, Input } from "./styles";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    image: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const promiseLogin = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
      formData
    );
    promiseLogin.then((answer) => {
      setLoading(false);
      navigate("/");
    });
    promiseLogin.catch((error) => {
      error.response.data.details === undefined
        ? alert(error.response.data.message)
        : alert(error.response.data.details);
      setLoading(false);
    });
  }

  return (
    <Container>
      <img src={logo} alt="logo" />
      <form onSubmit={handleSubmit}>
        <Input
          required
          disabled={loading}
          type="email"
          placeholder="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          required
          disabled={loading}
          type="password"
          placeholder="senha"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <Input
          required
          disabled={loading}
          type="text"
          placeholder="nome"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          required
          disabled={loading}
          type="url"
          placeholder="imagem"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "" : "Cadastrar"}
          <Loader
            type="ThreeDots"
            color="#FAFAFA"
            height={43}
            width={55}
            visible={loading}
          />
        </Button>
      </form>
      <h1 onClick={() => navigate("/")}>Não tem uma conta? Cadastre-se!</h1>
    </Container>
  );
}
