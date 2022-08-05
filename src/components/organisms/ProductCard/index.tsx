import styled from "styled-components";
import ScaleImage from "components/atoms/ScaleImage";
import Text from "components/atoms/Text";
import Box from "components/layout/Box";
import { PropsWithChildren } from "react";

interface ProductCardProps {
  displayName: string;
  name: string;
  imageUrl: string;
  blurDataUrl?: string;
  variant?: "listing" | "small" | "detail";
}


const ProductCardContainer = styled.div`
  position: relative;
`;


const ProductCardImageContainer = styled.div`
  z-index: 99;
`;


const ProductCardInfo = styled.div`
  position: absolute;
  z-index: 100;
  top: 0px;
  left: 0px;
`;


const ProductCard = ({
  displayName,
  name,
  imageUrl,
  blurDataUrl,
  variant = "listing",
}: ProductCardProps) => {
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
  console.log(displayName);
  return (
    <ProductCardContainer>
      <ProductCardImageContainer>
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
      </ProductCardImageContainer>
      {variant === "small" && (
        <Box marginTop={1}>
          <Text as="h2" variant="medium" margin={0} padding={0}>
            {displayName}
          </Text>
          <Text as="span" variant="medium">
            型番 : {name}
          </Text>
        </Box>
      )}
    </ProductCardContainer>
  );
};

export default ProductCard;
