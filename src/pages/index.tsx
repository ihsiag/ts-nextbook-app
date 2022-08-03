import type { NextPage } from "next";
import Link from "next/link";
import Text from "components/atoms/Text";
import Box from "components/layout/Box";
import Flex from "components/layout/Flex";
import Layout from "components/templates/Layout";
import { useAuthGaurd } from "utils/hooks";
import styled from "styled-components";

const Anchor = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const HomePage: NextPage = () => {
  useAuthGaurd();
  return (
    <Layout>
      <Flex width ="100%" height="100%" padding={4} justifyContent="center" alignItems="center">
        {/* <Text
          as="h1"
          marginBottom={0}
          color="black"
          variant="extraLarge"
        >
          サインインする
        </Text> */}
        <Flex
          justifyContent={"center"}
        >
          <Link href="/signin">
            <Anchor>
              <Text as="h1">サインインする</Text>
            </Anchor>
          </Link>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default HomePage;
