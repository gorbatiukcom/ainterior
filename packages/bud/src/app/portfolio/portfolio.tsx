"use client";

import { Flex, Image, Text } from "@chakra-ui/react";

import { Link } from "../../components/link";
import { PortfolioProjects } from "../../constants/portfolio";

export const Portfolio = () => {
  return (
    <Flex
      flexWrap="wrap"
      maxWidth={["calc(100% - 32px)", "calc(100% - 16px)"]}
      mx="auto"
      gap={[4, 2]}
      mt={[4, "52px"]}
      pb="16px"
    >
      {PortfolioProjects.map(({ name, image, projectId, shortDescription, description }) => {
        return (
          <Link href={`/portfolio/${projectId}`} key={projectId} width={["100%", "calc(50% - 5px)"]}>
            <Flex
              key={name}
              position="relative"
              role="group"
              cursor="pointer"
              flexDirection="column"
              borderRadius={["8px", null]}
              boxShadow={["0px 4px 6px 0px rgba(0, 0, 0, 0.25)", null]}
              pb={[4, 0]}
              bg="bgPrimary"
              height="100%"
            >
              <Image
                src={image}
                alt={name}
                width="100%"
                borderRadius={["8px 8px 0px 0px", "8px"]}
                maxHeight="720px"
                height="100%"
                objectFit="cover"
                _groupHover={{
                  lg: {
                    filter: "auto",
                    brightness: "50%",
                    transitionDuration: "0.2s",
                  },
                }}
              />
              <Text display={["block", "none"]} fontSize="18px" px={4} pt={2}>
                {name}
              </Text>
              {shortDescription ? (
                <Text display={["block", "none"]} fontSize="14px" fontWeight={300} px={4}>
                  {shortDescription}
                </Text>
              ) : null}

              <Flex
                flexDirection="column"
                position="absolute"
                bottom="48px"
                left="48px"
                pr={[0, "48px"]}
              >
                <Text
                  display={["none", "block"]}
                  color="transparent"
                  fontSize="40px"
                  _groupHover={{
                    color: "white",
                    transitionDuration: "0.2s",
                  }}
                >
                  {name}
                </Text>
                {shortDescription ? (
                  <Text
                    display={["none", "block"]}
                    color="transparent"
                    fontSize="20px"
                    _groupHover={{
                      color: "white",
                      transitionDuration: "0.2s",
                    }}
                    fontWeight={400}
                  >
                    {shortDescription}
                  </Text>
                ) : null}
              </Flex>
            </Flex>
          </Link>
        );
      })}
    </Flex>
  );
};
