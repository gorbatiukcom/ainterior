"use client";

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

import { Link } from "@/components/link";

import { SubmitConfirmation } from "./SubmitConfirmation";

type Inputs = {
  email: string;
  phone: string;
  message: string;
};

const InputStyle = {
  borderRadius: "0px",
  borderColor: "black",
  _focus: {
    boxShadow: "0 0 0 1px var(--chakra-colors-brand-blue)",
    borderColor: "brand.blue",
  },
};

export default function Home() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    axios.defaults.headers.post["Content-Type"] = "application/json";
    await axios
      .post("https://formsubmit.co/ajax/09c987a40e8f6ede638acae3f760f547", data)
      .catch((error) => {
        console.log("🚀 ~ sendForm ~ error:", error);
      });
  };

  if (isSubmitSuccessful) {
    return <SubmitConfirmation />;
  }
  return (
    <Flex p="40px" my="40px" mx="auto" width="100%" maxWidth="1000px" border="1px dashed">
      <Flex flexDirection="column" borderRight="1px dashed" width="100%" pr="60px">
        <Text fontSize="60px" lineHeight="60px" fontWeight={700} pb="40px">
          Cześć
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.email?.message}>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input
              {...InputStyle}
              id="email"
              placeholder="Wpisz swój e-mail tutaj..."
              {...register("email", {
                required: "To pole jest wymagane",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail jest nieprawidłowy",
                },
              })}
            />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.phone?.message} mt={4}>
            <FormLabel htmlFor="phone">Telefon</FormLabel>
            <Input
              {...InputStyle}
              id="phone"
              placeholder="Wpisz swój telefon tutaj..."
              {...register("phone")}
            />
            <FormErrorMessage>{errors.phone && errors.phone.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.message?.message} mt={4}>
            <FormLabel htmlFor="name">Wiadomosć</FormLabel>
            <Textarea
              {...InputStyle}
              id="message"
              placeholder="Wpisz swoją wiadomosć tutaj..."
              rows={4}
              {...register("message", {
                required: "To pole jest wymagane",
              })}
            />
            <FormErrorMessage>{errors.message && errors.message.message}</FormErrorMessage>
          </FormControl>
          <Flex justifyContent="flex-end">
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              bg="black"
              color="white"
              borderRadius="0px"
              fontWeight={400}
              fontSize="20px"
              px={7}
              height="44px"
              _hover={{
                bg: "gray.800",
                color: "brand.blue",
              }}
            >
              Wysłać
            </Button>
          </Flex>
        </form>
      </Flex>
      <Flex
        flexDirection="column"
        paddingLeft="36px"
        maxWidth="360px"
        justifyContent="space-between"
      >
        <Flex flexDirection="column">
          <Text fontSize="24px" fontWeight={600} pb="24px">
            Nazwa firmy i adres do korespondencji
          </Text>
          <Text fontSize="16px" fontWeight={300}>
            Volantes Sp z o.o.
          </Text>
          <Text fontSize="16px" fontWeight={300}>
            NIP: 725 230 67 13
          </Text>
          <Text fontSize="16px" fontWeight={300}>
            Aleja Tadeusza Kościuszki 80/82 lok.301
          </Text>
          <Text fontSize="16px" fontWeight={300}>
            Łódż 90-437
          </Text>
        </Flex>
        <Flex flexDirection="column">
          <Text fontSize="24px" fontWeight={600} pb="24px">
            Kontakty
          </Text>
          <Link
            href="tel:+48536089652"
            fontSize="16px"
            fontWeight={400}
            cursor="pointer"
            _hover={{
              color: "brand.blue",
            }}
          >
            +48 536 089 652
          </Link>
          <Link
            href="mailto:admiralinterior.info@gmail.com"
            fontSize="16px"
            fontWeight={400}
            cursor="pointer"
            _hover={{
              color: "brand.blue",
            }}
          >
            admiralinterior.info@gmail.com
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
