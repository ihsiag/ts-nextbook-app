import type {NextPage } from "next";
import Link from "next/link";
import Text from "components/atoms/Text";
import Flex from "components/layout/Flex";
import Layout from "components/templates/Layout";
import { useAuthGaurd } from "utils/hooks";


const HomePage: NextPage = () => {
    useAuthGaurd();
    return (
    <Layout>
      <Flex padding={2} justifyContent="center" backgroundColor="primary">
        <Text
          as="h1"
          marginBottom={0}
          color="black"
          variant="extraLarge"
        >
          マイページ
        </Text>
      </Flex>
    </Layout>
  );
};

export default HomePage;
