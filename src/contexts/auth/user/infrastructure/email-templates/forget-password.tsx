import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface AegisForgetPasswordProps {
  verificationCode?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}`
  : "";

export default function AegisForgetPassword({ verificationCode }: AegisForgetPasswordProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Aegis Password Reset</Preview>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Img
                src={`${baseUrl}/images/aegis-logo.png`}
                width="75"
                height="45"
                alt="Aegis Logo"
              />
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>Reset your password</Heading>
              <Text style={mainText}>
                We received a request to reset your Aegis account password. Please enter the
                following verification code to proceed with resetting your password. If you did not
                request a password reset, you can safely ignore this email.
              </Text>
              <Section style={verificationSection}>
                <Text style={verifyText}>Password reset code</Text>
                <Text style={codeText}>{verificationCode}</Text>
                <Text style={validityText}>(This code is valid for 10 minutes)</Text>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                For your security, Aegis will never ask you to disclose your password, credit card,
                or banking account number via email.
              </Text>
            </Section>
          </Section>
          <Text style={footerText}>
            This message was produced and distributed by Aegis, Inc., 410 Terry Ave. North, Seattle,
            WA 98109. © 2022, Aegis, Inc. All rights reserved. Aegis is a registered trademark of{" "}
            <Link href="https://aegis.com" target="_blank" style={link}>
              Aegis
            </Link>
            , Inc. View our{" "}
            <Link href="https://aegis.com/privacy" target="_blank" style={link}>
              privacy policy
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

AegisForgetPassword.PreviewProps = {
  verificationCode: "596853",
} satisfies AegisForgetPasswordProps;

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const imageSection = {
  backgroundColor: "#252f3d",
  display: "flex",
  padding: "20px 0",
  alignItems: "center",
  justifyContent: "center",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const footerText = {
  ...text,
  fontSize: "12px",
  padding: "0 20px",
};

const verifyText = {
  ...text,
  margin: 0,
  fontWeight: "bold",
  textAlign: "center" as const,
};

const codeText = {
  ...text,
  fontWeight: "bold",
  fontSize: "36px",
  margin: "10px 0",
  textAlign: "center" as const,
};

const validityText = {
  ...text,
  margin: "0px",
  textAlign: "center" as const,
};

const verificationSection = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };
