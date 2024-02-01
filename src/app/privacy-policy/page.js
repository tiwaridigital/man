import ContentWrapper from '@/components/contentWrapper/ContentWrapper';
export const metadata = {
  title: 'Privacy Policy - Manga',
};
const Page = () => {
  const h3Styles = 'text-[16px] font-semibold my-4';
  return (
    <ContentWrapper>
      <div className="text-white text-[14px] font-normal leading-6 pt-[100px]">
        <h1 className="text-[32px] font-medium mb-6">Privacy Policy</h1>
        <p>
          The following web pages outline shadowscans.com’s collection and use
          of personal information from its users. shadowscans.com values the
          privacy of our members and users. shadowscans.com will never share any
          personal information of anybody who logs on to shadowscans.com with
          anyone. This includes your e-mail address, name, and location. Upon
          logging on to shadowscans.com, your IP address and hostname are logged
          for statistical and security reasons.
        </p>
        <h3 className={h3Styles}>Security</h3>
        <p>
          asura.nacm.xyz will make a reasonable effort to protect all personal
          information such as passwords and use technology such as encryption,
          access control procedures, firewalls, and physical securities. We
          recommend you use a unique password with both letters and numbers to
          protect your account on asura.nacm.xyz. If others, including family,
          friends, or other household members access and use the comment or
          message board through your login credentials, you are responsible for
          the actions of yourself and your individual account. Only in extreme
          cases will your account be fully terminated.
        </p>
        <h3 className={h3Styles}>Cookies</h3>
        <p>
          asura.nacm.xyz uses cookies (a very small text file placed on your
          system when you log on to asura.nacm.xyz, and most other websites) to
          serve as an identification card and is uniquely yours. It can only be
          read by the server that gives this cookie to you. Cookies give us
          information that you returned to asura.nacm.xyz’s specific pages and
          help us track your preferences and your behavior. The basic function
          of cookies is to help our server remember who you are.
        </p>
        <h3 className={h3Styles}>Disclosing Information</h3>
        <p>
          When required by applicable law, asura.nacm.xyz may store and disclose
          personal information for the members of the website. This means that
          we may make a disclosure that is necessary for the legal and
          regulatory requirements to protect the rights, safety, and property of
          asura.nacm.xyz, users of the asura.nacm.xyz website, and the public.
        </p>
        <h3 className={h3Styles}>Children’s Privacy</h3>
        <p>
          asura.nacm.xyz makes a reasonable effort to prevent someone who is
          underage to join as a member. asura.nacm.xyz also will not collect
          information and personal data from children under the age of 13. If
          there is someone under the age of 13 to become a member of
          asura.nacm.xyz, we will close that child’s account and delete any
          information collected about the child. Notwithstanding the foregoing,
          asura.nacm.xyz may choose to retain some personal information such as
          the underage’s e-mail address as a means to prevent the child from
          re-registering at our website. Since April 2000, the Children’s Online
          Privacy Protection Act (COPPA) went into effect, and as result
          websites all over the world wide web had to change the standards to
          not collect any information from a child.
        </p>
        <h3 className={h3Styles}>Third Parties</h3>
        <p>
          Third-party websites may collect information from asura.nacm.xyz
          users. This information includes your IP Address, hostname, and
          information about your system to help us serve you better. They are
          functioned for statistical reasons, and will not be used for any other
          reasons. If you would like to know more about this practice and to
          know your options about not having this information used by these
          companies, you can see
          http://www.networkadvertising.org/managing/opt_out.asp.
        </p>
        <h3 className={h3Styles}>Website Policy Changes</h3>
        <p>
          asura.nacm.xyz reserves the right to change this, and any other policy
          located on our website at any time without notifying our users. If you
          have any comments, questions, or concerns regarding this policy, or
          any other policy you may send them to us at policy[at]asura.nacm.xyz.
        </p>
        <p>
          {/*<script*/}
          {/*  type="text/javascript">let optOutCounter = 0; function setCookie(cname, cvalue, exdays){var d = new Date();d.setTime(d.getTime()+(exdays*24*60*60*1000));var expires='expires='+d.toUTCString();document.cookie=cname+'='+cvalue+';'+expires+';path=/'; if(optOutCounter==0){let cookieP = document.getElementById('cookieP'); var successCookie = document.createElement('h3'); successCookie.innerHTML = 'Optout Success!'; successCookie.setAttribute('style','color:green'); cookieP.appendChild(successCookie); optOutCounter ++}};</script>*/}
        </p>
        <h3 className={h3Styles}>Common ID Cookie</h3>
        <p id="cookieP">
          This site uses cookies and similar tracking technologies such as the
          Common ID cookie to provide its services. Cookies are important
          devices for measuring advertising effectiveness and ensuring a robust
          online advertising industry. The Common ID cookie stores a unique user
          id in the first-party domain and is accessible to our ad partners.
          This simple ID can be utilized to improve user matching, especially
          for delivering ads to iOS and macOS browsers. Users can opt-out of the
          Common ID tracking cookie by clicking <a href="#opt-out">here</a>.
        </p>
        <h3 className={h3Styles}>Advertising Privacy Settings</h3>
        <p>
          FOR EU USERS ONLY: When you use our site, pre-selected companies may
          access and use certain information on your device and about your
          interests to serve ads or personalized content. You may revisit or
          change consent choices at any time by clicking <a href="#cmp">here</a>
          .
        </p>
      </div>
    </ContentWrapper>
  );
};

export default Page;
