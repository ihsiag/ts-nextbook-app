import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import BreadcrumbItem from "components/atoms/BreadcrumbItem";
import Separator from "components/atoms/Separator";
import Text from "components/atoms/Text";
import Box from "components/layout/Box";
import Flex from "components/layout/Flex";
import Breadcrumb from "components/molecules/Breadcrumb";
import ProductCard from "components/organisms/ProductCard";
import UserProfile from "components/organisms/UserProfile";
import Layout from "components/templates/Layout";
import getAllProducts from "services/products/get-all-products";
import getProduct from "services/products/get-product";
import useProduct from "services/products/use-product";
import type { ApiContext } from "types";

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || "/api/proxy",
};

type ProductPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const ProductPage: NextPage<ProductPageProps> = ({
  id,
  product: initial,
}: ProductPageProps) => {
  const router = useRouter();
  const data = useProduct(context, { id, initial });
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const product = data.product ?? initial;
  console.log(product);
  return (
    <Layout>
      <Flex flexDirection = "column" alignItems="center">
        <Box width="1180px">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link href={`/users/${product.owner.id}`}>
                <a>マイページ [{product.owner.username}]</a>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>{product.displayName}</BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Flex width="1180px" paddingTop={2} paddingBottom={1} justifyContent="space-between" >
            <ProductCard
              variant="detail"
              displayName={product.displayName}
              name={product.name}
              imageUrl={product.imageUrl}
            />
            <Box paddingLeft={2} width={{ base: "100%", md: "100%" }} backgroundColor={"primary"} border={"1px solid rgb(240,240,240)"}>
              <Flex
                justifyContent="flex-start"
                flexDirection="column"
                height={{ base: "", md: "100%" }}
              >
                <Box marginBottom={2}>
                  <Text marginBottom={1} as="p">
                    建材名 :
                  </Text>
                  <Text fontSize="mediumLarge" as="h2">
                    {product.displayName}
                  </Text>
                </Box>
                <Box marginBottom={2}>
                  <Text marginBottom={1} as="p">
                    型番 :
                  </Text>
                  <Text fontSize="mediumLarge" as="h2">
                    {product.name}
                  </Text>
                </Box>
                {/* 商品概要を表示、改行ごとにテキストコンポーネントでラップ */}
                <Box marginBottom={2}>
                  <Text marginBottom={1} as="p">
                    概要 :
                  </Text>
                  {product.description
                    .split("\n")
                    .map((text: string, i: number) => (
                      <Text key={i} fontSize="mediumLarge" as="h2">
                        {text}
                      </Text>
                    ))}
                </Box>
                <Box marginBottom={2}>
                  <Text marginBottom={1} as="p">
                    価格 :
                  </Text>
                  <Text fontSize="mediumLarge" as="h2">
                    {product.price}円
                  </Text>
                </Box>
              </Flex>
            </Box>
        </Flex>
      </Flex>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || "http://localhost:5000",
  };
  // 商品からパスを生成
  const products = await getAllProducts(context);
  const paths = products.map((p) => `/products/${p.id}`);

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || "http://localhost:5000",
  };

  if (!params) {
    throw new Error("params is undefined");
  }

  // 商品を取得し、静的ページを作成
  // 10秒でstaleな状態にし、静的ページを更新する
  const productId = Number(params.id);
  const product = await getProduct(context, { id: productId });

  return {
    props: {
      id: productId,
      product,
    },
    revalidate: 10,
  };
};

export default ProductPage;
