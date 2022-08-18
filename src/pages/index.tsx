import type { NextPage } from "next";
import { useRouter } from "next/router";
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
  const { authUser, isLoading, signout } = useAuthContext();
  const router = useRouter();
  const handleSignout = async () => {
    try {
      await signout();
      router.reload();
    } catch (err: unknown) {
      if (err instanceof Error) {
        // エラーの内容を表示
        window.alert(err.message);
      }
    } finally {
    }
  };
  return (
    <Layout>
      <Flex
        width="100%"
        height="100%"
        padding={4}
        justifyContent="center"
        alignItems="center"
      >
        <Flex justifyContent={"center"}>
          {authUser ? (
            <Flex flexDirection={"column"} alignItems={"center"}>
              <Button onClick={handleSignout}>
                <Text as="h1">サインアウトする</Text>
              </Button>
              <Link href={`/users/${authUser.id}`}>
                <Anchor>
                  <Text as="h1">マイページへ</Text>
                </Anchor>
              </Link>
            </Flex>
          ) : (
            <Link href="/signin">
              <Anchor>
                <Text as="h1">サインインする</Text>
              </Anchor>
            </Link>
          )}
        </Flex>
      </Flex>
    </Layout>
  );
};

export default HomePage;
