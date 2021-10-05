import type { GetServerSideProps } from 'next'
import { renderToStaticMarkup } from 'react-dom/server'
import Plot from '../components/plot'

export default function ValuePage() {
  return null
}

export const getServerSideProps: GetServerSideProps<{}, { value: string }> = async ({
  res,
  params,
}) => {
  if (!params) {
    return {
      props: {},
    }
  }
  res.setHeader('Content-Type', 'image/svg+xml')
  res.write(renderToStaticMarkup(<Plot value={params.value} />))
  res.end()
  return {
    props: {},
  }
}
