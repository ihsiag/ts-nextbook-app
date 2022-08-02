import styled from "styled-components";
import ScaleImage from "components/atoms/ScaleImage";
import Text from "components/atoms/Text";
import Box from "components/layout/Box";
import Flex from "components/layout/Flex";

interface AddItemCardProps {
  imageUrl: string;
  blurDataUrl?: string;
  variant?: "listing" | "small" | "detail";
}

// 商品カードのコンテナ
const AddItemCardContainer = styled.div`
  position: relative;
`;

// 商品カード画像のコンテナ
const AddItemCardImageContainer = styled.div`
  z-index: 99;
`;

// 商品カードの情報
const AddItemCardInfo = styled.div`
  position: absolute;
  z-index: 100;
  top: 0px;
  left: 0px;
`;

/**
 * 商品カード
 */
const AddItemCard = ({
  imageUrl,
  blurDataUrl,
  variant = "listing",
}: AddItemCardProps) => {
  const { size, imgSize } = (() => {
    switch (variant) {
      case "detail":
        return { size: { base: "320px", md: "540px" }, imgSize: 540 };
      case "listing":
        return { size: { base: "160px", md: "240px" }, imgSize: 240 };
      default:
        return { size: { base: "160px" }, imgSize: 160 };
    }
  })();

  return (
    <AddItemCardContainer>
      {variant !== "small" && (
        <AddItemCardInfo>
          <Box>
            <Text
              as="h2"
              fontSize={{ base: "small", md: "mediumLarge" }}
              letterSpacing={{ base: 2, md: 3 }}
              lineHeight={{ base: "32px", md: "48px" }}
              backgroundColor="white"
              margin={0}
              paddingRight={2}
              paddingLeft={2}
              paddingTop={0}
              paddingBottom={0}
            >
              追加する
            </Text>
          </Box>
        </AddItemCardInfo>
      )}
      <AddItemCardImageContainer>
        {blurDataUrl && (
          <ScaleImage
            src={imageUrl}
            width={imgSize ?? 240}
            height={imgSize ?? 240}
            containerWidth={size}
            containerHeight={size}
            objectFit="cover"
            placeholder="blur"
            blurDataURL={blurDataUrl}
          />
        )}
        {!blurDataUrl && (
          <ScaleImage
            src={imageUrl}
            width={imgSize ?? 240}
            height={imgSize ?? 240}
            containerWidth={size}
            containerHeight={size}
            objectFit="cover"
          />
        )}
      </AddItemCardImageContainer>
      {variant === "small" && (
        <Flex marginTop={1} justifyContent="flex-start">
          <Text as="h2" variant="medium" width ="auto" margin={0} padding={0}>
            新規建材の登録
          </Text>
        </Flex>
      )}
    </AddItemCardContainer>
  );
};

export default AddItemCard;
