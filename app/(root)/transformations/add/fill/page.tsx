import { auth } from '@clerk/nextjs'
import TransformForm from '@/components/shared/TransformForm/TransformForm'
import TransformedImage from '@/components/shared/TransformedImage'

const FillPage = () => {
  const config = { fillBackground: true }
  return <TransformForm config={config} />
}

export default FillPage
