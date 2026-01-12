import { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Select,
  HStack,
  useToast,
  SimpleGrid
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

export default function MemberFormPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // member ID from URL
  const toast = useToast();

  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    date_of_birth: "",
    phone: "",
    email: "",
    address: "",
    emergency_contact: "",
    membership_status: "Active",
    membership_start: "",
    membership_end: "",
    remarks: "",
  });
  delete formData.created_at;
  delete formData.updated_at;

  const [isEdit, setIsEdit] = useState(false);

  // Load member data if editing
  useEffect(() => {
    if (id) {
      // Editing existing member
      setIsEdit(true);
      api
        .get(`/members/${id}`)
        .then((res) => { 
            setFormData(prev => ({
                ...prev,
                ...res.data,
                date_of_birth: res.data.date_of_birth?.slice(0, 10),
                membership_start: res.data.membership_start?.slice(0, 10),
                membership_end: res.data.membership_end?.slice(0, 10),
            }));})
        .catch((err) => console.error(err));
    }
   
  }, [id]);


  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await api.put(`/members/${id}`, formData);
        toast({
          title: "Member updated.",
          description: "Member details have been updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        await api.post("/members", formData);
        toast({
          title: "Member registered.",
          description: "New member has been added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "Operation failed.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6}>

        <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            ← Back
        </Button>

        <VStack align="flex-start" spacing={4} p={6}>
            
            <Heading size="md">
                {isEdit ? "Edit Member" : "Register Member"}
            </Heading>

            {/* Two-column layout */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
                
                <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input
                    value={formData.full_name}
                    onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                    }
                    autoComplete="off"
                />
                </FormControl>

                <FormControl>
                <FormLabel>Gender</FormLabel>
                <Select
                    value={formData.gender}
                    onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                    }
                >
                    {/* <option value="">Select</option> */}
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Select>
                </FormControl>

                <FormControl>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) =>
                    setFormData({ ...formData, date_of_birth: e.target.value })
                    }
                />
                </FormControl>

                <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                    value={formData.phone}
                    onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                    }
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
                <FormLabel>Address</FormLabel>
                <Input
                    value={formData.address}
                    onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                    }
                />
                </FormControl>

                <FormControl>
                <FormLabel>Emergency Contact</FormLabel>
                <Input
                    value={formData.emergency_contact}
                    onChange={(e) =>
                    setFormData({
                        ...formData,
                        emergency_contact: e.target.value,
                    })
                    }
                />
                </FormControl>

                <FormControl>
                <FormLabel>Membership Status</FormLabel>
                <Select
                    value={formData.membership_status}
                    onChange={(e) =>
                    setFormData({
                        ...formData,
                        membership_status: e.target.value,
                    })
                    }
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="frozen">Frozen</option>
                </Select>
                </FormControl>

                <FormControl>
                <FormLabel>Start Date</FormLabel>
                <Input
                    type="date"
                    value={formData.membership_start}
                    onChange={(e) =>
                    setFormData({
                        ...formData,
                        membership_start: e.target.value,
                    })
                    }
                />
                </FormControl>

                <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input
                    type="date"
                    value={formData.membership_end}
                    onChange={(e) =>
                    setFormData({
                        ...formData,
                        membership_end: e.target.value,
                    })
                    }
                />
                </FormControl>

                <FormControl gridColumn={{ base: "auto", md: "1 / -1" }}>
                <FormLabel>Remarks</FormLabel>
                <Input
                    value={formData.remarks}
                    onChange={(e) =>
                    setFormData({ ...formData, remarks: e.target.value })
                    }
                />
                </FormControl>

            </SimpleGrid>

            <HStack spacing={4}>
                <Button colorScheme="blue" onClick={handleSubmit}>
                {isEdit ? "Update Member" : "Register Member"}
                </Button>
                <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Cancel
                </Button>
            </HStack>
        </VStack>
    </Box>
    );

}
