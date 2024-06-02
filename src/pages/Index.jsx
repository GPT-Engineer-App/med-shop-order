import React, { useState } from "react";
import { Container, VStack, HStack, Text, Input, Button, IconButton, Box, Image, useToast } from "@chakra-ui/react";
import { FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";

const medicinesData = [
  { id: 1, name: "Paracetamol", stock: 10, price: 5 },
  { id: 2, name: "Ibuprofen", stock: 15, price: 8 },
  { id: 3, name: "Aspirin", stock: 20, price: 3 },
];

const Index = () => {
  const [medicines, setMedicines] = useState(medicinesData);
  const [cart, setCart] = useState([]);
  const toast = useToast();

  const addToCart = (medicine) => {
    if (medicine.stock > 0) {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === medicine.id);
        if (existingItem) {
          return prevCart.map((item) => (item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
          return [...prevCart, { ...medicine, quantity: 1 }];
        }
      });
      setMedicines((prevMedicines) => prevMedicines.map((item) => (item.id === medicine.id ? { ...item, stock: item.stock - 1 } : item)));
    } else {
      toast({
        title: "Out of Stock",
        description: `${medicine.name} is out of stock.`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const removeFromCart = (medicine) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === medicine.id);
      if (existingItem.quantity === 1) {
        return prevCart.filter((item) => item.id !== medicine.id);
      } else {
        return prevCart.map((item) => (item.id === medicine.id ? { ...item, quantity: item.quantity - 1 } : item));
      }
    });
    setMedicines((prevMedicines) => prevMedicines.map((item) => (item.id === medicine.id ? { ...item, stock: item.stock + 1 } : item)));
  };

  const placeOrder = () => {
    setCart([]);
    toast({
      title: "Order Placed",
      description: "Your order has been placed successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" fontWeight="bold">
          Medicine Shop
        </Text>
        <VStack spacing={4} width="100%">
          {medicines.map((medicine) => (
            <HStack key={medicine.id} justifyContent="space-between" width="100%" p={4} borderWidth={1} borderRadius="md">
              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  {medicine.name}
                </Text>
                <Text>Price: ${medicine.price}</Text>
                <Text>Stock: {medicine.stock}</Text>
              </Box>
              <IconButton aria-label="Add to cart" icon={<FaPlus />} onClick={() => addToCart(medicine)} />
            </HStack>
          ))}
        </VStack>
        <Text fontSize="2xl" fontWeight="bold">
          Cart
        </Text>
        <VStack spacing={4} width="100%">
          {cart.map((item) => (
            <HStack key={item.id} justifyContent="space-between" width="100%" p={4} borderWidth={1} borderRadius="md">
              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  {item.name}
                </Text>
                <Text>Price: ${item.price}</Text>
                <Text>Quantity: {item.quantity}</Text>
              </Box>
              <HStack>
                <IconButton aria-label="Remove from cart" icon={<FaMinus />} onClick={() => removeFromCart(item)} />
                <IconButton aria-label="Add to cart" icon={<FaPlus />} onClick={() => addToCart(item)} />
              </HStack>
            </HStack>
          ))}
        </VStack>
        {cart.length > 0 && (
          <Button colorScheme="teal" onClick={placeOrder}>
            Place Order
          </Button>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
