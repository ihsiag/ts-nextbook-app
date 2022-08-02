import Link from "next/link";
import styled from "styled-components";
import AppLogo from "components/atoms/AppLogo";
import Button from "components/atoms/Button";
import {
  SearchIcon,
  PersonIcon,
  ShoppingCartIcon,
} from "components/atoms/IconButton";
import ShapeImage from "components/atoms/ShapeImage";
import Spinner from "components/atoms/Spinner";
import Text from "components/atoms/Text";
import Box from "components/layout/Box";
import Flex from "components/layout/Flex";
import BadgeIconButton from "components/molecules/BadgeIconButton";
import { useAuthContext } from "contexts/AuthContext";
import { useShoppingCartContext } from "contexts/ShoppingCartContext";

// ヘッダーのルート
const HeaderRoot = styled.header`
  height: 88px;
  padding: ${({ theme }) => theme.space[2]} 0px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

// ナビゲーション
const Nav = styled(Flex)`
  & > span:not(:first-child) {
    margin-left: ${({ theme }) => theme.space[2]};
  }
`;

// ナビゲーションのリンク
const NavLink = styled.span`
  display: inline;
`;

// アンカー
const Anchor = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

/**
 * ヘッダー
 */
const Header = () => {
  const { cart } = useShoppingCartContext();
  const { authUser, isLoading } = useAuthContext();

  return (
    <HeaderRoot>
      <Flex width="100%" justifyContent="center">
        <Flex width="1180px" justifyContent="space-between">
          <Nav as="nav" height="56px" alignItems="center">
            <NavLink>
              <Link href="/" passHref>
                <Anchor as="a">
                  <Flex flexDirection={"column"} justifyContent="center">
                    <Text
                      as="h1"
                      marginBottom={0}
                      color="black"
                      variant="extraLarge"
                    >
                      建材DB
                    </Text>
                  </Flex>
                </Anchor>
              </Link>
            </NavLink>
          </Nav>
          <Nav as="nav" height="56px" alignItems="center">
            <NavLink>
              {(() => {
                // 認証していたらアイコンを表示
                if (authUser) {
                  return (
                    <Link href={`/users/${authUser.id}`} passHref>
                      <Anchor as="a">
                        <Flex flexDirection={"column"} justifyContent="center">
                          <Text
                            as="h1"
                            marginTop={0}
                            // marginBottom={0}
                            color="black"
                            variant="extraLarge"
                          >
                            {authUser.displayName}
                          </Text>
                        </Flex>
                      </Anchor>
                    </Link>
                  );
                } else if (isLoading) {
                  // ロード中はスピナーを表示
                  return <Spinner size={20} strokeWidth={2} />;
                } else {
                  // サインインしてない場合はアイコンを表示
                  return (
                    <Link href="/signin" passHref>
                      <Anchor as="a">
                        <Text
                          as="h1"
                          marginBottom={0}
                          color="black"
                          variant="extraLarge"
                        >
                          ログイン
                        </Text>
                      </Anchor>
                    </Link>
                  );
                }
              })()}
            </NavLink>
          </Nav>
        </Flex>
      </Flex>
    </HeaderRoot>
  );
};

export default Header;
