import type { ApiContext, Category, Condition, Product } from 'types'
import { fetcher } from 'utils'

export type GetAllProductsParams = {
  
  userId?: number
  sort?: keyof Omit<Product, 'owner'>
  order?: 'asc' | 'desc'
  limit?: number
  page?: number
}

// eslint-disable-next-line complexity
const getAllProducts = async (
  context: ApiContext,
  {
    userId,
    page,
    limit,
    sort = 'id',
    order = 'desc',
  }: GetAllProductsParams = {},
): Promise<Product[]> => {
  const path = `${context.apiRootUrl.replace(/\/$/g, '')}/products`
  const params = new URLSearchParams()
  userId && params.append('owner.id', `${userId}`)
  page && params.append('_page', `${page}`)
  limit && params.append('_limit', `${limit}`)
  sort && params.append('_sort', sort)
  order && params.append('_order', order)
  const query = params.toString()

  return await fetcher(query.length > 0 ? `${path}?${query}` : path, {
    headers: {
      Origin: '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      credentials: 'include',
    },
  })
}

export default getAllProducts
