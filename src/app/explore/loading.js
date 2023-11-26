import ContentWrapper from '@/components/contentWrapper/ContentWrapper'
import Spinner from '@/components/spinner/Spinner'

const Loading = () => {
  return (
    <ContentWrapper>
      <Spinner height={'!h-[100vh]'} />
    </ContentWrapper>
  )
}

export default Loading
