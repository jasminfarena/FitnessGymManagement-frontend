import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Box, Input, Button, Heading, VStack, Text } from "@chakra-ui/react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      console.log('Response', res);        // entire Axios response
      console.log('Response data', res.data); // actual body sent by backend
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);

      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <Box minH="100vh" display="flex" justifyContent="center" alignItems="center">
      <VStack spacing={4} p={8} borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <Heading size="md">Fitness Centre Login</Heading>

        <Input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {error && <Text color="red.400">{error}</Text>}

        <Button width="100%" colorScheme="blue" onClick={handleLogin}>
          Login
        </Button>
      </VStack>
    </Box>
  );
}
