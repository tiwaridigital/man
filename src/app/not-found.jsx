import Error404 from '@/components/Error/Error404';
import ContentWrapper from '@/components/contentWrapper/ContentWrapper';

export default async function NotFound() {
  return (
    <div className="pt-[100px] pb-[50px]">
      <ContentWrapper>
        <Error404 description="Looks like the page you're trying to visit doesn't exist or something is not right. Please check the URL." />
      </ContentWrapper>
    </div>
  );
}
