import type { NextPage } from "next";
import Link from "next/link";
import Text from "components/atoms/Text";
import Button from "components/atoms/Button";
import Box from "components/layout/Box";
import Flex from "components/layout/Flex";
import Layout from "components/templates/Layout";
import { useAuthGaurd } from "utils/hooks";
import styled from "styled-components";
import { useAuthContext } from "contexts/AuthContext";

const Anchor = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const HomePage: NextPage = () => {
  useAuthGaurd();
  const { authUser, isLoading,signout } = useAuthContext();
  return (
    <Layout>
      <Flex width ="100%" height="100%" padding={4} justifyContent="center" alignItems="center">
        <Flex
          justifyContent={"center"}
        >
          {!authUser && !isLoading ? (
          <Link href="/signin">
            <Anchor>
              <Text as="h1">サインインする</Text>
            </Anchor>
          </Link>
          ) : (
            <Button onClick ={signout}>
              <Text as="h1">サインアウトする</Text>
            </Button>            
          )}
        </Flex>
      </Flex>
    </Layout>
  );
};

export default HomePage;
