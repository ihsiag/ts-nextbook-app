import Link from 'next/link'
import { Fragment } from 'react'
import AddItemCard from 'components/organisms/AddItemCard'
import ProductCard from 'components/organisms/ProductCard'
import ProductCardList from 'components/organisms/ProductCardList'
import useSearch from 'services/products/use-search'
import type { ApiContext, Product } from 'types'

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
}

interface UserProductCardListContainerProps {
  userId: number
  products?: Product[]
}


const UserProductCardListContainer = ({
  userId,
  products,
}: UserProductCardListContainerProps) => {
  const { products: userProducts } = useSearch(context, {
    userId,
    initial: products,
  })

  return (
    <ProductCardList numberPerRow={6} numberPerRowForMobile={2}>
      <Link href={`/sell`} passHref>
        <a>
          <AddItemCard
            variant="small"
            imageUrl="/elements/plus.png"
          />
        </a>
      </Link>
      {userProducts.map((p) => (
        <Fragment key={p.id}>
          <Link href={`/products/${p.id}`} passHref>
            <a>
              {/* 商品カード */}
              <ProductCard
                variant="small"
                displayName={p.displayName}
                name={p.name}
                imageUrl={p.imageUrl}
              />
            </a>
          </Link>
        </Fragment>
      ))}
    </ProductCardList>
  )
}

export default UserProductCardListContainer
