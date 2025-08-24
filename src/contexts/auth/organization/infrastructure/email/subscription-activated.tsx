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

interface AegisSubscriptionActivatedProps {
  customerName?: string;
  planName?: string;
  startDate?: string;
  renewalDate?: string;
  billingUrl?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}`
  : "";

export default function AegisSubscriptionActivated({
  customerName,
  planName,
  startDate,
  renewalDate,
  billingUrl,
}: AegisSubscriptionActivatedProps) {
  const plan = planName || "Estándar";
  const manageUrl = billingUrl || `${baseUrl}/billing`;

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Tu suscripción de Aegis ha sido activada</Preview>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Img
                src={`${baseUrl}/images/aegis-logo-black.png`}
                width="75"
                height="45"
                alt="Aegis Logo"
              />
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>¡Tu suscripción está activa!</Heading>
              <Text style={mainText}>
                {customerName ? `Hola ${customerName}, ` : ""}gracias por elegir Aegis. Hemos
                activado tu suscripción correctamente y ya puedes disfrutar de todas las
                funcionalidades incluidas en tu plan.
              </Text>

              <Section style={detailsSection}>
                <Text style={detailsRow}>
                  <strong>Plan:</strong> {plan}
                </Text>
                {startDate ? (
                  <Text style={detailsRow}>
                    <strong>Inicio:</strong> {startDate}
                  </Text>
                ) : null}
                {renewalDate ? (
                  <Text style={detailsRow}>
                    <strong>Próxima renovación:</strong> {renewalDate}
                  </Text>
                ) : null}
              </Section>

              <Section style={ctaSection}>
                <Link href={manageUrl} target="_blank" style={button}>
                  Gestionar suscripción
                </Link>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                Por tu seguridad, Aegis nunca te pedirá tu contraseña, tarjeta de crédito ni
                información bancaria por correo electrónico.
              </Text>
            </Section>
          </Section>
          <Text style={footerText}>
            Este mensaje fue producido y distribuido por Aegis, Inc., 410 Terry Ave. North, Seattle,
            WA 98109. © 2025, Aegis, Inc. Todos los derechos reservados. Aegis es una marca
            registrada de{" "}
            <Link href="https://aegis.com" target="_blank" style={link}>
              Aegis
            </Link>
            , Inc. Consulta nuestra{" "}
            <Link href="https://aegis.com/privacy" target="_blank" style={link}>
              política de privacidad
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

AegisSubscriptionActivated.PreviewProps = {
  customerName: "Alex",
  planName: "Pro",
  startDate: "11/08/2025",
  renewalDate: "11/09/2025",
  billingUrl: `${baseUrl}/billing`,
} satisfies AegisSubscriptionActivatedProps;

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

const detailsSection = {
  backgroundColor: "#f7f7f7",
  borderRadius: "8px",
  padding: "12px 16px",
};

const detailsRow = {
  ...text,
  margin: "6px 0",
};

const ctaSection = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "18px",
};

const button = {
  backgroundColor: "#0F62FE",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: "6px",
  textDecoration: "none",
  display: "inline-block",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  fontWeight: 600 as const,
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };

export type { AegisSubscriptionActivatedProps };
