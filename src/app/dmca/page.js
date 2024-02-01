import ContentWrapper from '@/components/contentWrapper/ContentWrapper';
export const metadata = {
  title: 'Digital Millenium Copyright Act - Manga',
};
const Page = () => {
  return (
    <ContentWrapper>
      <div className="text-white text-[14px] font-normal leading-6 pt-[100px] mb-6">
        <h1 className="text-[28px] font-semibold mb-6">DMCA NOTICE</h1>
        <p className="mb-6">
          Asurascans.com respects the intellectual property of others.
          Asurascans.com takes matters of Intellectual property very seriously
          and is committed to meeting the needs of content owners while helping
          them manage the publication of their content online. The books’ files,
          which are under copyright protection, are NOT PUBLISHED on the
          website. We are not supporting digital piracy. Our task is to make the
          users familiar with the world literature novelties and to retain
          copyright. The books’ fragments on our website are added by users, for
          the enjoyment of other users and not for the purpose of commercial
          benefit. We have no opportunity to control them constantly; thus, if
          you consider that some fragments violate the author’s right, contact
          us.
        </p>
        <p className="mb-6">
          If you believe that your copyrighted work has been copied in a way
          that constitutes copyright infringement and is accessible on this
          site, you may notify our copyright agent, as set forth in the Digital
          Millennium Copyright Act of 1998 (DMCA). For your complaint to be
          valid under the DMCA, you must provide the following information when
          providing notice of the claimed copyright infringement:
        </p>
        <ul className="list-disc mb-6 pl-[40px]">
          <li>
            A physical or electronic signature of a person authorized to act on
            behalf of the copyright owner Identification of the copyrighted work
            claimed to have been infringed
          </li>
          <li>
            Identification of the material that is claimed to be infringing or
            to be the subject of the infringing activity and that is to be
            removed.
          </li>
        </ul>
        <p className="mb-6">
          We will not accept links to only search results, as they do not
          identify any item that may link to material infringing your work and
          copyright. You must identify individual items in the search results
          that you wish us to remove.
        </p>
        <p className="mb-6">
          If you send a link to another page, please describe which materials
          are under copyright protection.
        </p>
        <p className="mb-6">
          Information reasonably sufficient to permit the service provider to
          contact the complaining party, such as an address, telephone number,
          and, if available, an electronic mail address.
        </p>
        <p className="mb-6">
          A statement that the complaining party “in good faith believes that
          use of the material in the manner complained of is not authorized by
          the copyright owner, its agent, or law”
        </p>
        <p className="mb-6">
          A statement that the “information in the notification is accurate”,
          and “under penalty of perjury, the complaining party is authorized to
          act on behalf of the owner of an exclusive right that is allegedly
          infringed.”
        </p>
      </div>
    </ContentWrapper>
  );
};

export default Page;
