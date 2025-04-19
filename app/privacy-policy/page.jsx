import ArticleCard from "@/app/components/articleCard";
import Footer from "@/app/components/footer";
import LandingHeader from "@/app/components/landingHeader";
import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <div className="privacy">
      <LandingHeader />
      <div className="privacy__inner">

        <Image
            alt=""
            src="/assets/privacy.png"
            width={1312}
            height={491}
            className="privacy__inner__banner"
          />

          <div className="privacy__inner__body">
            <h2>
            Pigeonhire is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, including our website and services (collectively, "Services"). You agree to this Privacy Policy's collection and use of information when you access and use our services.
            </h2>
            <h1>Information we collect</h1>
            <h3>Personal information
            </h3>
            <p>We collect personal information you voluntarily provide us when you register for an account on the site, use our Services, or communicate with us. The information provided is crucial for delivering premium service and a personalized experience. The personal information we collect may include your name, which we use to identify and personalize your experience; your email address, which is used for communication purposes, including sending updates, promotional materials, and account-related notifications; and your phone number, which helps us provide customer support and facilitate account verification.</p>
            <p>
            Additionally, we may collect your company name and job title to tailor our Services to your business needs and ensure relevant interactions. Payment information is also collected to process transactions securely and manage billing. Providing this information is necessary to access certain features of our Services. You consent to collecting, using, and storing your data as described in this Privacy Policy when you provide your personal information.

            </p>
            
            <h3>Data usage</h3>
<p>Information about your interactions with our Services is automatically collected to enhance user experience and improve our platform. This data includes details about your visits to our website and use of our application, such as your IP address, which helps us understand the geographical distribution of our users and manage service quality.</p>

<p>We also gather information about your browser type and operating system to ensure compatibility and optimize performance across different devices and platforms. Additionally, we track access times and pages viewed to analyze user behaviour, identify popular features, and detect potential issues or areas for improvement. To facilitate this data collection, cookies and similar tracking technologies allow us to remember your preferences, provide personalized content, and offer a seamless experience. This usage data is crucial for maintaining the functionality, security, and efficiency of our Services, enabling us to deliver a better and more tailored experience to our users.</p>
<h3>Device information</h3>
<p>We collect information about your device to access our Services to ensure optimal performance and compatibility. This information includes details about the hardware model, which helps us understand the types of devices our users utilize and optimize our platform accordingly. We also gather data on the operating system and version, enabling us to provide a seamless experience across different software environments.</p>
<h1>How we use your information</h1>
<h3>To provide and maintain our services
</h3>
<p>We use your information to operate and maintain our Services effectively, ensuring that they meet your needs and expectations. This involves processing transactions to facilitate smooth and secure payments, managing your account to provide access to our platform's features and functionalities, and delivering customer support to address any issues or inquiries you may have.
</p>

<p>
By leveraging your information, we can enhance the overall user experience, troubleshoot problems, and ensure that our Services are consistently available and reliable. Maintaining accurate and up-to-date information also allows us to make necessary updates and improvements to our platform, ensuring that it remains functional and responsive to your requirements.

</p>
<h3>To improve our services</h3>
<p>We use the information collected to enhance and refine our services continuously. By analyzing usage data and feedback, we identify trends and areas for improvement, enabling us to develop new features and optimize existing ones. This process allows us to tailor our Services to meet user needs better, improve performance, and address any issues that may arise. Ultimately, our goal is to provide a more effective and satisfying user experience, ensuring that our platform evolves in line with user expectations and industry standards.</p>
<h3>To communicate with you</h3>
<p>We use your contact information to inform you about important updates, promotional offers, and changes to our Services. This communication includes sending account notifications, newsletters, and information relevant to using our platform. By reaching out to you, we aim to enhance your experience, provide timely support, and ensure you stay updated on features and opportunities that may be beneficial to you. Your role in our platform's growth is invaluable, and we appreciate your contribution.</p>
<h3>To ensure security</h3>
<p>We actively use your information to monitor and safeguard against security threats and breaches. This involves analyzing data to detect unusual activity, implementing measures to prevent unauthorized access, and responding promptly to any incidents that may compromise the security of our Services. By doing so, we aim to protect your information and maintain our platform's overall integrity and trustworthiness.</p>
<h1>Sharing your information</h1>
<h3>With service providers</h3>
<p>We may share your information with third-party service providers who assist us in delivering and managing our Services. These providers perform essential functions on our behalf, such as processing payments, analyzing data, sending communications, and providing technical support. They are bound by contractual agreements to use your information solely to fulfil their roles and to implement appropriate security measures to protect your data. This collaboration enables us to enhance our Services, ensure smooth operations, and offer you a better user experience.</p>
<h3>For legal reasons</h3>
<p>We may disclose your information if required by law, such as in response to a subpoena, court order, or regulatory request. This includes cooperating with law enforcement or other governmental authorities to comply with legal obligations or protect our rights and interests. Such disclosures ensure compliance with applicable laws and regulations and address legal claims or disputes that may arise.</p>

<h3>Third-Party data collection and privacy</h3>
<p>When interacting with communities or engaging in activities facilitated through the Pigeonhire platform, you may be required to provide certain information to third parties, such as community owners or partners, before completing specific actions or engagements. Please note that Pigeonhire does not collect or store this information directly. Instead, it is collected by the respective third party—our customer or partner—who has integrated or utilized our platform.
</p>
<p>
Pigeonhire does not share your personal information with any unrelated third parties. However, the privacy policy of the third-party website or entity where you provide your information will apply. Pigeonhire is not responsible or liable for the use, storage, or handling of data submitted on third-party platforms that are outside our control. Users are encouraged to review the privacy policies of such third parties before submitting any personal information.
</p>
<h1>Data security</h1>
<p>
We employ robust security measures to safeguard your information from unauthorized access, alteration, disclosure. This includes using encryption technologies, secure servers, and access controls to protect data in transit and at rest. While we strive to implement industry-standard security practices, it's important to note that no system is entirely immune to threats. Therefore, we continuously review and enhance our security protocols to address evolving risks and maintain the integrity of your data.
</p>
<h1>Data retention</h1>
<p>
We retain your personal information for as long as necessary to fulfil the purposes it was collected, including providing and improving our Services, complying with legal obligations, and resolving any disputes. Once the information is no longer needed for these purposes, we will securely delete or anonymize it. This approach ensures we manage data responsibly and by applicable laws and regulations.
</p>
<h1>Third-Party links</h1>
<p>Our Services may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. We encourage you to review the privacy policies of any third-party sites you visit.</p>
<h2>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website. Your continued use of our Services after any changes constitutes your acceptance of the new Privacy Policy.</h2>
<h2>If you have any questions about this Privacy Policy, please contact us at:  Email: hello@pigeonhire.com</h2>
                  </div>
      </div>

      <Footer />
    </div>
  );
}
