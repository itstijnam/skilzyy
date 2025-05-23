import React from 'react';
import '../style/PrivacyPolicy.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../messagePage/components/Header';

function PrivacyPolicy() {
    const navigate = useNavigate();
  return (
    <>
        <Header/>
      <div className="privacy-policy-container">
        <div className="backArrowButton" onClick={()=>navigate(-1)} >⮜</div>
      <header className="privacy-header">
        <h1>Privacy Policy</h1>
        <p className="effective-date">Effective Date: May 19, 2025</p>
      </header>

      <div className="privacy-content">
        <section className="intro-section">
          <p>
            This Privacy Policy describes how we collects, uses, and shares your information in connection with your use of our website and services. As a student-run platform, we don't store data as users visit and contribute to the platform, and we do not have the capacity or funds to support a complex data infrastructure for processing or storage.
          </p>
        </section>

        <section className="policy-section">
          <h2>1. Introduction</h2>
          <p>
            We are committed to protecting your privacy. This Privacy Policy outlines the types of personal information we collect, how we use and share it, and the choices you have regarding your data. Our platform connects clients and freelancers and facilitates communication and payments. We collect only essential data to provide and improve this service.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Information We Collect</h2>
          <p>We collect the following types of information:</p>
          
          <h3>A. Information You Provide to Us Directly</h3>
          <ul>
            <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, and password.</li>
            <li><strong>Profile and Job Information:</strong> Freelancers may provide skills, hourly rates, and profile descriptions. Clients may post job titles, descriptions, and budgets.</li>
            <li><strong>Communication and Content:</strong> We store messages, job proposals, and shared files to support project collaboration.</li>
            <li><strong>Payment Details:</strong> We do not store full payment card information. Payments are handled securely through third-party services like Stripe or PayPal. We retain minimal transaction data necessary for recordkeeping and confirming payment status.</li>
          </ul>
          
          <h3>B. Information We Collect Automatically</h3>
          <ul>
            <li><strong>Usage Data:</strong> We collect your IP address, browser type, and pages visited to understand how users interact with our website.</li>
            <li><strong>Cookies and Local Storage:</strong> We use cookies to keep you logged in, remember your preferences, and measure site performance.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. How We Use the Information</h2>
          <p>We use the information we collect for the following limited purposes:</p>
          <ul>
            <li>To create and manage your account.</li>
            <li>To facilitate communication and project management between users.</li>
            <li>To process payments and monitor transactions for fraud prevention.</li>
            <li>To analyze how our platform is used and make improvements.</li>
            <li>To send essential account-related notifications.</li>
            <li>To support basic marketing and promotional activities (such as showing you job suggestions or sending occasional newsletters, if you opt-in).</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>4. How We Share Information</h2>
          <p>We share your information only as necessary to operate the platform:</p>
          <ul>
            <li><strong>With Service Providers:</strong> We use trusted third-party vendors for hosting, payment processing, email delivery, and analytics. These providers access your data only to perform services on our behalf and under confidentiality obligations.</li>
            <li><strong>With Other Users:</strong> When you interact on the platform (e.g., submit a proposal or message another user), your profile and relevant data may be visible to that user.</li>
            <li><strong>With Authorities:</strong> We may disclose information when required by law, regulation, legal process, or governmental request.</li>
            <li><strong>In Business Transfers:</strong> In the event of a sale, merger, or transfer of assets, your information may be transferred to a successor entity.</li>
          </ul>
          <p>We do not sell your personal information.</p>
        </section>

        <section className="policy-section">
          <h2>5. Cookies and Tracking Technologies</h2>
          <p>We use cookies and local storage technologies to provide functionality and understand user behavior. Cookies are used for:</p>
          <ul>
            <li>Authentication (keeping you logged in)</li>
            <li>Site preferences (like dark mode)</li>
            <li>Analytics (e.g., number of visits, most viewed pages)</li>
          </ul>
          <p>You can manage your cookie preferences through your browser settings. Disabling essential cookies may affect the platform's functionality.</p>
        </section>

        <section className="policy-section">
          <h2>6. Data Retention</h2>
          <p>We retain your information as follows:</p>
          <ul>
            <li><strong>Account and profile data:</strong> as long as your account is active.</li>
            <li><strong>Messages and transaction history:</strong> while your account is active, and up to 30 days after account deletion.</li>
            <li><strong>Backups:</strong> securely stored for up to 30 days.</li>
            <li><strong>Anonymized data</strong> (such as platform usage trends): may be retained indefinitely for research and reporting.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>7. Security</h2>
          <p>We implement basic security measures to protect your data, including:</p>
          <ul>
            <li>HTTPS encryption</li>
            <li>Hashed and salted passwords</li>
            <li>Server access limited to the platform owner and one administrator</li>
            <li>Regular software updates</li>
          </ul>
          <p>While we strive to protect your information, no system is 100% secure. If a data breach occurs, we will notify affected users within 72 hours.</p>
        </section>

        <section className="policy-section">
          <h2>8. Your Rights and Choices</h2>
          <p>You may:</p>
          <ul>
            <li>Access and update your profile via your account settings.</li>
            <li>Delete your account, which will also delete associated messages and proposals within 30 days.</li>
            <li>Opt out of promotional emails by using the unsubscribe link in our messages.</li>
            <li>Request a copy of your data by emailing privacy@[yourwebsitename].com.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>9. International Users</h2>
          <p>Our platform is currently focused on users within [Your Country]. If you access our services from outside this region, your information will be transferred to and processed in [Your Country].</p>
        </section>

        <section className="policy-section">
          <h2>10. Changes to this Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify users of significant changes via email or platform notifications. Continued use of our services after such updates constitutes acceptance of the revised policy.
          </p>
        </section>

        <section className="policy-section contact-section">
          <h2>11. Contact Us</h2>
          <p>If you have questions or concerns about this Privacy Policy, <span className='contact-navigate' onClick={()=>navigate('/contact')} >please contact</span></p>
          {/* <p>
            Email: privacy@[yourwebsitename].com<br />
            Subject Line: Privacy Policy Inquiry
          </p> */}
        </section>
      </div>
    </div>
    </>
  );
}

export default PrivacyPolicy;