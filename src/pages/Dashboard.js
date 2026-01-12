import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  VStack,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Dashboard() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();
  const userName = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  // Fetch members
  const loadMembers = async () => {
    try {
      const res = await api.get("/members");
      setMembers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  // Filtered members
  const filteredMembers = members.filter(
    (m) =>
      m.full_name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.address.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box p={4}>
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        mb={6}
        flexWrap={{ base: "wrap", md: "nowrap" }}
      >
        <Heading size="lg" mb={{ base: 2, md: 0 }}>
          Welcome to Fitness Centre
        </Heading>

        <Flex align="center" gap={4}>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="outline"
              w={{ base: "150px", md: "220px" }}
              px={4}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack spacing={2}>
                <Avatar size="sm" name={userName} />
                <Text isTruncated maxW={{ base: "100px", md: "150px" }}>
                  {userName || "User"}
                </Text>
              </HStack>
            </MenuButton>
            <MenuList>
              {/* <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem> */}
              {role === "admin" && (
                <MenuItem onClick={() => navigate("/register-staff")}>Register Staff</MenuItem>
              )}
              <MenuItem onClick={() => navigate("/register-member")}>Register Member</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {/* Search bar */}
      <Input
        placeholder="Search by name, email, or address..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // reset to first page when searching
        }}
        mb={4}
      />

      {/* Members Table */}
      <Table variant="striped" size="sm" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Full Name</Th>
            <Th>Email</Th>
            <Th>Address</Th>
            <Th>Status</Th>
            <Th>Membership Start</Th>
            <Th>Membership End</Th>
          </Tr>
        </Thead>

        <Tbody>
        {paginatedMembers.map((m) => {
            let bgColor = "transparent";
            if (m.membership_status === "Inactive") bgColor = "red.100";
            else if (m.membership_status === "Frozen") bgColor = "yellow.100";

            return (
            <Tr key={m.id} bg={bgColor}>
                <Td>{m.full_name}</Td>
                <Td>{m.email}</Td>
                <Td>{m.address}</Td>
                <Td>{m.membership_status}</Td>
                <Td>{m.membership_start?.slice(0, 10)}</Td>
                <Td>{m.membership_end?.slice(0, 10)}</Td>

                {/* Update/Edit button */}
                <Td>
                <IconButton
                    aria-label="Edit Member"
                    icon={<FaEdit />}
                    size="sm"
                    colorScheme="blue"
                    onClick={() => navigate(`/member/${m.id}`)}
                />
                </Td>
            </Tr>
            );
        })}
        </Tbody>
      </Table>

      {/* Pagination */}
      <Flex justify="flex-end" mt={4} gap={2}>
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          aria-label="Previous page"
        />
        <Text alignSelf="center">
          Page {page} of {totalPages}
        </Text>
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || totalPages === 0}
          aria-label="Next page"
        />
      </Flex>
    </Box>
  );
}
