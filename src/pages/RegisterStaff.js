import { useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Select,
  useToast,
  HStack,
  SimpleGrid 
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function RegisterStaff() {
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
  });

  const handleSubmit = async () => {
    try {
      await api.post("/auth/register", formData); // backend endpoint
      toast({
        title: "Staff created.",
        description: "New staff has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to create staff.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6}>
        <VStack align="flex-start" spacing={4} w="100%">
            
            {/* Back button */}
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            ← Back
            </Button>

            <Heading size="md" mb={2}>
            Register New User (Staff)
            </Heading>

            {/* Two column form layout */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
            
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                value={formData.name}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }
                autoComplete="off"
                />
            </FormControl>

            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                }
                autoComplete="off"
                />
            </FormControl>

            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                type="password"
                value={formData.password}
                onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                }
                autoComplete="new-password"
                />
            </FormControl>

            <FormControl>
                <FormLabel>Role</FormLabel>
                <Select
                value={formData.role}
                onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                }
                >
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
                </Select>
            </FormControl>

            </SimpleGrid>

            {/* Buttons row */}
            <HStack spacing={4} mt={2}>
            <Button colorScheme="blue" onClick={handleSubmit}>
                Register User
            </Button>
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Cancel
            </Button>
            </HStack>
        </VStack>
    </Box>
  );
}
